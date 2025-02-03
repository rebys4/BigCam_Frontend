import React, { useState } from "react";
import ChooseRoom from "../modalDialog/modalDialog";

class Room {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }
}

const ListRooms = () => {
    
    const [rooms, setRooms] = useState([]);

    
    const addRoom = (name, image) => {
        const newRoom = new Room(name, image);
        setRooms([...rooms, newRoom]);
        setIsModalOpen(false); 
    };

    // Обработчик отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();
        if (roomName && roomImage) {
            addRoom(roomName, roomImage);
            setRoomName("");
            setRoomImage("");
        }
    };

    return (
        <section className="w-full max-w-[1800px] h-auto mx-auto p-5 bg-[#fcf6f6]/20 rounded-[25px] shadow-2xl overflow-hidden">
            <h2 className="text-center text-black text-4xl font-normal font-Roboto mb-8">
                Выберите зону тренировок
            </h2>

            {/* Кнопка для открытия модального окна */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#ea5f5f] text-black text-xl font-normal font-Roboto py-3 px-6 rounded-[100px] shadow-md hover:bg-[#d95353] transition-colors"
                >
                    Добавить зал
                </button>
            </div>

            {/* Модальное окно */}
            {isModalOpen && <ChooseRoom />}

            {/* Список залов */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {rooms.map((room, index) => (
                    <article key={index} className="bg-white rounded-[25px] shadow-lg overflow-hidden">
                        <img
                            className="w-full h-[200px] object-cover"
                            src={room.image}
                            alt={room.name}
                        />
                        <div className="p-6">
                            <h3 className="text-black text-2xl font-normal font-Roboto mb-4">
                                {room.name}
                            </h3>
                            <button className="w-full bg-[#ea5f5f] text-black text-xl font-normal font-Roboto py-3 rounded-[100px] shadow-md hover:bg-[#d95353] transition-colors">
                                Выбрать
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default ListRooms;