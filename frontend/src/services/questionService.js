import api from "./api";

export const getQuestions = async () => {
    const response = await api.get("/questions");
    return response.data;
};