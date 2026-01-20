const jwt = require('jsonwebtoken');
const SECRET_KEY = 'laboratorio_secret';


module.exports = (req, res, next) => {
    if (req.usuario.id_rol !== 1) {
        return res.status(403).json({ mensaje: 'Acceso denegado: requiere rol de administrador' });
    }
    next();
};


