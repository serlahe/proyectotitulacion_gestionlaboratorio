module.exports = function rolesPermitidos(...rolesPermitidos) {
    return (req, res, next) => {

        if (!req.usuario || !req.usuario.id_rol) {
            return res.status(401).json({
                mensaje: 'Usuario no autenticado'
            });
        }

        if (!rolesPermitidos.includes(req.usuario.id_rol)) {
            return res.status(403).json({
                mensaje: 'No tienes permisos para esta accion'
            });
        }

        next();
    };
};


