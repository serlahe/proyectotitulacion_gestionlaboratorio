const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const rol = require('../middlewares/rol.middleware');
const usuarioController = require('../controllers/usuario.controller');

router.post(
    '/',
    auth,
    rol(1), // SOLO ADMIN
    usuarioController.crearUsuario
);

module.exports = router;
