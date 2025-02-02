import React from "react";

const ListRooms = () => {
    return (
        <section className="w-full max-w-[1800px] h-auto mx-auto p-5 bg-[#fcf6f6]/20 rounded-[25px] shadow-2xl overflow-hidden">
            <h2 className="text-center text-black text-4xl font-normal font-Roboto mb-8">
                Выберите зону тренировок
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Зона Fullbody */}
                <article className="bg-white rounded-[25px] shadow-lg overflow-hidden">
                    <img
                        className="w-full h-[200px] object-cover"
                        src="/assets/fullbody.png"
                        alt="Зона Fullbody"
                    />
                    <div className="p-6">
                        <h3 className="text-black text-2xl font-normal font-Roboto mb-4">
                            Зона Fullbody
                        </h3>
                        <button className="w-full bg-[#ea5f5f] text-black text-xl font-normal font-Roboto py-3 rounded-[100px] shadow-md hover:bg-[#d95353] transition-colors">
                            Выбрать
                        </button>
                    </div>
                </article>

                {/* Зона Cardio */}
                <article className="bg-white rounded-[25px] shadow-lg overflow-hidden">
                    <img
                        className="w-full h-[200px] object-cover"
                        src="/assets/cardio.png"
                        alt="Зона Cardio"
                    />
                    <div className="p-6">
                        <h3 className="text-black text-2xl font-normal font-Roboto mb-4">
                            Зона Cardio
                        </h3>
                        <button className="w-full bg-[#ea5f5f] text-black text-xl font-normal font-Roboto py-3 rounded-[100px] shadow-md hover:bg-[#d95353] transition-colors">
                            Выбрать
                        </button>
                    </div>
                </article>

                {/* Общая зона */}
                <article className="bg-white rounded-[25px] shadow-lg overflow-hidden">
                    <img
                        className="w-full h-[200px] object-cover"
                        src="/assets/main.png"
                        alt="Общая зона"
                    />
                    <div className="p-6">
                        <h3 className="text-black text-2xl font-normal font-Roboto mb-4">
                            Общая зона
                        </h3>
                        <button className="w-full bg-[#ea5f5f] text-black text-xl font-normal font-Roboto py-3 rounded-[100px] shadow-md hover:bg-[#d95353] transition-colors">
                            Выбрать
                        </button>
                    </div>
                </article>

                {/* Зона групповых тренировок */}
                <article className="bg-white rounded-[25px] shadow-lg overflow-hidden">
                    <img
                        className="w-full h-[200px] object-cover"
                        src="/assets/group training.png"
                        alt="Зона групповых тренировок"
                    />
                    <div className="p-6">
                        <h3 className="text-black text-2xl font-normal font-Roboto mb-4">
                            Зона групповых тренировок
                        </h3>
                        <button className="w-full bg-[#ea5f5f] text-black text-xl font-normal font-Roboto py-3 rounded-[100px] shadow-md hover:bg-[#d95353] transition-colors">
                            Выбрать
                        </button>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default ListRooms;