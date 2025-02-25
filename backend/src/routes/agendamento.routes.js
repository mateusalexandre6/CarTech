const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamento.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/', verifyToken, agendamentoController.createAgendamento);
router.get('/', verifyToken, agendamentoController.getAgendamentos);
router.get('/:id', verifyToken, agendamentoController.getAgendamentoById);
router.put('/:id', verifyToken, agendamentoController.updateAgendamento);
router.delete('/:id', verifyToken, agendamentoController.deleteAgendamento);

module.exports = router;
