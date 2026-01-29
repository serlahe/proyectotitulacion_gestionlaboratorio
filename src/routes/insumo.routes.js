const express = require('express');
const router = express.Router();

const insumoController = require('../controllers/insumo.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const rolMiddleware = require('../middlewares/rol.middleware');

// listar insumos
router.get(
    '/',
    authMiddleware,
    insumoController.listarInsumos
);

// crear insumo (SOLO ADMIN)
router.post(
    '/',
    authMiddleware,
    rolMiddleware(1),
    insumoController.crearInsumo
);

// registrar movimiento / modificar stock
router.post(
    '/movimiento',
    authMiddleware,
    rolMiddleware(1, 2, 3),
    insumoController.registrarMovimiento
);

// listar movimientos
router.get(
    '/movimientos',
    authMiddleware,
    insumoController.listarMovimientos
);

// alertas de stock
router.get(
    '/alertas',
    authMiddleware,
    insumoController.alertasStock
);

module.exports = router;
