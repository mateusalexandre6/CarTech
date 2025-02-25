import api from "./api";

const API_URL = "http://localhost:5000/api/mechanics";

const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` },
    };
    }
    

// Criar um novo mecânico
export const createMechanic = async (mechanicData) => {
    const response = await api.post(API_URL, mechanicData, getAuthConfig());
    return response.data;
};

// Buscar todos os mecânicos
export const getMechanics = async (params) => {
    const response = await api.get(API_URL, { ...getAuthConfig(), params });
    return response.data;
};

// Buscar um mecânico por ID
export const getMechanicById = async (id) => {
    const response = await api.get(`${API_URL}/${id}`, getAuthConfig());
    return response.data;
};

// Atualizar um mecânico
export const updateMechanic = async (id, mechanicData) => {
    const response = await api.put(`${API_URL}/${id}`, mechanicData, getAuthConfig());
    return response.data;
};

// Deletar um mecânico
export const deleteMechanic = async (id) => {
    const response = await api.delete(`${API_URL}/${id}`, getAuthConfig());
    return response.data;
};

    

