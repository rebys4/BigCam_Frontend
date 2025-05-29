import api from "./Api/api";

export class SessionService {
    static async listSessions() {
        try {
            const response = await api.get('/api/session');
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении сессий", error);
        }
    }

    static async startSession(gymId, cameraId) {
        try {
            const response = await api.post('/api/session', {
                "gym_id": gymId,
                "camera_id": cameraId,
            }, {
                headers: {
                    "Content-type": "application/json",
                }
            });
            console.log("Сессия успешно началась", response.data);
            return response.data;
        } catch (error) {
            console.log("Ошибка при создании сессии", error);
        }
    }

    static async finishSession(sessionId) {
        try {
            const response = await api.delete(`/api/session/${sessionId}`, {
                headers: {
                    "Content-type": "application/json",
                }
            });
            console.log("Сессия успешно закончена", response.data);
            return response.data;
        } catch (error) {
            console.log("Ошибка при прекращении сессии", error);
        }
    }
};

export default SessionService;