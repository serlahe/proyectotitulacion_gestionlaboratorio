const db = require('../config/db');

exports.crearExamen = async (req, res) => {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
        return res.status(400).json({ mensaje: 'Nombre requerido' });
    }

    try {
        await db.query(
            'INSERT INTO examen (nombre, descripcion) VALUES (?, ?)',
            [nombre, descripcion]
        );

        res.status(201).json({ mensaje: 'Examen creado correctamente' });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear examen' });
    }
};

exports.listarExamenes = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT id_examen, nombre, descripcion FROM examen'
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar examenes' });
    }
};


