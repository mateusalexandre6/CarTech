const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    mechanic_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mechanic",
        required: true
    },
    vehicle_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    },
    service_type: {
        type: String,
        required: true,
        enum: ["Troca de óleo", "Revisão", "Freios", "Motor", "Transmissão", "Outros"]
    },
    complexity_level: {
        type: Number,
        required: true,
        min: 1, // 1 = Fácil, 5 = Muito difícil
        max: 5
    },
    estimated_time: {
        type: Number, 
        default: null
    },
    status: {
        type: String,
        enum: ["Pendente", "Em andamento", "Concluído"],
        default: "Pendente"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    actual_time: {
        type: Number, 
        default: null
    }

});

module.exports = mongoose.model("Service", ServiceSchema);
