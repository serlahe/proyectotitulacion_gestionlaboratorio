const db = require('../config/db');
const bcrypt = require('bcrypt');

async function seedUsuarios() {
    try {
        // Verificar si ya existen usuarios
        const [rows] = await db.query('SELECT COUNT(*) AS total FROM usuario');

        if (rows[0].total > 0) {
            console.log('Usuarios iniciales ya existen');
            return;
        }

        const usuarios = [
            {
                nombre: 'Administrador',
                correo: 'admin@lab.cl',
                password: 'admin123',
                id_rol: 1
            },
            {
                nombre: 'Tecnologo Medico',
                correo: 'tecno@lab.cl',
                password: 'tecno123',
                id_rol: 2
            },
            {
                nombre: 'Tecnico Laboratorio',
                correo: 'tecnico@lab.cl',
                password: 'tecnico123',
                id_rol: 3
            }
        ];

        for (const u of usuarios) {
            const hash = await bcrypt.hash(u.password, 10);

            await db.query(
                `INSERT INTO usuario 
                (nombre_completo, correo, password_hash, id_rol)
                VALUES (?, ?, ?, ?)`,
                [u.nombre, u.correo, hash, u.id_rol]
            );
        }

        console.log('Usuarios iniciales creados correctamente');

    } catch (error) {
        console.error('Error creando usuarios iniciales:', error);
    }
}

module.exports = seedUsuarios;
