const express = require('express');
const router = express.Router();

const examenController = require('../controllers/examen.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, examenController.listarExamenes);
router.post('/', authMiddleware, examenController.crearExamen);

module.exports = router;


