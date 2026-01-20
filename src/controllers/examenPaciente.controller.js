const db = require('../config/db');

exports.asignarExamenPaciente = async (req, res) => {
    const { id_paciente, id_examen, estado } = req.body;

    if (!id_paciente || !id_examen || !estado) {
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    try {
        await db.query(
            `INSERT INTO examen_paciente
            (id_paciente, id_examen, fecha_examen, estado)
            VALUES (?, ?, NOW(), ?)`,
            [id_paciente, id_examen, estado]
        );

        res.status(201).json({ mensaje: 'Examen asignado al paciente' });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al asignar examen' });
    }
};

exports.listarExamenesPaciente = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT 
                ep.id_examen_paciente,
                p.nombre_completo AS paciente,
                e.nombre AS examen,
                ep.fecha_examen,
                ep.estado
             FROM examen_paciente ep
             INNER JOIN paciente p ON ep.id_paciente = p.id_paciente
             INNER JOIN examen e ON ep.id_examen = e.id_examen`
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar examenes del paciente' });
    }
};

exports.actualizarEstado = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado) {
        return res.status(400).json({ mensaje: 'Estado requerido' });
    }

    try {
        const [result] = await db.query(
            'UPDATE examen_paciente SET estado = ? WHERE id_examen_paciente = ?',
            [estado, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Registro no encontrado' });
        }

        res.json({ mensaje: 'Estado actualizado correctamente' });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar estado' });
    }
};


