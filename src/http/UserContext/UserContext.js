import React, { createContext, useContext, useEffect } from 'react';
import { User } from '../../http/User';
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
    const token = localStorage.getItem('access-token');
    if (token) {
      userStore.setAuth(true);
      userStore.getProfile().catch(err => {
        console.error("Ошибка при загрузке профиля:", err);
        userStore.setAuth(false);
      });
    }
  }, [userStore]);

  const enhancedUserStore = {
    ...userStore,
    userData: userStore.profile || {},
    isAuthenticated: userStore.auth,
  };

  return (
    <UserContext.Provider value={enhancedUserStore}>
      {children}
    </UserContext.Provider>
  );
});