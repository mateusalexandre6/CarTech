const Client = require('../models/client.model');
const Vehicle = require('../models/vehicle.model');

// Criar um novo cliente
exports.createClient = async (req, res) => {
    try {
      const { nome, telefone, email, endereco, vehicle } = req.body;
  
      // Criar o cliente primeiro
      const client = await Client.create({ nome, telefone, email, endereco });
  
      // Criar o veículo e associá-lo ao cliente
      if (vehicle) {
        const newVehicle = await Vehicle.create({
          cliente: client._id,
          modelo: vehicle.modelo,
          ano: vehicle.ano,
          placa: vehicle.placa,
          cor: vehicle.cor,
        });
  
        // Atualizar o cliente para incluir o ID do veículo
        client.veiculos.push(newVehicle._id);
        await client.save();
      }
  
      // Popular os veículos para retornar na resposta
      const clientWithVehicle = await Client.findById(client._id).populate("veiculos");
  
      res.status(201).json(clientWithVehicle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Buscar todos os clientes
exports.getClients = async (req, res) => {
    try {
        const filtros = req.query;
        // Filtrar como like]
        const clients = await Client.find(filtros).populate('veiculos');
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar um cliente por ID
exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id).populate('veiculos');
        if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
        res.json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar cliente
exports.updateClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
        res.json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Deletar cliente
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
        res.json({ message: 'Cliente removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
