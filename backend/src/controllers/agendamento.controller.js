const { validationResult } = require('express-validator');
const Agendamento = require('../models/agendamento.model');
const Vehicle = require('../models/vehicle.model');

// Criar agendamento
exports.createAgendamento = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { veiculo, data, servico } = req.body;

        // Verifica se o veículo existe
        const vehicle = await Vehicle.findById(veiculo);
        if (!vehicle) return res.status(404).json({ message: 'Veículo não encontrado' });

        const agendamento = await Agendamento.create({ veiculo, data, servico });
        res.status(201).json(agendamento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Buscar todos os agendamentos
exports.getAgendamentos = async (req, res) => {
    try {
        const agendamentos = await Agendamento.find().populate('veiculo');
        res.json(agendamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar agendamento por ID
exports.getAgendamentoById = async (req, res) => {
    try {
        const agendamento = await Agendamento.findById(req.params.id).populate('veiculo');
        if (!agendamento) return res.status(404).json({ message: 'Agendamento não encontrado' });
        res.json(agendamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar agendamento
exports.updateAgendamento = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const agendamento = await Agendamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!agendamento) return res.status(404).json({ message: 'Agendamento não encontrado' });
        res.json(agendamento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Deletar agendamento
exports.deleteAgendamento = async (req, res) => {
    try {
        const agendamento = await Agendamento.findByIdAndDelete(req.params.id);
        if (!agendamento) return res.status(404).json({ message: 'Agendamento não encontrado' });
        res.json({ message: 'Agendamento removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
