const db = require('../config/db');
const bcrypt = require('bcrypt');
const { registrarAuditoria } = require('../utils/auditoria');

exports.crearUsuario = async (req, res) => {
    try {
        const { nombre_completo, correo, password, id_rol } = req.body;

        if (!nombre_completo || !correo || !password || id_rol == null) {
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }

        const rolesValidos = [1, 2, 3];
        if (!rolesValidos.includes(Number(id_rol))) {
            return res.status(400).json({ mensaje: 'Rol inválido' });
        }

        const hash = await bcrypt.hash(password, 10);

        await db.query(
            `INSERT INTO usuario 
             (nombre_completo, correo, password_hash, id_rol)
             VALUES (?, ?, ?, ?)`,
            [nombre_completo, correo, hash, id_rol]
        );

        await registrarAuditoria(
            req.usuario.id_usuario,
            `Creó usuario ${correo}`,
            'usuario'
        );

        res.status(201).json({ mensaje: 'Usuario creado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
};



