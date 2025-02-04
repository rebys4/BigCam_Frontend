import React, { useState } from "react";

export class Room {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }
}

const ListRooms = () => {
    
    const [roomName, setRoomName] = useState("");
    const [roomImage, setRoomImage] = useState("");
    const [rooms, setRooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addRoom = (name, image) => {
        const newRoom = new Room(name, image);
        setRooms([...rooms, newRoom]);
        setIsModalOpen(false); 
    };

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
            {isModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-[25px] shadow-lg p-8 w-full max-w-md">
                <h3 className="text-black text-2xl font-normal font-Roboto mb-6 text-center">
                    Добавить новый зал
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Название зала"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="w-full p-3 border rounded-[10px] text-black text-lg font-Roboto focus:outline-none focus:ring-2 focus:ring-[#ea5f5f]"
                    />
                    <input
                        type="text"
                        placeholder="Ссылка на изображение"
                        value={roomImage}
                        onChange={(e) => setRoomImage(e.target.value)}
                        className="w-full p-3 border rounded-[10px] text-black text-lg font-Roboto focus:outline-none focus:ring-2 focus:ring-[#ea5f5f]"
                    />
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="bg-gray-300 text-black text-lg font-Roboto py-2 px-6 rounded-[100px] shadow-md hover:bg-gray-400 transition-colors"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="bg-[#ea5f5f] text-black text-lg font-Roboto py-2 px-6 rounded-[100px] shadow-md hover:bg-[#d95353] transition-colors"
                        >
                            Добавить
                        </button>
                    </div>
                </form>
            </div>
        </div>}

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