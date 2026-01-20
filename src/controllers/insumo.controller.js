const db = require('../config/db');

/* FUNCIONES AUXILIARES */

async function generarAvisoStockCritico(nombreInsumo) {
    await db.query(
        `
        INSERT INTO aviso_urgente (tipo, mensaje, activo)
        VALUES ('IMPORTANTE', ?, 1)
        `,
        [`Stock crítico del insumo ${nombreInsumo}`]
    );
}




/* CONTROLADORES */

exports.crearInsumo = async (req, res) => {
    const { nombre, stock_actual, stock_minimo } = req.body;

    if (!nombre || stock_actual == null || stock_minimo == null) {
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    try {
        await db.query(
            `INSERT INTO insumo (nombre, stock_actual, stock_minimo)
             VALUES (?, ?, ?)`,
            [nombre, stock_actual, stock_minimo]
        );

        res.status(201).json({ mensaje: 'Insumo creado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear insumo' });
    }
};




exports.listarInsumos = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM insumo`);
        res.json(rows);
    } catch (error) {
        console.error('ERROR INSUMOS:', error);
        res.status(500).json({ mensaje: 'Error al listar insumos' });
    }
};




exports.registrarMovimiento = async (req, res) => {
    const { id_insumo, cantidad, tipo_movimiento } = req.body;
    const id_usuario = req.usuario.id_usuario;

    if (!id_insumo || !cantidad || !tipo_movimiento) {
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    try {
        await db.query(
            `INSERT INTO registro_insumo
             (id_insumo, cantidad, tipo_movimiento, id_usuario)
             VALUES (?, ?, ?, ?)`,
            [id_insumo, cantidad, tipo_movimiento, id_usuario]
        );

        const operador = tipo_movimiento === 'INGRESO' ? '+' : '-';

        await db.query(
            `UPDATE insumo
             SET stock_actual = stock_actual ${operador} ?
             WHERE id_insumo = ?`,
            [cantidad, id_insumo]
        );

        // Verificar si quedó en stock crítico
        const [[insumo]] = await db.query(
            `SELECT nombre, stock_actual, stock_minimo
             FROM insumo
             WHERE id_insumo = ?`,
            [id_insumo]
        );

        if (insumo.stock_actual <= insumo.stock_minimo) {
            await generarAvisoStockCritico(insumo.nombre);
        }

        res.json({ mensaje: 'Movimiento registrado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al registrar movimiento' });
    }
};



exports.listarMovimientos = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT r.*, i.nombre AS insumo, u.nombre_completo AS usuario
            FROM registro_insumo r
            JOIN insumo i ON r.id_insumo = i.id_insumo
            JOIN usuario u ON r.id_usuario = u.id_usuario
            ORDER BY r.fecha DESC
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar movimientos' });
    }
};



exports.alertasStock = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                id_insumo,
                nombre,
                stock_actual,
                stock_minimo
            FROM insumo
            WHERE stock_actual <= stock_minimo
            ORDER BY stock_actual ASC
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener alertas de stock' });
    }
};


