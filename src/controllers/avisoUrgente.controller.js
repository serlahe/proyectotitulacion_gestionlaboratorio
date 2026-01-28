const db = require('../config/db');
const { registrarAuditoria } = require('../utils/auditoria');

exports.crearAviso = async (req, res) => {
    const { tipo, mensaje } = req.body;
    const id_usuario = req.usuario.id_usuario;

    const tiposPermitidos = ['CRITICO', 'URGENTE', 'IMPORTANTE', 'ESTANDAR'];

    if (!tipo || !mensaje) {
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    if (!tiposPermitidos.includes(tipo)) {
        return res.status(400).json({ mensaje: 'Tipo de aviso inválido' });
    }

    try {
        await db.query(
            `INSERT INTO aviso_urgente 
             (tipo, mensaje, activo, id_usuario)
             VALUES (?, ?, 1, ?)`,
            [tipo, mensaje, id_usuario]
        );

        await registrarAuditoria(
            id_usuario,
            'Creó aviso urgente',
            'aviso_urgente'
        );

        res.status(201).json({ mensaje: 'Aviso creado correctamente' });
    } catch (error) {
        console.error('ERROR AVISO:', error);
        res.status(500).json({ mensaje: 'Error al crear aviso' });
    }
};

exports.listarAvisos = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT 
                a.id_aviso,
                a.tipo,
                a.mensaje,
                a.fecha_creacion,
                u.nombre_completo AS creado_por
             FROM aviso_urgente a
             INNER JOIN usuario u ON a.id_usuario = u.id_usuario
             WHERE a.activo = 1
             ORDER BY a.fecha_creacion DESC`
        );

        res.json(rows);
    } catch (error) {
        console.error('ERROR LISTAR AVISOS:', error);
        res.status(500).json({ mensaje: 'Error al listar avisos' });
    }
};

exports.desactivarAviso = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query(
            'UPDATE aviso_urgente SET activo = 0 WHERE id_aviso = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Aviso no encontrado' });
        }

        const idUsuario = req.usuario?.id_usuario || null;

        await registrarAuditoria(
            idUsuario,
            'Desactivó aviso urgente',
            'aviso_urgente'
        );

        res.json({ mensaje: 'Aviso desactivado' });


    res.json({ mensaje: 'Aviso desactivado' });

};


