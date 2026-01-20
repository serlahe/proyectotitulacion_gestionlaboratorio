const express = require('express');
const router = express.Router();

const auditoriaController = require('../controllers/auditoria.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const rolMiddleware = require('../middlewares/rol.middleware');

// SOLO ADMIN
router.get(
    '/',
    authMiddleware,
    rolMiddleware(1,2),
    auditoriaController.listarAuditoria
);

module.exports = router;


