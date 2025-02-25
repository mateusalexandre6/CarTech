const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/', verifyToken, clientController.createClient);
router.get('/', verifyToken, clientController.getClients);
router.get('/:id', verifyToken, clientController.getClientById);
router.put('/:id', verifyToken, clientController.updateClient);
router.delete('/:id', verifyToken, clientController.deleteClient);

module.exports = router;
