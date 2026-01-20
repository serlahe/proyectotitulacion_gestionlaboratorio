const express = require('express');
const router = express.Router();

const avisoController = require('../controllers/avisoUrgente.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, avisoController.crearAviso);
router.get('/', authMiddleware, avisoController.listarAvisos);
router.put('/:id/desactivar', authMiddleware, avisoController.desactivarAviso);

module.exports = router;


