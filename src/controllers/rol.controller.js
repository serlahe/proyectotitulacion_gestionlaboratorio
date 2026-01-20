const db = require('../config/db');

exports.listarRoles = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT id_rol, nombre FROM rol'
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar roles' });
    }
};

exports.crearRol = async (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ mensaje: 'Nombre del rol requerido' });
    }

    try {
        const [existe] = await db.query(
            'SELECT id_rol FROM rol WHERE nombre = ?',
            [nombre]
        );

        if (existe.length > 0) {
            return res.status(409).json({ mensaje: 'Rol ya existe' });
        }

        await db.query(
            'INSERT INTO rol (nombre) VALUES (?)',
            [nombre]
        );

        res.status(201).json({ mensaje: 'Rol creado correctamente' });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear rol' });
    }
};

exports.actualizarRol = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ mensaje: 'Nombre del rol requerido' });
    }

    try {
        const [result] = await db.query(
            'UPDATE rol SET nombre = ? WHERE id_rol = ?',
            [nombre, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Rol no encontrado' });
        }

        res.json({ mensaje: 'Rol actualizado correctamente' });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar rol' });
    }
};

exports.eliminarRol = async (req, res) => {
    const { id } = req.params;

    try {
        const [usos] = await db.query(
            'SELECT id_usuario FROM usuario WHERE id_rol = ?',
            [id]
        );

        if (usos.length > 0) {
            return res.status(409).json({
                mensaje: 'No se puede eliminar el rol, esta asignado a usuarios'
            });
        }

        const [result] = await db.query(
            'DELETE FROM rol WHERE id_rol = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Rol no encontrado' });
        }

        res.json({ mensaje: 'Rol eliminado correctamente' });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar rol' });
    }
};


