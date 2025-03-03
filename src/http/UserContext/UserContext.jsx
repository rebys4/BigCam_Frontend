// UserContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Создаем контекст
const UserContext = createContext();

// Создаем хук для использования контекста
export const useUser = () => useContext(UserContext);

// Создаем провайдер
export const UserProvider = ({ children }) => {
  // Загружаем данные из localStorage при инициализации
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem('userData');
    return savedData ? JSON.parse(savedData) : {
      fullName: 'Иван Иванов',
      email: 'ivan@example.com',
      dob: '2000-01-01',
      avatar: '/assets/logo account.png'
    };
  });

  // Сохраняем данные в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  // Функция для обновления данных пользователя
  const updateUser = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};