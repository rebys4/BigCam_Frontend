import axios from "axios";
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
            const response = await api.post('/api/user/sign-up', formData, {
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
        await api.post('/api/user/check-registration', requestData).then(response => {
            console.log("Подтверждение регистрации прошла успешно", response.data);
            result = response.data;
        }).catch(error => {
            console.log("Ошибка при подтверждении регистрации", error.data);
            result = error.data;
        })

        return result;
    }


    login = async ({ email, password }) => {
        let result = {};
        try {
            const response = await api.post('/api/user/sign-in',
                { 
                    email: email, 
                    password: password,
                },
                { headers: { 'Content-Type': 'application/json' } }
            );
            localStorage.setItem('access-token', response.data.value.accessToken);
            localStorage.setItem('email', response.data.value.email);
            this.setAuth(true);
            this.setUser(response.data.value);
            console.log("Успешный вход", response.data);
            this.setProfile(response.data.value);
            result = response.data;
        } catch (error) {
            console.log("Ошибка при входе", error.response ? error.response.data : error);
            result = error.response ? error.response.data : error;
        }

        
        return result;
    }


    getProfile = async () => {
        try {
            const response = await api.get('/api/user/get', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            this.setProfile(response.data.value);
            this.setAuth(true);
            this.setUser(response.data.value);
            console.log("Профиль успешно загружен", response.data);
        } catch (error) {
            console.log("Ошибка при загрузке профиля", error.response ? error.response.data : error);
            this.setProfile({});
            this.setAuth(false);
        }
    }


    changeNameLastName = async (newUserName) => {
        try {
            const response = await api.put("/api/user/update", {
                "Content-type": "application/json",
                params: { name: newUserName },
            });
            console.log("ФИО успешно изменено", response.data);
            this.setProfile(response.data.value);
        } catch (error) {
            console.log("Ошибка при изменении ФИО", error);
        }
    }

    setCookie = async (name, value, hoursToExpire) => {
        var expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (hoursToExpire * 60 * 60 * 1000));
        var expires = "expires=" + expirationDate.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

}