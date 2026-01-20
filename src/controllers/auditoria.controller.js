const db = require('../config/db');

exports.listarAuditoria = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                a.id_auditoria,
                u.nombre_completo AS usuario,
                a.accion,
                a.tabla_afectada,
                a.fecha
            FROM auditoria a
            INNER JOIN usuario u ON a.id_usuario = u.id_usuario
            ORDER BY a.fecha DESC
        `);

        res.json(rows);

    } catch (error) {
        console.error('ERROR AUDITORIA:', error);
        res.status(500).json({
            mensaje: 'Error al listar auditoría'
        });
    }
};


