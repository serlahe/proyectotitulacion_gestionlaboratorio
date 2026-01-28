// CONEXION A LA BASE DE DATOS MYSQL
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

async function testConnection() {
    try {
        const [r] = await db.query('SELECT DATABASE() AS db');
        console.log('Conectado a BD:', r[0].db);
    } catch (err) {
        console.error('Error conexión BD:', err.message);
    }
}

testConnection();

module.exports = pool;

