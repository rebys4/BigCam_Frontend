import React, { createContext, useContext } from 'react';
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

  React.useEffect(() => {
    const token = localStorage.getItem('access-token');
    if (token) {
      userStore.setAuth(true);
      userStore.getProfile().catch(err => {
        console.error("Ошибка при загрузке профиля:", err);
        localStorage.removeItem('access-token');
        userStore.setAuth(false);
      });
    }
  }, [userStore]);

  const updateUser = (newData) => {

    const updatedProfile = { ...userStore.profile, ...newData };


    if (newData.fullName && userStore.profile.fullName !== newData.fullName) {
      userStore.changeNameLastName(newData.fullName);
    }


    if (newData.avatar && userStore.profile.avatar !== newData.avatar) {
      userStore.changeAvatar(newData.avatar);
    }


    userStore.setProfile(updatedProfile);

    localStorage.setItem('userData', JSON.stringify(updatedProfile));
  };

  const enhancedUserStore = {
    ...userStore,
    userData: userStore.profile,
    updateUser,
    isAuthenticated: userStore.auth
  };

  return (
    <UserContext.Provider value={enhancedUserStore}>
      {children}
    </UserContext.Provider>
  );
});