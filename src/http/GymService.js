import api from "./Api/api";

export class GymService {
    static async getCamerasById(gymId) {
        try {
            const response = await api.get(`/api/gym/camera/${gymId}`, {
                "Content-type": "application/json"
            });
            console.log(`Камеры для зала ${gymId} получены:`, response.data);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении камер для зала ${gymId}:`, error);
            return [];
        }
    }
};

export default GymService;