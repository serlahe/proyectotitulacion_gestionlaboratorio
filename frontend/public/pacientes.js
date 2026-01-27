
const API_PACIENTES = `${API_BASE}/api/pacientes`;

const token = localStorage.getItem('token');
if (!token) window.location.href = 'login.html';

/* CREAR PACIENTE */
document.getElementById('formPaciente').addEventListener('submit', async e => {
    e.preventDefault();

    const body = {
        rut: document.getElementById('rutPaciente').value,
        nombre_completo: document.getElementById('nombrePaciente').value,
        fecha_nacimiento: document.getElementById('fechaNacimientoPaciente').value,
        sexo: document.getElementById('sexoPaciente').value
    };

    const res = await fetch(API_PACIENTES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        alert('Error al registrar paciente');
        return;
    }

    document.getElementById('formPaciente').reset();
    cargarPacientes();
});

/* LISTAR */
async function cargarPacientes() {
    const res = await fetch(API_PACIENTES, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await res.json();
    const tbody = document.querySelector('#tablaPacientes tbody');
    tbody.innerHTML = '';

    data.forEach(p => {
        const fecha = p.fecha_nacimiento?.split('T')[0] || '';

        tbody.innerHTML += `
            <tr>
                <td>${p.rut}</td>
                <td><input value="${p.nombre_completo}" id="nombre-${p.id_paciente}"></td>
                <td><input type="date" value="${fecha}" id="fecha-${p.id_paciente}"></td>
                <td>
                    <select id="sexo-${p.id_paciente}">
                        <option ${p.sexo === 'Masculino' && 'selected'}>Masculino</option>
                        <option ${p.sexo === 'Femenino' && 'selected'}>Femenino</option>
                        <option ${p.sexo === 'Otro' && 'selected'}>Otro</option>
                    </select>
                </td>
                <td>
                    <button onclick="actualizarPaciente(${p.id_paciente})">Actualizar</button>
                    <button onclick="eliminarPaciente(${p.id_paciente})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

async function actualizarPaciente(id) {
    const res = await fetch(`${API_PACIENTES}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            nombre_completo: document.getElementById(`nombre-${id}`).value,
            fecha_nacimiento: document.getElementById(`fecha-${id}`).value,
            sexo: document.getElementById(`sexo-${id}`).value
        })
    });

    if (!res.ok) alert('Error al actualizar');
}

async function eliminarPaciente(id) {
    if (!confirm('Eliminar paciente?')) return;

    await fetch(`${API_PACIENTES}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    cargarPacientes();
}

cargarPacientes();
