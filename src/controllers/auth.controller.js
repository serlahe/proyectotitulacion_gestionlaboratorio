const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'laboratorio_secret';

exports.login = async (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({ mensaje: 'Debe ingresar correo y contraseña' });
    }

    try {
        const [rows] = await db.query(
            'SELECT * FROM usuario WHERE correo = ? AND activo = 1',
            [correo]
        );

        if (rows.length === 0) {
            return res.status(401).json({ mensaje: 'Usuario no encontrado o inactivo' });
        }

        const usuario = rows[0];

        const passwordValida = await bcrypt.compare(
            password,
            usuario.password_hash
        );

        if (!passwordValida) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                id_rol: usuario.id_rol
            },
            SECRET_KEY,
            { expiresIn: '8h' }
        );

        res.json({
            mensaje: 'Inicio de sesion exitoso',
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre_completo: usuario.nombre_completo,
                correo: usuario.correo,
                id_rol: usuario.id_rol
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



