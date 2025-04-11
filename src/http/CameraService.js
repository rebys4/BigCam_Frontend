import api from "./Api/api";

export class CameraService {
    static async startCameraAction(gymId, cameraId, formData) {
        try {
            const response = await api.get(`/api/gym/camera/ptz/${gymId}/${cameraId}`, formData, {
                headers: {
                    "Content-type": "application/json",    
                }
            });
            console.log(`Успешное начало трансляции видео с камеры ${cameraId}:`, response.data);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при начале трансляции видео с камеры ${cameraId}:`, error);
            return [];
        }
    }

    static async stopCameraAction() {
        try {
            const response = await api.delete(`/api/gym/camera/ptz/${gymId}/${cameraId}`, {
                headers: {
                    "Content-type": "application/json",
                }
            });
            console.log(`Ошибка при остановке трансляции видео с камеры ${cameraId}:`, response.data);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при остановке трансляции видео с камеры ${cameraId}:`, error);
            return [];
        }
    }

    static async moveCamera(gymId, cameraId, direction) {
        try {
            const response = await api.get(`/api/gym/camera/ptz/${gymId}/${cameraId}`, {
                direction: direction
            }, {
                headers: {
                    "Content-type": "application/json",
                }
            });
            console.log(`Успешное движение камеры ${cameraId}:`, response.data);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при движении камеры ${cameraId}:`, error);
            return [];
        }
    }
};

export default CameraService;