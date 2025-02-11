import React, { useState } from "react";
import NavBar from "../navbar/NavBar";
import GymZoneMap from "../Rooms/gymZone";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

const qualities = [
  { id: 1, name: "1920х1080" },
  { id: 2, name: "1280х720" },
  { id: 3, name: "640х480" },
];

const MenuRoom = () => {
  const [selectedQuality, setSelectedQuality] = useState(qualities[0]);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />
      <div className="flex flex-col lg:flex-row flex-grow m-4 gap-4">
        <section className="flex-grow bg-white rounded-[25px] shadow-xl p-4">
          <figure className="w-full">
            <GymZoneMap />
            <figcaption className="mt-4 text-center text-black text-2xl">
              Схема зоны
            </figcaption>
          </figure>
        </section>
        <aside className="w-full lg:w-[450px] bg-[#fffbfb]/20 rounded-[25px] shadow-2xl p-6">
          <header>
            <h1 className="text-black text-3xl font-normal font-Roboto mb-4">
              Настройка камеры
            </h1>
          </header>
          <section className="mb-4">
            <h2 className="text-black text-xl font-normal font-Roboto mb-2">
              Качество трансляции:
            </h2>
            <Listbox value={selectedQuality} onChange={setSelectedQuality}>
              <ListboxButton className="w-full bg-[#f8f4f4] rounded-[10px] p-2 text-black text-base font-normal font-Roboto text-left focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">
                {selectedQuality.name}
              </ListboxButton>
              <ListboxOptions className="mt-1 bg-white shadow-lg max-h-60 py-1 text-base w-[var(--button-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none
                transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0">
                {qualities.map((option) => (
                  <ListboxOption
                    key={option.id}
                    value={option}
                    className={({ active }) =>
                      `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                        active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <span className={`block ${selected ? "font-medium" : "font-normal"}`}>
                        {option.name}
                      </span>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </section>
          <button className="w-full bg-[#ea5f5f] text-black text-lg font-Roboto py-3 rounded-full shadow-md hover:bg-[#d95353] transition-colors">
            Подтвердить
          </button>
        </aside>
      </div>
    </main>
  );
};

export default MenuRoom;