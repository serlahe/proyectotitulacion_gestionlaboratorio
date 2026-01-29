const express = require('express');
const router = express.Router();

const pacienteController = require('../controllers/paciente.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const rolMiddleware = require('../middlewares/rol.middleware');

// listar pacientes (ADMIN y TECNOLOGO)
router.get(
    '/',
    authMiddleware,
    rolMiddleware(1, 2),
    pacienteController.listarPacientes
);

// crear paciente
router.post(
    '/',
    authMiddleware,
    rolMiddleware(1, 2),
    pacienteController.crearPaciente
);

// actualizar paciente
router.put(
    '/:id',
    authMiddleware,
    rolMiddleware(1, 2),
    pacienteController.actualizarPaciente
);

// eliminar paciente
router.delete(
    '/:id',
    authMiddleware,
    rolMiddleware(1, 2),
    pacienteController.eliminarPaciente
);

module.exports = router;
