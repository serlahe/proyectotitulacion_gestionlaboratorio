const API_PACIENTES = `${API_BASE}/api/pacientes`;
const token = localStorage.getItem('token');
const usuario = JSON.parse(localStorage.getItem('usuario'));

if (!token || !usuario) {
    window.location.href = 'login.html';
}

// Técnico NO puede crear
if (usuario.id_rol === 3) {
    document.getElementById('formPaciente').style.display = 'none';
}

/* CREAR PACIENTE */
document.getElementById('formPaciente')?.addEventListener('submit', async e => {
    if (usuario.id_rol === 3) {
        alert('Sin permisos');
        return;
    }

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
                <td><input value="${p.nombre_completo}" id="nombre-${p.id_paciente}" ${usuario.id_rol === 3 ? 'disabled' : ''}></td>
                <td><input type="date" value="${fecha}" id="fecha-${p.id_paciente}" ${usuario.id_rol === 3 ? 'disabled' : ''}></td>
                <td>
                    <select id="sexo-${p.id_paciente}" ${usuario.id_rol === 3 ? 'disabled' : ''}>
                        <option ${p.sexo === 'Masculino' ? 'selected' : ''}>Masculino</option>
                        <option ${p.sexo === 'Femenino' ? 'selected' : ''}>Femenino</option>
                        <option ${p.sexo === 'Otro' ? 'selected' : ''}>Otro</option>
                    </select>
                </td>
                <td>
                    ${usuario.id_rol === 3
                ? 'Sin permisos'
                : `
                        <button onclick="actualizarPaciente(${p.id_paciente})">Actualizar</button>
                        <button onclick="eliminarPaciente(${p.id_paciente})">Eliminar</button>
                        `}
                </td>
            </tr>
        `;
    });
}

async function actualizarPaciente(id) {
    if (usuario.id_rol === 3) return;

    await fetch(`${API_PACIENTES}/${id}`, {
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

    cargarPacientes();
}

async function eliminarPaciente(id) {
    if (usuario.id_rol === 3) return;
    if (!confirm('Eliminar paciente?')) return;

    await fetch(`${API_PACIENTES}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    cargarPacientes();
}

cargarPacientes();
