import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import GymZoneMap from "../Rooms/gymZone";

const qualities = [
  { id: 1, name: "1920х1080" },
  { id: 2, name: "1280х720" },
  { id: 3, name: "640х480" },
];

const MenuRoom = () => {
  const [selectedQuality, setSelectedQuality] = useState(qualities[0]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const navigate = useNavigate();

  // Обработчик выбора камеры
  const handleCameraSelect = (cameraInfo) => {
    setSelectedCamera(cameraInfo);
  };

  // Переход на страницу трансляции
  const goToRemotePage = () => {
    if (selectedCamera && !selectedCamera.occupied) {
      // Можно передать id камеры через state или параметры URL
      navigate("/remotePage", { state: { cameraId: selectedCamera.id } });
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />
      <div className="flex flex-col lg:flex-row flex-grow m-4 gap-4">
        <section className="flex-grow bg-white rounded-[25px] shadow-xl p-4">
          <figcaption className="mt-4 text-center text-black text-2xl">
            Схема фитнес-зала
          </figcaption>
          <figure className="w-full">
            <GymZoneMap onCameraSelect={handleCameraSelect} />
          </figure>
        </section>
        <aside className="w-full lg:w-[450px] bg-[#fffbfb]/20 rounded-[25px] shadow-2xl p-6">
          
          {selectedCamera ? (
            <>
              <section className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-black text-xl font-normal font-Roboto">
                    Статус камеры:
                  </h2>
                  <div className="flex items-center">
                    <span
                      className={`inline-block w-4 h-4 rounded-full mr-2 ${
                        selectedCamera.occupied ? "bg-red-500" : "bg-green-500"
                      }`}
                    ></span>
                    <span>{selectedCamera.occupied ? "Занята" : "Свободна"}</span>
                  </div>
                </div>
                
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-gray-700">
                    {selectedCamera.description}
                  </p>
                  <p className="text-gray-700 mt-2">
                    {selectedCamera.occupied 
                      ? "Камера в данный момент используется другим пользователем. Пожалуйста, попробуйте позже или выберите другую камеру."
                      : "Камера свободна и готова к использованию. Вы можете начать трансляцию."
                    } 
                  </p>
                </div>
              </section>
              
              <button
                onClick={goToRemotePage}
                disabled={selectedCamera.occupied}
                className={`w-full text-black text-lg font-Roboto py-3 rounded-full shadow-md transition-colors ${
                  selectedCamera.occupied 
                    ? "bg-gray-300 cursor-not-allowed" 
                    : "bg-[#ea5f5f] hover:bg-[#d95353]"
                }`}
              >
                Выбрать камеру
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500 text-xl">Выберите камеру на схеме</p>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
};

export default MenuRoom;