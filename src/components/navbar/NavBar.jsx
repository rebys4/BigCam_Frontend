import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useUser } from "../../http/UserContext/UserContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { userData } = useUser();

  return (
    <header className="w-full bg-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div onClick={() => navigate('/main')} className="flex items-center space-x-2 cursor-pointer">
          <img
            src="/assets/exercise.png"
            alt="Логотип FitnessMonitor"
            className="w-10 h-10 mt-0.5"
          />
          <h1 className="text-black text-2xl font-normal font-roboto">
            FitnessRemote
          </h1>
        </div>

        {/* Блок с аватаром и именем пользователя */}
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton className="relative flex items-center gap-2 rounded-full border-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              <span className="absolute -inset-1.5" />
              <img
                alt="Аватар пользователя"
                src={userData.avatar}
                className="h-9 w-9 rounded-full"
              />
              <p className="text-black text-xl font-normal font-roboto">
                {userData.fullName}
              </p>
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <MenuItem>
              <a
                onClick={() => navigate('/profile')}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none font-Roboto cursor-pointer"
              >
                Личный кабинет
              </a>
            </MenuItem>
            <MenuItem>
              <a
                onClick={() => navigate('/')}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none font-Roboto cursor-pointer"
              >
                Выход
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
};

export default NavBar;