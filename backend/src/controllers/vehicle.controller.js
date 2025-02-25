const Vehicle = require('../models/vehicle.model');

exports.createVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.create(req.body);
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().populate('cliente');
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id).populate('cliente');
        if (!vehicle) return res.status(404).json({ message: 'Veículo não encontrado' });
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vehicle) return res.status(404).json({ message: 'Veículo não encontrado' });
        res.json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) return res.status(404).json({ message: 'Veículo não encontrado' });
        res.json({ message: 'Veículo removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
