const express = require('express');
const router = express.Router();

const insumoController = require('../controllers/insumo.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// listar insumos
router.get(
    '/',
    authMiddleware,
    insumoController.listarInsumos
);

// crear insumo
router.post(
    '/',
    authMiddleware,
    insumoController.crearInsumo
);

// registrar movimiento
router.post(
    '/movimiento',
    authMiddleware,
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



