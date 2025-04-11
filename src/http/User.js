import api from "./Api/api";
import { makeAutoObservable } from "mobx";

export class User {

    user = {};
    profile = {};
    isAdmin = null;
    isAuth = null;


    constructor() {
        makeAutoObservable(this);
    }

    setUser(user) {
        this.user = user;
    }

    setProfile(profile) {
        this.profile = profile;
    }

    setAdmin(admin) {
        this.admin = admin;
    }

    setAuth(auth) {
        this.auth = auth;
    }

    register = async (formData) => {
        let result = {};
        try {
            const response = await api.post('/api/auth/sign-up', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            result = response.data;
            console.log("Регистрация прошла успешно", response.data);
        } catch (error) {
            if (error.response) {
                result = error.response.data;
                console.log("Ошибка при регистрации", error.response.data);
            } else {
                result = { message: error.message };
                console.log("Ошибка при регистрации", error.message);
            }
        }
        return result;
    };



    checkConfirmRegister = async (email, code = null) => {
        let result = {};
        const requestData = { email };
        if (code) {
            requestData.confirmationCode = code;
        }
        await api.post('/api/auth/check-registration', requestData).then(response => {
            console.log("Подтверждение регистрации прошла успешно", response.data);
            result = response.data;
        }).catch(error => {
            console.log("Ошибка при подтверждении регистрации", error.data);
            result = error.data;
        })

        return result;
    }


    login = async (formData) => {
        let result = {};
        try {
            console.log("Данные для входа", formData);
            const headers = { 'Content-Type': 'application/json' };
            console.log(headers);
            const response = await api.post('/api/auth/sign-in', formData,
                { headers }
            );
            console.log("response", response);
            localStorage.setItem('access-token', response.data.access_token);
            localStorage.setItem('refresh-token', response.data.refresh_token);
            this.setAuth(true);
            this.setUser(response.data);
            console.log("Успешный вход", response.data);
            this.setProfile(response.data);
            result = response.data;
            await this.getProfile();
        } catch (error) {
            console.log("Ошибка при входе", error.response ? error.response.data : error);
            result = error.response ? error.response.data : error;
        }

        return result;
    }


    getProfile = async () => {
        try {
            const token = localStorage.getItem('access-token');

            if (!token) {
                throw new Error("Токен не найден");
            }

            console.log("Запрос профиля с тоекном:", token.substring(0, 10) + "...");

            const response = await api.get('/api/user', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const profileData = {
                name: response.data.name || response.data.fullName || '',
                email: response.data.email || '',
                avatar_id: response.data.avatar_id || '',
                dob: response.data.dob || null
            };
            
            if (profileData.avatar_id && !profileData.avatar_id.startsWith('http')) {
                const bucket = 'avatar-bucket';
                const endPoint = 'storage.yandexcloud.net';
                profileData.avatar_id = `https://${bucket}.${endPoint}/avatars/avatar-${profileData.avatar_id}.jpeg`;
            }

            this.setProfile(profileData);
            this.setAuth(true);
            this.setUser(profileData);
            console.log("Профиль успешно загружен", response.data);
            localStorage.setItem("userData", JSON.stringify(profileData));

            return profileData;
        } catch (error) {
            console.log("Ошибка при загрузке профиля", error.response ? error.response.data : error);
            this.setProfile({});
            this.setAuth(false);

            localStorage.removeItem('access-token');
            localStorage.removeItem('refresh-token');
            // throw new Error("Ошибка при загрузке профиля");
        }
    }

    createGym = async (name) => {
        try {
            const response = await api.post("/api/gym", {name: name}, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            console.log("Зал успешно создан", response.data);

            if (response.data && response.data.auth_key) {
                localStorage.setItem(`gym_auth_key_${Date.now()}`, response.data.auth_key)
                return {
                    ...response.data,
                    saved_auth_key: true
                }
            }

            return response.data;

        } catch (error) {
            console.log("Ошибка при создании зала:", error.response?.data || error.message);
        }
    }


    updateUser = async (formData) => {
        try {
            console.log("Данные для обновления профиля", formData);
            const dataToSend = { ...formData };

            if (dataToSend.avatar_id && dataToSend.avatar_id.startsWith('http')) {
                const urlParts = dataToSend.avatar_id.split('/');
                const fileName = urlParts[urlParts.length - 1];
                const idMatch = fileName.match(/avatar-(.+)\.(jpg|jpeg|png|gif)/);
                if (idMatch && idMatch[1]) {
                    dataToSend.avatar_id = idMatch[1];
                }
            }
            await api.put("/api/user", dataToSend, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            const updatedProfile = { ...this.profile, ...formData}
            console.log("Новые данные пользователя загружены!", updatedProfile);
            this.setProfile(updatedProfile);
            this.setUser(updatedProfile);
            localStorage.setItem("userData", JSON.stringify(updatedProfile));
            return updatedProfile;  
        } catch (error) {
            console.log("Ошибка при загрузке новых данных", error);
        }
    }

    setCookie = async (name, value, hoursToExpire) => {
        var expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (hoursToExpire * 60 * 60 * 1000));
        var expires = "expires=" + expirationDate.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

}