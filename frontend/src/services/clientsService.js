import api from "./api";
const API_URL = "http://localhost:5000/api/clients"; 


const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// Criar um novo cliente
export const createClient = async (clientData) => {
  const response = await api.post(API_URL, clientData, getAuthConfig());
  return response.data;
};

// Buscar todos os clientes
export const getClients = async (params) => {
  const response = await api.get(API_URL, { ...getAuthConfig(), params });
  return response.data;
};

// Buscar um cliente por ID
export const getClientById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`, getAuthConfig());
  return response.data;
};

// Atualizar um cliente
export const updateClient = async (id, clientData) => {
  const response = await api.put(`${API_URL}/${id}`, clientData, getAuthConfig());
  return response.data;
};

// Deletar um cliente
export const deleteClient = async (id) => {
  const response = await api.delete(`${API_URL}/${id}`, getAuthConfig());
  return response.data;
};
