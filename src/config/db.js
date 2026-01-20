//CONECCION A LA BASE DE DATOS MYSQL
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'S3rg10l4r4!',
    database: 'laboratorio_clinico',
    charset: 'utf8mb4'
});


module.exports = pool;


