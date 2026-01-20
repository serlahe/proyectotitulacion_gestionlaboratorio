const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

router.post(
    '/',
    authMiddleware,
    adminMiddleware,
    usuarioController.crearUsuario
);

router.get(
    '/',
    authMiddleware,
    adminMiddleware,
    usuarioController.listarUsuarios
);

router.delete(
    '/:id',
    authMiddleware,
    adminMiddleware,
    usuarioController.eliminarUsuario
);

router.put(
    '/:id/desactivar',
    authMiddleware,
    adminMiddleware,
    usuarioController.desactivarUsuario
);

router.put(
    '/:id/activar',
    authMiddleware,
    adminMiddleware,
    usuarioController.activarUsuario
);


module.exports = router;


