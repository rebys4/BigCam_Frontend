import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaPlus, FaMinus, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Hls from 'hls.js';
import GymService from "../../http/GymService";
import { observer } from "mobx-react-lite";

const RemotePage = observer(() => {
  const remoteVideoRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const navigate = useNavigate();
  const hlsRef = useRef(null);

  const CAMERA_CONFIG = {
    ip: '89.169.174.232',
    port: '8080',
    streamPath: '/stream',
    username: 'admin',
    password: 'password',
    protocol: 'rtsp' 
  };

  const initVideoStream = () => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      
      const streamUrl = `http://${CAMERA_CONFIG.ip}:${CAMERA_CONFIG.port}/hls/stream.m3u8`;
      
      hls.loadSource(streamUrl);
      hls.attachMedia(remoteVideoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        remoteVideoRef.current.play();
        setConnected(true);
      });
    } else if (remoteVideoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      const streamUrl = `http://${CAMERA_CONFIG.ip}/hls/stream.m3u8`;
      remoteVideoRef.current.src = streamUrl;
      remoteVideoRef.current.addEventListener('loadedmetadata', () => {
        setConnected(true);
      });
    }
  };


  const cleanupResources = () => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    
    if (remoteVideoRef.current) {
      remoteVideoRef.current.pause();
      remoteVideoRef.current.removeAttribute('src');
      remoteVideoRef.current.load();
    }
    
    setConnected(false);
  };

  useEffect(() => {
    initVideoStream();

    return () => {
      cleanupResources();
    };
    }, []);

  

  const movePTZ = GymService.moveCamera;

  useEffect(() => {
    const handleBeforeUnload = () => {
      cleanupResources();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
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
          
          {connected && controlsVisible && (
            <div className="absolute bottom-8 right-8 bg-black/40 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
              {/* Контейнер с кнопками со структурированной сеткой */}
              <div className="grid grid-cols-3 grid-rows-3 gap-2 w-[180px] h-[180px]">
                {/* Верхний ряд */}
                <div className="col-span-1"></div> {/* Пустая ячейка */}
                <div className="flex justify-center">
                  <button 
                    className="w-14 h-14 rounded-full bg-[#ea5f5f] hover:bg-[#d95353] flex items-center justify-center text-white shadow-md transform hover:scale-105 transition-all"
                    onMouseDown={() => movePTZ('up')}
                    onMouseUp={() => movePTZ('stop')}
                    onTouchStart={() => movePTZ('up')}
                    onTouchEnd={() => movePTZ('stop')}
                  >
                    <FaArrowUp size={24} />
                  </button>
                </div>
                <div className="col-span-1"></div> {/* Пустая ячейка */}
                
                {/* Средний ряд */}
                <div className="flex justify-center items-center">
                  <button 
                    className="w-14 h-14 rounded-full bg-[#ea5f5f] hover:bg-[#d95353] flex items-center justify-center text-white shadow-md transform hover:scale-105 transition-all"
                    onMouseDown={() => movePTZ('left')}
                    onMouseUp={() => movePTZ('stop')}
                    onTouchStart={() => movePTZ('left')}
                    onTouchEnd={() => movePTZ('stop')}
                  >
                    <FaArrowLeft size={24} />
                  </button>
                </div>
                <div className="flex justify-center items-center">
                  <button 
                    className="w-14 h-14 rounded-full bg-[#ea5f5f] hover:bg-[#d95353] flex items-center justify-center text-white shadow-md transform hover:scale-105 transition-all"
                    onMouseDown={() => movePTZ('right')}
                    onMouseUp={() => movePTZ('stop')}
                    onTouchStart={() => movePTZ('right')}
                    onTouchEnd={() => movePTZ('stop')}
                  >
                    <FaArrowRight size={24} />
                  </button>
                </div>
                
                {/* Нижний ряд */}
                <div className="col-span-1"></div> {/* Пустая ячейка */}
                <div className="flex justify-center">
                  <button 
                    className="w-14 h-14 rounded-full bg-[#ea5f5f] hover:bg-[#d95353] flex items-center justify-center text-white shadow-md transform hover:scale-105 transition-all"
                    onMouseDown={() => movePTZ('down')}
                    onMouseUp={() => movePTZ('stop')}
                    onTouchStart={() => movePTZ('down')}
                    onTouchEnd={() => movePTZ('stop')}
                  >
                    <FaArrowDown size={24} />
                  </button>
                </div>
                <div className="col-span-1"></div> {/* Пустая ячейка */}
              </div>
            </div>
          )}
          
          {/* Кнопка показать/скрыть элементы управления - с улучшенным стилем */}
          <button 
            className="absolute top-4 right-4 bg-gray-800/70 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors flex items-center gap-2"
            onClick={() => setControlsVisible(!controlsVisible)}
          >
            {controlsVisible ? "Скрыть управление" : "Показать управление"}
          </button>
        </div>
        
        {/* Боковая панель справа, фиксированной ширины */}
        <div className="w-full lg:w-[350px] bg-white p-4">
          <h2 className="text-xl font-bold mb-4 font-Roboto">Информация о камере</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold font-Roboto">Название камеры</h3>
              <p className="font-Roboto">PTZ-камера #1</p>
            </div>
            <div>
              <h3 className="font-bold font-Roboto">Местоположение</h3>
              <p className="font-Roboto">Зал 1, Верхний правый угол</p>
            </div>
            <div>
              <h3 className="font-bold font-Roboto">Статус</h3>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span className="font-Roboto">Подключено</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold font-Roboto">Инструкция</h3>
              <ul className="list-disc pl-5 text-sm font-Roboto">
                <li>Используйте стрелки для поворота камеры</li>
                <li>Кнопки + и - для приближения/отдаления</li>
                <li>Кнопка "Home" для возврата в исходное положение</li>
              </ul>
            </div>
          </div>
          
          {/* Кнопка для завершения трансляции */}
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
