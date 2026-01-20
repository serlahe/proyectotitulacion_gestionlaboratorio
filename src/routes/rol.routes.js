const express = require('express');
const router = express.Router();

const rolController = require('../controllers/rol.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

router.get(
    '/',
    authMiddleware,
    adminMiddleware,
    rolController.listarRoles
);

router.post(
    '/',
    authMiddleware,
    adminMiddleware,
    rolController.crearRol
);

router.put(
    '/:id',
    authMiddleware,
    adminMiddleware,
    rolController.actualizarRol
);

router.delete(
    '/:id',
    authMiddleware,
    adminMiddleware,
    rolController.eliminarRol
);

module.exports = router;


