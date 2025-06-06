import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../http/UserContext/UserContext";

export class Room {
    constructor(name, image, id, authKey) {
        this.name = name;
        this.image = image;
        this.id = id;
        this.authKey = authKey;
    }
}

const ListRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const { createGym } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        const savedRooms = localStorage.getItem("rooms");
        if (savedRooms) {
            setRooms(JSON.parse(savedRooms));
        }
    }, []);

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * imagesRooms.length);
        return imagesRooms[randomIndex];
    }

    const imagesRooms = [
        "/assets/cardio.png",
        "/assets/fullbody.png",
        "/assets/group training.png",
        "/assets/main.png",
    ]

    const addRoom = async (gymName) => {
        try {
            const newGymData = await createGym(gymName);
            console.log(newGymData);
            const randomImage = getRandomImage();
            const newRoom = new Room(
                gymName,
                randomImage,
                newGymData.gym_id,
                newGymData.auth_key,
            );
            const updatedRooms = [...rooms, newRoom];
            
            console.log(newRoom.id, newRoom.authKey);
            setRooms(updatedRooms);
            localStorage.setItem("rooms", JSON.stringify(updatedRooms));
            console.log("Зал успешно создан", newGymData);
        } catch (error) {
            console.error("Ошибка при создании зала:", error);
        }
    };

    const deleteRoom = (indexToDelete) => {
        const updatedRooms = rooms.filter((_, index) => index !== indexToDelete);
        setRooms(updatedRooms);
        localStorage.setItem("rooms", JSON.stringify(updatedRooms));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (roomName) {
            addRoom(roomName);
            setRoomName("");
            setIsModalOpen(false);
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className="bg-gray-300 text-black text-lg font-Roboto py-2 px-6 rounded-[100px] shadow-md hover:bg-gray-400 transition-colors"
                >
                    {isEditMode ? "Отмена редактирования" : "Редактировать"}
                </button>
                {isEditMode && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#ea5f5f] text-black text-lg font-Roboto py-2 px-6 rounded-[100px] shadow-md hover:bg-[#d95353] transition-colors"
                    >
                        Добавить зал
                    </button>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {rooms.map((room, index) => (
                    <article key={index} className="relative bg-white rounded-[25px] shadow-lg overflow-hidden">
                        {isEditMode && (
                            <button
                                onClick={() => deleteRoom(index)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                                title="Удалить зал"
                            >
                                <FaTrash className="w-6 h-6" />
                            </button>
                        )}
                        <img
                            className="w-full h-[200px] object-cover"
                            src={room.image}
                            alt={room.name}
                        />
                        <div className="p-6">
                            <h3 className="text-black text-2xl font-normal font-Roboto mb-4">
                                {room.name}
                            </h3>
                            <button
                                onClick={() => navigate("/menuroom", {
                                    state: { 
                                        id: room.id,
                                        name: room.name,
                                        authKey: room.authKey 
                                    }

                                })}
                                className="w-full bg-[#ea5f5f] text-black text-xl font-normal font-Roboto py-3 rounded-[100px] shadow-md hover:bg-[#d95353] transition-colors"
                            >
                                Выбрать
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default ListRooms;