import React from "react";

const ChooseRoom = () => {
    const [roomName, setRoomName] = useState("");
    const [roomImage, setRoomImage] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
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
        </div>
    );
};

export default ChooseRoom;
