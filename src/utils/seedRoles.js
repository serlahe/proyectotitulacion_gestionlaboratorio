const db = require('../config/db');

async function seedRoles() {
    try {
        const [rows] = await db.query('SELECT COUNT(*) AS total FROM rol');

        if (rows[0].total > 0) {
            console.log('Roles ya existen');
            return;
        }

        await db.query(`
            INSERT INTO rol (id_rol, nombre) VALUES
            (1, 'Administrador'),
            (2, 'Tecnologo Medico'),
            (3, 'Tecnico de Laboratorio')
        `);

        console.log('Roles iniciales creados correctamente');

    } catch (error) {
        console.error('Error creando roles:', error);
    }
}

module.exports = seedRoles;
