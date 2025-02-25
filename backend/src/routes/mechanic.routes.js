const express = require("express");
const router = express.Router();
const {
    createMechanic,
    getAllMechanics,
    getMechanicById,
    deleteMechanic
} = require("../controllers/mechanic.controller");

const { verifyToken } = require('../middlewares/auth.middleware');

router.post("/", verifyToken, createMechanic);
router.get("/", verifyToken, getAllMechanics);
router.get("/:id", verifyToken, getMechanicById);
router.delete("/:id", verifyToken, deleteMechanic);


module.exports = router;
