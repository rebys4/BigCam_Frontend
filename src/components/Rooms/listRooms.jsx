import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GymService from "../../http/GymService";

const ListRoomsWithCameras = ({ onCameraSelect }) => {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const roomData = location.state || {};

  useEffect(() => {
    const fetchCameras = async () => {
      setLoading(true);
      try {
        const gymId = roomData?.roomId || 1; 
        console.log(`Загрузка камер для зала ID: ${gymId}`);
        
        const camerasData = await GymService.getCamerasById(1);
        
        if (Array.isArray(camerasData)) {
          setCameras(camerasData);
          console.log('Данные о камерах загружены:', camerasData);
        } else {
          console.error('Данные о камерах не являются массивом:', camerasData);
          setCameras([]);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных о камерах:', error);
        setCameras([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
  }, [roomData]);

  const handleCameraClick = (camera) => {
    if (onCameraSelect) {
      onCameraSelect(camera);
    }
  };

  const filteredCameras = cameras.filter(camera =>
    camera.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        {roomData?.roomName ? `${roomData.roomName} - Камеры` : '🎥 Список камер'}
      </h1>

      {/* Фильтр */}
      <input
        type="text"
        placeholder="🔎 Поиск камеры..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm"
      />

      {/* Спиннер при загрузке */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Сообщение "Нет данных", если нет камер */}
      {!loading && filteredCameras.length === 0 && (
        <p className="text-center text-gray-500">🚫 Нет доступных камер для этого зала.</p>
      )}

      {/* Список камер */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {filteredCameras.map((camera, index) => (
            <li 
              key={index} 
              className="py-4 px-6 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              onClick={() => handleCameraClick(camera)}
            >
              <div className="flex flex-col">
                <span className="font-medium text-lg">{camera.name}</span>
                <span className="text-gray-500 text-sm">{camera.description || "Без описания"}</span>
              </div>
              <div className="flex items-center">
                <span className={`w-3 h-3 rounded-full ${camera.occupied ? 'bg-red-500' : 'bg-green-500'} mr-2`}></span>
                <span>{camera.occupied ? 'Занята' : 'Свободна'}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListRoomsWithCameras;