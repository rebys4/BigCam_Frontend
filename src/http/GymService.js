import api from "./Api/api";

export class GymService {
    static async getCamerasById(gymId) {
        try {
            const response = await api.get("/api/gym/camera/list", {
                "Content-type": "application/json",
                params: { gymId: gymId, },
            });
            return response.data;
        } catch (error) {
            console.log("Ошибка при получении камер", error);
            return { message: error.message };
        }
    }
};

export default GymService;