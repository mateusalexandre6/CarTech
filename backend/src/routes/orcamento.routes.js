const express = require('express');
const router = express.Router();
const orcamentoController = require('../controllers/orcamento.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/', verifyToken, orcamentoController.createOrcamento);
router.get('/', verifyToken, orcamentoController.getOrcamentos);
router.get('/:id', verifyToken, orcamentoController.getOrcamentoById);
router.put('/:id', verifyToken, orcamentoController.updateOrcamento);
router.delete('/:id', verifyToken, orcamentoController.deleteOrcamento);

module.exports = router;
