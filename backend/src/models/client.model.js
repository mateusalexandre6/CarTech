const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  telefone: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  endereco: { type: String, required: true },
  veiculos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }]
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);
