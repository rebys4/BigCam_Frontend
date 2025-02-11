import React from "react";

const GymLayout = () => {
  return (
    <div className="w-full h-full p-4 bg-gray-50">
      <svg className="w-full h-full" viewBox="0 0 1000 700">
        {/* Зона кардио */}
        <rect x="50" y="50" width="300" height="200" fill="#e0f7fa" stroke="#0097a7" strokeWidth="2" />
        <text x="200" y="30" textAnchor="middle" className="font-bold text-lg fill-current text-gray-800">
          Кардио зона
        </text>
        {/* Беговые дорожки */}
        <rect x="70" y="70" width="80" height="40" fill="#b0c4de" stroke="#000" />
        <text x="110" y="95" textAnchor="middle" className="text-xs fill-current text-gray-800">
          Беговая дорожка
        </text>
        <rect x="170" y="70" width="80" height="40" fill="#b0c4de" stroke="#000" />
        <text x="210" y="95" textAnchor="middle" className="text-xs fill-current text-gray-800">
          Беговая дорожка
        </text>
        {/* Велотренажер */}
        <rect x="70" y="130" width="80" height="40" fill="#ffe0b2" stroke="#fb8c00" />
        <text x="110" y="155" textAnchor="middle" className="text-xs fill-current text-gray-800">
          Велотренажер
        </text>
        {/* Тренажер-лестница */}
        <rect x="170" y="130" width="80" height="40" fill="#c8e6c9" stroke="#43a047" />
        <text x="210" y="155" textAnchor="middle" className="text-xs fill-current text-gray-800">
          Лестница
        </text>

        {/* Зона групповых тренировок */}
        <rect x="400" y="50" width="550" height="200" fill="#f3e5f5" stroke="#8e24aa" strokeWidth="2" />
        <text x="675" y="150" textAnchor="middle" className="font-bold text-xl fill-current text-gray-800">
          Зона для групповых тренировок
        </text>

        {/* Общая зона */}
        <rect x="50" y="300" width="900" height="350" fill="#e8f5e9" stroke="#43a047" strokeWidth="2" />
        <text x="500" y="280" textAnchor="middle" className="font-bold text-lg fill-current text-gray-800">
          Общая зона
        </text>
        {/* Metки для камер (точки в углах) */}
        {/* Верхний левый угол */}
        <circle cx="50" cy="300" r="8" fill="#d32f2f" />
        {/* Верхний правый угол */}
        <circle cx="950" cy="300" r="8" fill="#d32f2f" />
        {/* Нижний левый угол */}
        <circle cx="50" cy="650" r="8" fill="#d32f2f" />
        {/* Нижний правый угол */}
        <circle cx="950" cy="650" r="8" fill="#d32f2f" />
      </svg>
    </div>
  );
};

export default GymLayout;
