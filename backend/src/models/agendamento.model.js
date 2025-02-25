const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
  veiculo: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  data: { type: Date, required: true },
  servico: { type: String, required: true },
  status: { type: String, enum: ['pendente', 'em andamento', 'concluído'], default: 'pendente' },
  orcamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Orcamento' }
}, { timestamps: true });

module.exports = mongoose.model('Agendamento', AgendamentoSchema);
