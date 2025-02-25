import api from "./api";

const API_URL = "http://localhost:5000/api/vehicles"; 


const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// Criar um novo cliente
export const createVehicle = async (VehicleData) => {
  const response = await api.post(API_URL, VehicleData, getAuthConfig());
  return response.data;
};

// Buscar todos os Vehiclees
export const getVehicles = async (params) => {
  const response = await api.get(API_URL, { ...getAuthConfig(), params });
  return response.data;
};

// Buscar um Vehiclee por ID
export const getVehicleById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`, getAuthConfig());
  return response.data;
};

// Atualizar um Vehiclee
export const updateVehicle = async (id, VehicleData) => {
  const response = await api.put(`${API_URL}/${id}`, VehicleData, getAuthConfig());
  return response.data;
};

// Deletar um Vehiclee
export const deleteVehicle = async (id) => {
  const response = await api.delete(`${API_URL}/${id}`, getAuthConfig());
  return response.data;
};
