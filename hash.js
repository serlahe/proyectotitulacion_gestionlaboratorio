const bcrypt = require('bcrypt');

async function generar() {
    console.log('Admin:', await bcrypt.hash('admin123', 10));
    console.log('Tecnologo:', await bcrypt.hash('tecno123', 10));
    console.log('Tecnico:', await bcrypt.hash('tecnico123', 10));
}

generar();


