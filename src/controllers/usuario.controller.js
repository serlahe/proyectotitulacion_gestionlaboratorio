const db = require('../config/db');
const bcrypt = require('bcryptjs');



exports.crearUsuario = async (req, res) => {
    const { nombre_completo, correo, password, id_rol } = req.body;

    if (!nombre_completo || !correo || !password || !id_rol) {
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    try {
        // verificar correo duplicado
        const [existe] = await db.query(
            'SELECT id_usuario FROM usuario WHERE correo = ?',
            [correo]
        );

        if (existe.length > 0) {
            return res.status(409).json({ mensaje: 'Correo ya registrado' });
        }

        const password_hash = await bcrypt.hash(password, 10);

        await db.query(
            `INSERT INTO usuario
            (nombre_completo, correo, password_hash, id_rol, activo)
            VALUES (?, ?, ?, ?, 1)`,
            [nombre_completo, correo, password_hash, id_rol]
        );

        res.status(201).json({ mensaje: 'Usuario creado correctamente' });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
};



exports.listarUsuarios = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT 
                id_usuario,
                nombre_completo,
                correo,
                id_rol,
                activo,
                fecha_creacion
             FROM usuario`
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar usuarios' });
    }
};


exports.eliminarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query(
            'UPDATE usuario SET activo = 0 WHERE id_usuario = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json({
            mensaje: 'Usuario desactivado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar usuario'
        });
    }
};



exports.desactivarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query(
            'UPDATE usuario SET activo = 0 WHERE id_usuario = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({ mensaje: 'Usuario desactivado correctamente' });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al desactivar usuario' });
    }
};

exports.activarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query(
            'UPDATE usuario SET activo = 1 WHERE id_usuario = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({ mensaje: 'Usuario activado correctamente' });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al activar usuario' });
    }
};


