import React, { useEffect, useState } from "react";
import GymService from "../../http/GymService"; // Путь подгони по своей структуре
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const ListRoomsWithCameras = ({ onCameraSelect }) => {
  const [zones, setZones] = useState([]);
  const [openZones, setOpenZones] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await GymService.getCamerasById(1);
        const groupedZones = groupCamerasByZone(data);
        setZones(groupedZones);
      } catch (error) {
        console.error('Ошибка при загрузке данных о камерах:', error);
        setZones([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupCamerasByZone = (data) => {
    const groupedData = {};
    data.forEach(camera => {
      if (!groupedData[camera.zone]) {
        groupedData[camera.zone] = [];
      }
      groupedData[camera.zone].push(camera.name);
    });

    // Сортировка зон по алфавиту
    return Object.entries(groupedData)
      .map(([zoneName, cameras]) => ({
        name: zoneName,
        cameras
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const toggleZone = (zoneName) => {
    setOpenZones((prev) => ({
      ...prev,
      [zoneName]: !prev[zoneName],
    }));
  };

  const handleClick = (camera) => {
    if (onCameraSelect) {
      onCameraSelect(camera);
    }
  };

  const filteredZones = zones.filter(zone =>
    zone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">🗺️ Список зон с камерами</h1>

      {/* Фильтр */}
      <input
        type="text"
        placeholder="🔎 Поиск по зонам..."
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

      {/* Сообщение "Нет данных", если сервер вернул пустой массив */}
      {!loading && filteredZones.length === 0 && (
        <p className="text-center text-gray-500">🚫 Нет данных по зонам.</p>
      )}

      {/* Список зон */}
      <div className="space-y-4">
        {filteredZones.map((zone) => (
          <div key={zone.name} className="bg-white rounded-lg shadow p-4">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleZone(zone.name)}
            >
              {openZones[zone.name] ? (
                <ChevronDownIcon className="h-6 w-6 text-blue-500" />
              ) : (
                <ChevronRightIcon className="h-6 w-6 text-blue-500" />
              )}
              <h2 className="text-lg font-semibold ml-2">{zone.name}</h2>
            </div>

            {/* Список камер */}
            {openZones[zone.name] && (
              <div className="ml-8 mt-2 space-y-2">
                {zone.cameras.map((camera, index) => (
                  <div
                    key={index}
                    className="flex items-center cursor-pointer p-2 rounded-md hover:bg-blue-100 transition"
                    onClick={() => handleClick(camera)}
                  >
                    🎥 <span className="ml-2">{camera}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRoomsWithCameras;
