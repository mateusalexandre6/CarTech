const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/', verifyToken, vehicleController.createVehicle);
router.get('/', verifyToken, vehicleController.getVehicles);
router.get('/:id', verifyToken, vehicleController.getVehicleById);
router.put('/:id', verifyToken, vehicleController.updateVehicle);
router.delete('/:id', verifyToken, vehicleController.deleteVehicle);

module.exports = router;
