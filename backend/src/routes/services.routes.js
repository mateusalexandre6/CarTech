const express = require("express");
const router = express.Router();
const {
    createService,
    getAllServices,
    getServiceById,
    updateServiceStatus,
    deleteService,
    updateActualTime,
    getServiceStatistics
} = require("../controllers/service.controller");

const { verifyToken } = require('../middlewares/auth.middleware');

router.post("/", verifyToken, createService);
router.get("/", verifyToken, getAllServices);
router.get("/:id", verifyToken, getServiceById);
router.put("/:id", verifyToken, updateServiceStatus);
router.delete("/:id", verifyToken, deleteService);
router.put("/:id/actualTime", verifyToken, updateActualTime);
router.get("/statistics/all", verifyToken, getServiceStatistics);


module.exports = router;
