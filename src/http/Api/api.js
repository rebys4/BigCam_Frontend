import axios from 'axios';

const api = axios.create({
    baseURL: "http://89.169.174.232:8080",
    timeout: 10000
})

api.interceptors.request.use(cfg => {
    cfg.headers.Authorization = `Bearer ${localStorage.getItem('access-token')}`
    return cfg
})

api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && error.config && !error.config._isRetry)  {
            originalRequest._isRetry = true;
            try {
                const response = await axios.post(
                    "http://89.169.174.232:8080/api/refresh-token",
                    {},
                    {
                        headers: {
                            'refresh-token': getRefreshTokenFromCookie('refresh-token'),
                        }
                    }
                );
                console.log('refresh-token-response SUCCESS', response);
                setCookie('refresh-token', response.data.value.refreshToken, 180);
                localStorage.setItem('access-token', response.data.value.accessToken);
                return api.request(originalRequest);
            } catch (e) {
                console.log('NOT AUTHORIZED', e);
            }
        }
        return Promise.reject(error);
    }
);



const getRefreshTokenFromCookie = (name) => {
    const cookieName = name + "=";
    const decidedCookie = decodeURIComponent(document.cookie);
    const cookies = decidedCookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

const setCookie = (name, value, hoursToExpire) => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (hoursToExpire * 60 * 60 * 1000));
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
}


export default api