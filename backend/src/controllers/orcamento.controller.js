const { validationResult } = require('express-validator');
const Orcamento = require('../models/orcamento.model');
const Agendamento = require('../models/agendamento.model');

// Criar orçamento
exports.createOrcamento = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { agendamento, valorTotal, descricao } = req.body;

        // Verifica se o agendamento existe
        const agendamentoExistente = await Agendamento.findById(agendamento);
        if (!agendamentoExistente) return res.status(404).json({ message: 'Agendamento não encontrado' });

        const orcamento = await Orcamento.create({ agendamento, valorTotal, descricao });
        
        // Atualiza o agendamento com o orçamento
        agendamentoExistente.orcamento = orcamento._id;
        await agendamentoExistente.save();

        res.status(201).json(orcamento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Buscar todos os orçamentos
exports.getOrcamentos = async (req, res) => {
    try {
        const orcamentos = await Orcamento.find().populate('agendamento');
        res.json(orcamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar orçamento por ID
exports.getOrcamentoById = async (req, res) => {
    try {
        const orcamento = await Orcamento.findById(req.params.id).populate('agendamento');
        if (!orcamento) return res.status(404).json({ message: 'Orçamento não encontrado' });
        res.json(orcamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar orçamento
exports.updateOrcamento = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const orcamento = await Orcamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!orcamento) return res.status(404).json({ message: 'Orçamento não encontrado' });
        res.json(orcamento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Deletar orçamento
exports.deleteOrcamento = async (req, res) => {
    try {
        const orcamento = await Orcamento.findByIdAndDelete(req.params.id);
        if (!orcamento) return res.status(404).json({ message: 'Orçamento não encontrado' });
        res.json({ message: 'Orçamento removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
