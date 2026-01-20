const express = require('express');
const router = express.Router();

const valorCriticoController = require('../controllers/valorCritico.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const rolMiddleware = require('../middlewares/rol.middleware');

/*
Roles:
1 = Administrador
2 = Tecnólogo médico
3 = Técnico de laboratorio
*/

// LISTAR
router.get(
    '/',
    authMiddleware,
    valorCriticoController.listarValoresCriticos
);

// REGISTRAR
router.post(
    '/',
    authMiddleware,
    rolMiddleware(1, 2),
    valorCriticoController.registrarValorCritico
);

// GESTIONAR
router.put(
    '/:id/gestionar',
    authMiddleware,
    rolMiddleware(1, 2),
    valorCriticoController.gestionarValorCritico
);

module.exports = router;

