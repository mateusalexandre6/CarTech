const mongoose = require('mongoose');

const OrcamentoSchema = new mongoose.Schema({
  agendamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Agendamento', required: true },
  valorTotal: { type: Number, required: true },
  descricao: { type: String, required: true },
  statusPagamento: { type: String, enum: ['pendente', 'pago'], default: 'pendente' }
}, { timestamps: true });

module.exports = mongoose.model('Orcamento', OrcamentoSchema);
