import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import CameraService from "../../http/CameraService";
import { observer } from "mobx-react-lite";
import axios from "axios";

const RemotePage = observer(() => {
  const location = useLocation();
  const { gym_id, camera_id, description } = location.state || {};
  const remoteVideoRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const navigate = useNavigate();

  const pcRef = useRef(null);

  const initWebRTCStream = async () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        }
      ]
    });
    pcRef.current = pc;
    pc.addTransceiver("video", { direction: "recvonly" });
    pc.addTransceiver("audio", { direction: "recvonly" });

    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
      setConnected(true);
    }

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    await new Promise(resolve => {
      if (pc.iceGatheringState === "complete") return resolve();
      pc.onicegatheringstatechange = () => {
        if (pc.iceGatheringState === "complete") resolve();
      };
    });

    const localDesc = {
      type: pc.localDescription.type,
      sdp: pc.localDescription.sdp
    };
    const offerBase64 = btoa(JSON.stringify(localDesc));
    console.log("Полный оффер (Base64):", offerBase64);

    try {
      const response = await axios.post(
        `http://89.169.174.232:8080/api/gym/camera/webrtc/${gym_id}/${camera_id}`,
        { sdp: offerBase64 }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
          }
        }
      );

      const answerBase64 = response.data.sdp;
      const answerDesc = JSON.parse(atob(answerBase64));
  
      await pc.setRemoteDescription(new RTCSessionDescription(answerDesc));
      console.log("Remote SDP applied via axios");
    } catch (err) {
      console.error("Ошибка при обмене SDP:", err);
    }
  };

  const cleanupResources = () => {
    pcRef.current?.close();
    pcRef.current = null;
    if (remoteVideoRef.current) {
      remoteVideoRef.current.pause();
      remoteVideoRef.current.srcObject = null;
    }
    setConnected(false);
  };

  useEffect(() => {
    initWebRTCStream();

    return cleanupResources;
  }, []);

  useEffect(() => {
    const onUnload = () => cleanupResources();
    window.addEventListener("beforeunload", onUnload);
    return () => {
      window.removeEventListener("beforeunload", onUnload);
      cleanupResources();
    };
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />
      <div className="flex flex-col lg:flex-row flex-grow mb-6">
        <div className="flex-grow relative bg-black">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            controls={false}
            muted={true}
            className="w-full h-full"
          />
          {/* <img src="/assets/media.jpg" className="w-full h-full"/> */}

          {(
            <div className="absolute bottom-8 right-8 bg-black/40 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
              <div className="relative w-[180px] h-[180px]">
                {/* NW */}
                <button
                  onMouseDown={() => CameraService.moveCamera(-0.5, 0.5, 0, gym_id, camera_id)}
                  onMouseUp={() => CameraService.moveCamera(0, 0, 0, gym_id, camera_id)}
                  onTouchStart={() => CameraService.moveCamera(-0.5, 0.5, 0, gym_id, camera_id)}
                  onTouchEnd={() => CameraService.moveCamera(0, 0, 0, gym_id, camera_id)}
                  className="absolute top-0 left-0 w-14 h-14 rounded-full bg-[#ea5f5f]
                   hover:bg-[#d95353] flex items-center justify-center text-white shadow-md transition-all"
                >
                  <FaArrowUp size={24} className="transform -rotate-45" />
                </button>

                {/* N */}
                <button
                  onMouseDown={() => CameraService.moveCamera(0, 0.5, 0, gym_id, camera_id)}
                  onMouseUp={() => CameraService.moveCamera(0, 0, 0, gym_id, camera_id)}
                  onTouchStart={() => CameraService.moveCamera(0, 0.5, 0, gym_id, camera_id)}
                  onTouchEnd={() => CameraService.moveCamera(0, 0, 0, gym_id, camera_id)}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-[#ea5f5f]
                   hover:bg-[#d95353] flex items-center justify-center text-white shadow-md transition-all"
                >
                  <FaArrowUp size={24} />
                </button>

                {/* NE */}
                <button
                  onMouseDown={() => CameraService.moveCamera(0.5, 0.5, 0, gym_id, camera_id)}
                  onMouseUp={() => CameraService.moveCamera(0, 0, 0, gym_id, camera_id)}
                  onTouchStart={() => CameraService.moveCamera(0.5, 0.5, 0, gym_id, camera_id)}
                  onTouchEnd={() => CameraService.moveCamera(0, 0, 0, gym_id, camera_id)}
                  className="absolute top-0 right-0 w-14 h-14 rounded-full bg-[#ea5f5f]
                   hover:bg-[#d95353] flex items-center justify-center text-white shadow-md transition-all"
                >
                  <FaArrowUp size={24} className="transform rotate-45" />
                </button>

                {/* W */}
                <button
                  onMouseDown={() => CameraService.moveCamera(-0.5, 0, 0, gym_id, camera_id)}
                  onMouseUp={() => CameraService.moveCamera(0, 0, 0, gym_id, camera_id)}
                  onTouchStart={() => CameraService.moveCamera(-0.5, 0, 0, gym_id, camera_id)}
                  onTouchEnd={() => CameraService.moveCamera(0, 0, 0, gym_id, camera_id)}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 w-14 h-14 rounded-full bg-[#ea5f5f]
                   hover:bg-[#d95353] flex items-center justify-center text-white shadow-md transition-all"
                >
                  <FaArrowLeft size={24} />
                </button>

                {/* E */}
                <button
                  onMouseDown={() => CameraService.moveCamera(0.5, 0, 0, gym_id, camera_id)}
                  onMouseUp={() => CameraService.moveCamera(0, 0, 0, gym_id, camera_id)}
                  onTouchStart={() => CameraService.moveCamera(0.5, 0, 0, gym_id, camera_id)}
                  onTouchEnd={() => CameraService.moveCamera(0, 0, 0, gym_id, camera_id)}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 w-14 h-14 rounded-full bg-[#ea5f5f]
                   hover:bg-[#d95353] flex items-center justify-center text-white shadow-md transition-all"
                >
                  <FaArrowRight size={24} />
                </button>

                {/* SW */}
                <button
                  onMouseDown={() => CameraService.moveCamera(-0.5, -0.5, 0, gym_id, camera_id)}
                  onMouseUp={() => CameraService.moveCamera(0, 0, 0, gym_id, camera_id)}
                  onTouchStart={() => CameraService.moveCamera(-0.5, -0.5, 0, gym_id, camera_id)}
                  onTouchEnd={() => CameraService.moveCamera(0, 0, 0, gym_id, camera_id)}
                  className="absolute bottom-0 left-0 w-14 h-14 rounded-full bg-[#ea5f5f]
                   hover:bg-[#d95353] flex items-center justify-center text-white shadow-md transition-all"
                >
                  <FaArrowDown size={24} className="transform rotate-45" />
                </button>

                {/* S */}
                <button
                  onMouseDown={() => CameraService.moveCamera(0, -0.5, 0, gym_id, camera_id)}
                  onMouseUp={() => CameraService.moveCamera(0, 0, 0, gym_id, camera_id)}
                  onTouchStart={() => CameraService.moveCamera(0, -0.5, 0, gym_id, camera_id)}
                  onTouchEnd={() => CameraService.moveCamera(0, 0, 0, gym_id, camera_id)}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-[#ea5f5f]
                   hover:bg-[#d95353] flex items-center justify-center text-white shadow-md transition-all"
                >
                  <FaArrowDown size={24} />
                </button>

                {/* SE */}
                <button
                  onMouseDown={() => CameraService.moveCamera(0.5, -0.5, 0, gym_id, camera_id)}
                  onMouseUp={() => CameraService.moveCamera(0, 0, 0, gym_id, camera_id)}
                  onTouchStart={() => CameraService.moveCamera(0.5, -0.5, 0, gym_id, camera_id)}
                  onTouchEnd={() => CameraService.moveCamera(0, 0, 0, gym_id, camera_id)}
                  className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-[#ea5f5f]
                   hover:bg-[#d95353] flex items-center justify-center text-white shadow-md transition-all"
                >
                  <FaArrowDown size={24} className="transform -rotate-45" />
                </button>
              </div>
            </div>
          )}

          {/* <button
            className="absolute top-4 right-4 bg-gray-800/70 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors flex items-center gap-2"
            onClick={() => setControlsVisible(!controlsVisible)}
          >
            {controlsVisible ? "Скрыть управление" : "Показать управление"}
          </button> */}
        </div>

        <div className="w-full lg:w-[350px] bg-white p-4">
          <h2 className="text-xl font-bold mb-4 font-Roboto">Информация о камере</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold font-Roboto">Название камеры</h3>
              <p className="font-Roboto">Камера {camera_id}</p>
            </div>
            <div>
              <h3 className="font-bold font-Roboto">Описание</h3>
              <p className="font-Roboto">{description}</p>
            </div>
            <div>
              <h3 className="font-bold font-Roboto">Статус</h3>
              <div className="flex items-center">
                {/* <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${connected ? "bg-green-500" : "bg-red-500"
                    }`}
                ></span>
                <span className="font-Roboto">
                  {connected ? "Подключено" : "Не подключено"}
                </span> */}
                <span className="inline-block w-3 h-3 rounded-full mr-2 bg-green-500"></span>
                <span className="font-Roboto">Подключено</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold font-Roboto">Инструкция</h3>
              <ul className="list-disc pl-5 text-sm font-Roboto">
                <li>Используйте стрелки для поворота камеры</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => {
              cleanupResources();
              navigate("/menuroom");
            }}
            className="w-full mt-8 bg-[#ea5f5f] text-black text-lg font-Roboto py-3 rounded-full shadow-md hover:bg-[#d95353] transition-colors"
          >
            Завершить трансляцию
          </button>
        </div>
      </div>
    </div>
  );
});

export default RemotePage;