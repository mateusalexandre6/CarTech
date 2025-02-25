const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  modelo: { type: String, required: true },
  ano: { type: Number, required: true },
  placa: { type: String, unique: true, required: true },
  cor: { type: String },
  mileage: { type: Number, required: false },
  historicoServicos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agendamento' }]
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);
