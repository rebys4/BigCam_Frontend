import React, { useState, useEffect } from "react";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import GymService from "../../http/GymService";

const ListRoomsWithCameras = ({ onCameraSelect }) => {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const roomdata = location.state;

  useEffect(() => {
    const fetchCameras = async () => {
      setLoading(true);
      try {
        const gymId = roomdata.id;
        const response = await GymService.getCamerasById(gymId);
        const camRaw = response.cameras;
        const cameraArray = camRaw.map(camera => ({
          id: camera.camera_id,
          name: `Камера ${camera.camera_id}`,
          description: camera.description,  
        }));
        setCameras(cameraArray);
      } catch (error) {
        console.error('Ошибка при загрузке данных о камерах', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
  }, [roomdata]);

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
        {roomdata.name ? `${roomdata.name} - Камеры` : '🎥 Список камер'}
      </h1>

      {/* Фильтр */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="🔎 Поиск камеры..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Спиннер при загрузке */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Сообщение "Нет данных", если нет камер */}
      {!loading && filteredCameras.length === 0 && (
        <div className="text-center py-10">
          <div className="inline-block p-4 rounded-full bg-gray-200 mb-4">
            <FaVideoSlash className="h-10 w-10 text-gray-500" />
          </div>
          <p className="text-gray-500 text-xl">Камеры не найдены</p>
          <p className="text-gray-400">Попробуйте изменить параметры поиска или выберите другой зал</p>
        </div>
      )}

      {/* Список камер */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCameras.map((camera) => (
          <div
            key={camera.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCameraClick(camera)}
          >
            <div className="p-4 border-l-4 border-blue-500 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {camera.occupied ? (
                  <div className="bg-red-100 p-2 rounded-full">
                    <FaVideoSlash className="h-6 w-6 text-red-500" />
                  </div>
                ) : (
                  <div className="bg-green-100 p-2 rounded-full">
                    <FaVideo className="h-6 w-6 text-green-500" />
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-lg">{camera.name}</h3>
                  <p className="text-gray-500 text-sm">{camera.description}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  camera.occupied ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {camera.occupied ? 'Занята' : 'Свободна'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRoomsWithCameras;