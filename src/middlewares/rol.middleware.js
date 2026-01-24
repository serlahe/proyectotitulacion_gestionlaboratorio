module.exports = (...rolesPermitidos) => {
    return (req, res, next) => {

        if (!req.usuario || req.usuario.id_rol == null) {
            return res.status(401).json({
                mensaje: 'Usuario no autenticado'
            });
        }

        const rolUsuario = Number(req.usuario.id_rol);

        if (!rolesPermitidos.includes(rolUsuario)) {
            return res.status(403).json({
                mensaje: 'No tienes permisos para esta acción'
            });
        }

        next();
    };
};



