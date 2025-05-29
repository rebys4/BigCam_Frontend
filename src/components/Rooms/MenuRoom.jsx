import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import ListRoomsWithCameras from "./listRooms";
import GymService from "../../http/GymService"; 

const MenuRoom = () => {
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [cameraDetails, setCameraDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const roomdata = location.state;

  // Обработчик выбора камеры
  const handleCameraSelect = async (cameraInfo) => {
    setSelectedCamera(cameraInfo);

    if (cameraInfo && cameraInfo.id) {
      setLoadingDetails(true);
      try {
        const camerasData = await GymService.getCamerasById(cameraInfo.id);
        const foundCamera = camerasData.find((cam) => cam.id === cameraInfo.id);

        if (foundCamera) {
          setCameraDetails(foundCamera);
        } else {
          setCameraDetails({ description: "Описание не найдено." });
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных о камере:", error);
        setCameraDetails({ description: "Не удалось загрузить описание." });
      } finally {
        setLoadingDetails(false);
      }
    }
  };

  // Переход на страницу трансляции
  const goToRemotePage = () => {
    if (selectedCamera && !selectedCamera.occupied) {
      navigate("/remotePage", { state: { 
        gym_id: roomdata.id,
        camera_id: selectedCamera.id,
        description: cameraDetails?.description || selectedCamera.description
      }});
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />
      <div className="flex flex-col lg:flex-row flex-grow m-4 gap-4">
        <section className="flex-grow bg-white rounded-[25px] shadow-xl p-4">
          <figure className="w-full">
            <ListRoomsWithCameras onCameraSelect={handleCameraSelect} />
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
                  {/* Спиннер при загрузке данных о камере */}
                  {loadingDetails ? (
                    <div className="flex justify-center items-center py-4">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-700">{cameraDetails?.description || "Описание отсутствует."}</p>
                      <p className="text-gray-700 mt-2">
                        {selectedCamera.occupied 
                          ? "Камера в данный момент используется другим пользователем. Пожалуйста, попробуйте позже или выберите другую камеру."
                          : "Камера свободна и готова к использованию. Вы можете начать трансляцию."
                        } 
                      </p>
                    </>
                  )}
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
              <p className="text-gray-500 text-xl">Выберите камеру</p>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
};

export default MenuRoom;


