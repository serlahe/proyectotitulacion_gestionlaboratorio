const db = require('../config/db');
const { registrarAuditoria } = require('../utils/auditoria');

exports.listarValoresCriticos = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                id,
                paciente,
                examen,
                resultado,
                limite,
                estado,
                fecha
            FROM valores_criticos
            ORDER BY fecha DESC
        `);

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al obtener valores críticos'
        });
    }
};

exports.registrarValorCritico = async (req, res) => {
    try {
        const { paciente, examen, resultado, limite } = req.body;

        if (!paciente || !examen || resultado == null || !limite) {
            return res.status(400).json({
                mensaje: 'Faltan datos obligatorios'
            });
        }

        await db.query(
            `INSERT INTO valores_criticos
     (paciente, examen, resultado, limite, estado)
     VALUES (?, ?, ?, ?, 'PENDIENTE')`,
            [paciente, examen, resultado, limite]
        );

        await registrarAuditoria(
            req.usuario.id_usuario,
            'Registró valor crítico',
            'valores_criticos'
        );

        res.status(201).json({
            mensaje: 'Valor crítico registrado correctamente'
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al registrar valor crítico'
        });
    }
};




exports.gestionarValorCritico = async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            `UPDATE valores_criticos
             SET estado = 'GESTIONADO'
             WHERE id = ?`,
            [id]
        );

        await registrarAuditoria(
            req.usuario.id_usuario,
            'Marcó valor crítico como gestionado',
            'valores_criticos'
        );

        res.json({ mensaje: 'Valor crítico gestionado' });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al gestionar valor crítico'
        });
    }
};

