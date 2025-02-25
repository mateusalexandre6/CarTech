import api from "./api";

const API_URL = "http://localhost:5000/api/services";

const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` },
    };
};

// Criar um novo serviço
export const postService = async (serviceData) => {
    const response = await api.post(API_URL, serviceData, getAuthConfig());
    return response.data;
};

// Buscar todos os serviços
export const getServices = async (params) => {
    const response = await api.get(API_URL, { ...getAuthConfig(), params });
    return response.data;
};

export const getStatistics = async () => {
    const response = await api.get(`${API_URL}/statistics/all`, getAuthConfig());
    return response.data;
}

// Buscar um serviço por ID
export const getServiceById = async (id) => {
    const response = await api.get(`${API_URL}/${id}`, getAuthConfig());
    return response.data;
};

// Atualizar um serviço
export const updateService = async (id, serviceData) => {
    const response = await api.put(`${API_URL}/${id}`, serviceData, getAuthConfig());
    return response.data;
};

export const updateServiceActualTime = async (id, serviceData) => {
    const response = await api.put(`${API_URL}/${id}/actualTime`, serviceData, getAuthConfig());
    return response.data;
};


// Deletar um serviço
export const removeService = async (id) => {
    const response = await api.delete(`${API_URL}/${id}`, getAuthConfig());
    return response.data;
};