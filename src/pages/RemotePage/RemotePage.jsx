import React, { useEffect, useRef } from "react";
import NavBar from "../../components/navbar/NavBar";

const RemotePage = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const pc1Ref = useRef(null);
    const pc2Ref = useRef(null);

    useEffect(() => {
        let localStream = null;

        async function start() {
            try {
                console.log("Запрашиваем доступ к камере...");
                localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = localStream;
                }

                console.log("Камера получена, создаём PeerConnection...");

                const pc1 = new RTCPeerConnection({
                    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
                }); 
                const pc2 = new RTCPeerConnection({
                    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
                });

                pc1Ref.current = pc1;
                pc2Ref.current = pc2;

                // Добавляем видеопоток в первый PeerConnection
                localStream.getTracks().forEach(track => {
                    pc1.addTrack(track, localStream);
                });

                // Обмен ICE-кандидатами
                pc1.onicecandidate = event => {
                    if (event.candidate) {
                        pc2.addIceCandidate(event.candidate).catch(err => console.error("Ошибка ICE в pc2:", err));
                    }
                };

                pc2.onicecandidate = event => {
                    if (event.candidate) {
                        pc1.addIceCandidate(event.candidate).catch(err => console.error("Ошибка ICE в pc1:", err));
                    }
                };

                // Получаем видеопоток с pc2 и передаём в remoteVideoRef
                pc2.ontrack = event => {
                    console.log("Получен поток в pc2:", event.streams[0]);
                    if (remoteVideoRef.current) {
                        remoteVideoRef.current.srcObject = event.streams[0];
                    }
                };

                // Устанавливаем соединение между pc1 и pc2
                const offer = await pc1.createOffer();
                await pc1.setLocalDescription(offer);
                await pc2.setRemoteDescription(offer);

                const answer = await pc2.createAnswer();
                await pc2.setLocalDescription(answer);
                await pc1.setRemoteDescription(answer);

                console.log("WebRTC соединение установлено!");
            } catch (err) {
                console.error("Ошибка при установке WebRTC-соединения:", err);
            }
        }

        start();

        return () => {
            console.log("Очистка ресурсов...");
            if (pc1Ref.current) {
                pc1Ref.current.close();
                pc1Ref.current = null;
            }
            if (pc2Ref.current) {
                pc2Ref.current.close();
                pc2Ref.current = null;
            }
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <NavBar />
            <h1>Локальная трансляция с камеры через WebRTC</h1>
            <div style={{ marginBottom: "20px" }}>
                <h2>Локальное видео (исходный поток)</h2>
                <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{
                        width: "320px",
                        height: "240px",
                        background: "#000",
                        border: "1px solid #ccc",
                    }}
                />
            </div>
            <div>
                <h2>Удаленное видео (получено через loopback WebRTC)</h2>
                <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{
                        width: "320px",
                        height: "240px",
                        background: "#000",
                        border: "1px solid #ccc",
                    }}
                />
            </div>
        </div>
    );
};

export default RemotePage;
