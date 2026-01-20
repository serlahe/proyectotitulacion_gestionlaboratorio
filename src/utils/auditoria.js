const db = require('../config/db');

async function registrarAuditoria(id_usuario, accion, tabla_afectada) {
    await db.query(
        `INSERT INTO auditoria (id_usuario, accion, tabla_afectada)
         VALUES (?, ?, ?)`,
        [id_usuario, accion, tabla_afectada]
    );
}

module.exports = { registrarAuditoria };


