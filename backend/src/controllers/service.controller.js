const Service = require("../models/service.model");
const Vehicle = require("../models/vehicle.model");
const Mechanic = require("../models/mechanic.model");
const { predictServiceTime } = require("../services/aiServices");

const createService = async (req, res) => {
    try {
        const { mechanic_id, vehicle_id, service_type, complexity_level } = req.body;

        // 1. Verificar se o veículo existe
        const vehicle = await Vehicle.findById(vehicle_id);
        if (!vehicle) return res.status(404).json({ error: "Veículo não encontrado." });

        // 2. Criar o serviço
        const newService = await Service.create({
            mechanic_id,
            vehicle_id,
            service_type,
            complexity_level,
            estimated_time: null // IA calculará depois
        });

        const mechanic = await Mechanic.findById(mechanic_id);
        if (!mechanic) return res.status(404).json({ error: "Mecânico não encontrado." });

        mechanic.services.push(newService._id);
        await mechanic.save();

        // 3. Atualizar o veículo com o histórico de serviços
        vehicle.historicoServicos.push(newService._id);
        await vehicle.save();

       

        const prediction = await predictServiceTime(req.body);
        
        // 5. Atualizar o serviço com o tempo estimado
        newService.estimated_time = prediction.estimated_time;
       
        await newService.save();


        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar serviço." });
    }
};

const getAllServices = async (req, res) => {
    try {
        //se não tiver limit e offset, ele vai retornar no maximo 8 registros
        const { limit = 13, offset = 0 } = req.query;
        const services = await Service.find()
            .limit(parseInt(limit))
            .skip(parseInt(offset))
            .populate("mechanic_id", "name specialization")
            .populate("vehicle_id", "modelo ano placa").sort({createdAt: -1});

        res.json(services);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar serviços." });
    }
};


// Controlador para obter estatísticas dos serviços
const getServiceStatistics = async (req, res) => {
  try {
    // 1. Quantidade de serviços por diferentes status
    const statusCounts = await Service.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    // 2. Quantidade de serviços por complexidade (convertendo para número)
    const complexityCounts = await Service.aggregate([
      {
        $project: {
          complexity_level: { $toInt: "$complexity_level" } // Converte para número
        }
      },
      {
        $group: {
          _id: "$complexity_level",
          count: { $sum: 1 }
        }
      }
    ]);

    // 3. Quantidade de serviços onde actual_time < estimated_time
    const lessThanEstimated = await Service.aggregate([
      {
        $match: {
          actual_time: { $ne: null },
          estimated_time: { $ne: null }
        }
      },
      {
        $project: {
          actual_time: { $toDouble: "$actual_time" },
          estimated_time: { $toDouble: "$estimated_time" }
        }
      },
      {
        $match: { $expr: { $lt: ["$actual_time", "$estimated_time"] } }
      },
      {
        $count: "count"
      }
    ]);

    // 4. Quantidade de serviços onde actual_time > estimated_time
    const greaterThanEstimated = await Service.aggregate([
      {
        $match: {
          actual_time: { $ne: null },
          estimated_time: { $ne: null }
        }
      },
      {
        $project: {
          actual_time: { $toDouble: "$actual_time" },
          estimated_time: { $toDouble: "$estimated_time" }
        }
      },
      {
        $match: { $expr: { $gt: ["$actual_time", "$estimated_time"] } }
      },
      {
        $count: "count"
      }
    ]);

    // Resposta JSON com as estatísticas
    res.json({
      statusCounts,
      complexityCounts: complexityCounts.sort((a, b) => a._id - b._id),
      lessThanEstimated: lessThanEstimated.length > 0 ? lessThanEstimated[0].count : 0,
      greaterThanEstimated: greaterThanEstimated.length > 0 ? greaterThanEstimated[0].count : 0
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao obter estatísticas de serviços", error });
  }
};



const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id)
            .populate("mechanic_id", "name specialization")
            .populate("vehicle_id", "modelo ano placa");

        if (!service) return res.status(404).json({ error: "Serviço não encontrado." });

        res.json(service);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar serviço. ok ok" });
    }
};

const updateServiceStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const service = await Service.findById(id);
        if (!service) return res.status(404).json({ error: "Serviço não encontrado." });

        service.status = status;
        await service.save();

        res.json(service);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar status do serviço." });
    }
};

const updateActualTime = async (req, res) => {
    try {
        const { id } = req.params;
        const { actualTime } = req.body;

        const service = await Service.findById(id);
        if (!service) return res.status(404).json({ error: "Serviço não encontrado." });
        
        service.actual_time = actualTime; 
        service.status = "Concluído";
        await service.save();

        res.json(service);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar tempo real do serviço." });
    }
}


const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        if (!service) return res.status(404).json({ error: "Serviço não encontrado." });

        await service.deleteOne();

        res.json({ message: "Serviço removido com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover serviço." });
    }
};

module.exports = { createService, getAllServices,  getServiceById, updateServiceStatus, deleteService, updateActualTime, getServiceStatistics, };
