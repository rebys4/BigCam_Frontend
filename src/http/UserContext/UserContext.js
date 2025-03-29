import React, { createContext, useContext, useEffect } from 'react';
import { User } from '../User';
import { observer, useLocalObservable } from "mobx-react-lite";

const UserContext = createContext(null);

export const useUser = () => {
  const store = useContext(UserContext);
  if (!store) throw new Error('Используйте useUser внутри UserProvider!');
  return store;
};

export const UserProvider = observer(({ children }) => {
  const userStore = useLocalObservable(() => new User());

  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      try {
        const userData = JSON.parse(savedUserData);
        userStore.setProfile(userData);
        userStore.setUser(userData);
      } catch (e) {
        console.log("Ошибка при восстановлении профиля:", e);
      }
    }

    const token = localStorage.getItem('access-token');
    
    if (token) {
      userStore.setAuth(true);
    }
    
  }, [userStore]);

  const enhancedUserStore = {
    ...userStore,
    userData: userStore.profile || {},
    isAuthenticated: userStore.isAuth,
  };

  return (
    <UserContext.Provider value={enhancedUserStore}>
      {children}
    </UserContext.Provider>
  );
});