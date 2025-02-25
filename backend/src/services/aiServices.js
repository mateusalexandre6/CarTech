const axios = require("axios");

const AI_API_URL = "http://localhost:5001/predict-time"; 

const predictServiceTime = async (serviceData) => {
    try {
        const response = await axios.post(AI_API_URL, serviceData);
 
        return response.data;
    } catch (error) {
        console.error("Erro ao chamar a IA:", error.response?.data || error.message);
        throw new Error("Erro ao obter previsão da IA.");
    }
};

module.exports = { predictServiceTime };
