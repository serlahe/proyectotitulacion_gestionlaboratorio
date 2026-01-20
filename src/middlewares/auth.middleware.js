const jwt = require('jsonwebtoken');
const SECRET_KEY = 'laboratorio_secret';

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;



    if (!authHeader) {
        return res.status(401).json({ mensaje: 'Token requerido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token no válido o expirado' });
    }
};




