const db = require('../config/db');

exports.crearPaciente = async (req, res) => {
    const { rut, nombre_completo, fecha_nacimiento, sexo } = req.body;

    if (!rut || !nombre_completo || !sexo) {
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    try {
        const [existe] = await db.query(
            'SELECT id_paciente FROM paciente WHERE rut = ?',
            [rut]
        );

        if (existe.length > 0) {
            return res.status(409).json({ mensaje: 'Paciente ya registrado' });
        }

        await db.query(
            `INSERT INTO paciente 
            (rut, nombre_completo, fecha_nacimiento, sexo)
            VALUES (?, ?, ?, ?)`,
            [rut, nombre_completo, fecha_nacimiento, sexo]
        );

        res.status(201).json({ mensaje: 'Paciente creado correctamente' });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear paciente' });
    }
};

exports.listarPacientes = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT 
                id_paciente,
                rut,
                nombre_completo,
                fecha_nacimiento,
                sexo
             FROM paciente`
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar pacientes' });
    }
};

exports.actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const { nombre_completo, fecha_nacimiento, sexo } = req.body;

    if (!nombre_completo || !sexo) {
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    try {
        const [result] = await db.query(
            `UPDATE paciente 
             SET nombre_completo = ?, fecha_nacimiento = ?, sexo = ?
             WHERE id_paciente = ?`,
            [nombre_completo, fecha_nacimiento, sexo, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Paciente no encontrado' });
        }

        res.json({ mensaje: 'Paciente actualizado correctamente' });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar paciente' });
    }
};

exports.eliminarPaciente = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query(
            'DELETE FROM paciente WHERE id_paciente = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Paciente no encontrado' });
        }

        res.json({ mensaje: 'Paciente eliminado correctamente' });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar paciente' });
    }
};


