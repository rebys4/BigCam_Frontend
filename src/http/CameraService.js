import api from "./Api/api";

export class CameraService {
    static async startCameraAction(gymId, cameraId, formData) {
        try {
            const response = await api.get(`/api/gym/camera/ptz/${gymId}/${cameraId}`, formData, {
                headers: {
                    "Content-type": "application/json", 
                    "Authorization": `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            console.log(`Успешное начало трансляции видео с камеры ${cameraId}:`, response.data);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при начале трансляции видео с камеры ${cameraId}:`, error);
            return [];
        }
    }

    static async stopCameraAction(gymId, cameraId) {
        try {
            const response = await api.delete(`/api/gym/camera/ptz/${gymId}/${cameraId}`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            console.log(`Ошибка при остановке трансляции видео с камеры ${cameraId}:`, response.data);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при остановке трансляции видео с камеры ${cameraId}:`, error);
            return [];
        }
    }

    static async moveCamera(pan, tilt, zoom, gym_id, camera_id) {
        try {
            const payload = {
                "velocity": {
                    "pan": pan,
                    "tilt": tilt,
                    "zoom": zoom
                }, 
                "deadline": 60*60
            }
            const response = await api.post(`/api/gym/camera/ptz/${gym_id}/${camera_id}`, payload, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            console.log(`Успешное движение камеры ${camera_id}:`, response.data);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при движении камеры ${camera_id}:`, error);
            return [];
        }
    }
};

export default CameraService;