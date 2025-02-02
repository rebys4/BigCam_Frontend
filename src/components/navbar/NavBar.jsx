import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material"; // Используем только Avatar из Material UI

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <header className="w-full bg-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center px-6 py-4">
                {/* Логотип и название приложения */}
                <div className="flex items-center space-x-4">
                    <img
                        src="/assets/exercise.png"
                        alt="Логотип FitnessMonitor"
                        className="w-10 h-10"
                    />
                    <h1 className="text-black text-2xl font-normal font-roboto">
                        FitnessMonitor
                    </h1>
                </div>

                {/* Навигационные ссылки */}
                <nav className="hidden md:flex space-x-8">
                    <a
                        href="#"
                        className="text-black text-xl font-normal font-roboto hover:text-gray-700 transition-colors"
                    >
                        Настройки
                    </a>
                    <a
                        href="#"
                        className="text-black text-xl font-normal font-roboto hover:text-gray-700 transition-colors"
                    >
                        Тех. поддержка
                    </a>
                </nav>

                {/* Блок с аватаром и именем пользователя */}
                <div className="flex items-center space-x-3">
                    <Avatar
                        src="/assets/logo account.png"
                        alt="Аватар пользователя"
                        className="w-12 h-12"
                    />
                    <p className="text-black text-xl font-normal font-roboto">
                        Иван Иванов
                    </p>
                </div>
            </div>
        </header>
    );
};

export default NavBar;