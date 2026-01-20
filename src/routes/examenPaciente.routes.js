const express = require('express');
const router = express.Router();

const examenPacienteController = require('../controllers/examenPaciente.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, examenPacienteController.listarExamenesPaciente);
router.post('/', authMiddleware, examenPacienteController.asignarExamenPaciente);
router.put('/:id', authMiddleware, examenPacienteController.actualizarEstado);

module.exports = router;


