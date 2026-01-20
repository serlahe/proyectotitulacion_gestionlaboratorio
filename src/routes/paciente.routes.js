const express = require('express');
const router = express.Router();

const pacienteController = require('../controllers/paciente.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, pacienteController.listarPacientes);
router.post('/', authMiddleware, pacienteController.crearPaciente);
router.put('/:id', authMiddleware, pacienteController.actualizarPaciente);
router.delete('/:id', authMiddleware, pacienteController.eliminarPaciente);

module.exports = router;


