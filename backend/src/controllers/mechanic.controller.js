const Mechanic = require("../models/mechanic.model");

const createMechanic = async (req, res) => {
    try {
        const { name, email, phone, specialization, availability } = req.body;

        const newMechanic = await Mechanic.create({ name, email, phone, specialization, availability });
        res.status(201).json(newMechanic);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar mecânico." });
    }
};

const getAllMechanics = async (req, res) => {
    try {
         
        const mechanics = await Mechanic.find().populate("services", "service_type status complexity_level");

        res.json(mechanics);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar mecânicos." });
    }
};

const getMechanicById = async (req, res) => {
    try {
        const { id } = req.params;
        const mechanic = await Mechanic.findById(id).populate("services");

        if (!mechanic) return res.status(404).json({ error: "Mecânico não encontrado." });

        res.json(mechanic);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar mecânico." });
    }
};

const deleteMechanic = async (req, res) => {
    try {
        const { id } = req.params;
        await Mechanic.findByIdAndDelete(id);
        res.json({ message: "Mecânico removido com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover mecânico." });
    }
};

module.exports = { createMechanic, getAllMechanics, getMechanicById, deleteMechanic };
