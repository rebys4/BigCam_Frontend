import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";

const GymZoneMap = ({ onCameraSelect }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cameraInfo, setCameraInfo] = useState(null);
  const navigate = useNavigate();

  const handleClick = (info) => {
    setCameraInfo(info);
    setModalOpen(true);
    
    if (onCameraSelect) {
      onCameraSelect(info);
    }
  };

  return (
    <div className="relative">
      <svg className="w-full h-full" viewBox="0 0 1000 700">
        {/* Зона кардио */}
        <rect
          x="50"
          y="50"
          width="300"
          height="200"
          fill="#e0f7fa"
          stroke="#0097a7"
          strokeWidth="2"
          onClick={() =>
            handleClick({
              name: "Зона кардио",
              description:
                "Здесь расположены беговые дорожки, велотренажеры и тренажер-лестница.",
              occupied: false,
              id: "cardio-zone"
            })
          }
          style={{ cursor: "pointer" }}
        />
        <text
          x="200"
          y="30"
          textAnchor="middle"
          className="font-bold text-lg fill-current text-gray-800"
        >
          Кардио зона
        </text>

        {/* Зона групповых тренировок */}
        <rect
          x="400"
          y="50"
          width="550"
          height="200"
          fill="#f3e5f5"
          stroke="#8e24aa"
          strokeWidth="2"
          onClick={() =>
            handleClick({
              name: "Зона для групповых тренировок",
              description: "Помещение для групповых занятий.",
              occupied: true,
              id: "group-zone"
            })
          }
          style={{ cursor: "pointer" }}
        />
        <text
          x="675"
          y="150"
          textAnchor="middle"
          className="font-bold text-xl fill-current text-gray-800"
        >
          Зона для групповых тренировок
        </text>

        {/* Общая зона */}
        <rect
          x="50"
          y="300"
          width="900"
          height="350"
          fill="#e8f5e9"
          stroke="#43a047"
          strokeWidth="2"
          onClick={() =>
            handleClick({
              name: "Общая зона",
              description:
                "Основное помещение с тренажерами и расположением камер.",
              occupied: false,
              id: "general-zone"
            })
          }
          style={{ cursor: "pointer" }}
        />
        <text
          x="500"
          y="280"
          textAnchor="middle"
          className="font-bold text-lg fill-current text-gray-800"
        >
          Общая зона
        </text>

        {/* Метки для камер */}
        <circle
          cx="50"
          cy="300"
          r="8"
          fill="#d32f2f"
          onClick={() =>
            handleClick({
              name: "Камера: Верхний левый угол",
              description: "Наблюдает за входом в общую зону.",
              occupied: false,
              id: "camera-top-left"
            })
          }
          style={{ cursor: "pointer" }}
        />
        <circle
          cx="950"
          cy="300"
          r="8"
          fill="#d32f2f"
          onClick={() =>
            handleClick({
              name: "Камера: Верхний правый угол",
              description: "Контролирует верхнюю часть зала.",
              occupied: true,
              id: "camera-top-right"
            })
          }
          style={{ cursor: "pointer" }}
        />
        <circle
          cx="50"
          cy="650"
          r="8"
          fill="#d32f2f"
          onClick={() =>
            handleClick({
              name: "Камера: Нижний левый угол",
              description: "Наблюдение за активностью в левом углу.",
              occupied: false,
              id: "camera-bottom-left"
            })
          }
          style={{ cursor: "pointer" }}
        />
        <circle
          cx="950"
          cy="650"
          r="8"
          fill="#d32f2f"
          onClick={() =>
            handleClick({
              name: "Камера: Нижний правый угол",
              description: "Наблюдение за активностью в правом углу.",
              occupied: false,
              id: "camera-bottom-right"
            })
          }
          style={{ cursor: "pointer" }}
        />
      </svg>
    </div>
  );
};

export default GymZoneMap;