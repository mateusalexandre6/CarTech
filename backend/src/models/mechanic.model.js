const mongoose = require("mongoose");

const MechanicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true,
        enum: ["Motor", "Transmissão", "Elétrica", "Suspensão", "Freios", "Outros"]
    },
    availability: {
        type: Boolean,
        default: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    }]
}, { timestamps: true })


module.exports = mongoose.model("Mechanic", MechanicSchema);
