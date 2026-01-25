const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const rolRoutes = require('./routes/rol.routes');
const pacienteRoutes = require('./routes/paciente.routes');
const examenRoutes = require('./routes/examen.routes');
const examenPacienteRoutes = require('./routes/examenPaciente.routes');
const valorCriticoRoutes = require('./routes/valorCritico.routes');
const avisoUrgenteRoutes = require('./routes/avisoUrgente.routes');
const insumoRoutes = require('./routes/insumo.routes');
const path = require('path');

const seedRoles = require('./utils/seedRoles');
const seedUsuarios = require('./utils/seedUsuarios');

async function initSeeds() {
    await seedRoles();
    await seedUsuarios();
}

if (process.env.NODE_ENV !== 'production') {
    initSeeds();
}


const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Rutas de API
app.use('/api/auth', authRoutes);
app.use('/api/auditoria', require('./routes/auditoria.routes'));
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/examenes', examenRoutes);
app.use('/api/examenes-paciente', examenPacienteRoutes);
app.use('/api/valores-criticos', valorCriticoRoutes);
app.use('/api/avisos', avisoUrgenteRoutes);
app.use('/api/insumos', insumoRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

