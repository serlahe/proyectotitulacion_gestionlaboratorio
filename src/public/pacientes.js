const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'login.html';
}

// FORMULARIO
document.getElementById('formPaciente').addEventListener('submit', async (e) => {
    e.preventDefault();

    const rut = document.getElementById('rutPaciente').value;
    const nombre_completo = document.getElementById('nombrePaciente').value;
    const fecha_nacimiento = document.getElementById('fechaNacimientoPaciente').value;
    const sexo = document.getElementById('sexoPaciente').value;

    const res = await fetch('http://localhost:3000/api/pacientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            rut,
            nombre_completo,
            fecha_nacimiento,
            sexo
        })
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.mensaje || 'Error al registrar paciente');
        return;
    }

    document.getElementById('formPaciente').reset();
    cargarPacientes();
});

// LISTAR PACIENTES
async function cargarPacientes() {
    const res = await fetch('http://localhost:3000/api/pacientes', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();
    const tbody = document.querySelector('#tablaPacientes tbody');
    tbody.innerHTML = '';

    data.forEach(p => {
        const tr = document.createElement('tr');

        const fecha = p.fecha_nacimiento
            ? p.fecha_nacimiento.split('T')[0]
            : '';

        tr.innerHTML = `
            <td>${p.rut}</td>
            <td>
                <input type="text" value="${p.nombre_completo}" id="nombre-${p.id_paciente}">
            </td>
            <td>
                <input type="date" value="${fecha}" id="fecha-${p.id_paciente}">
            </td>
            <td>
                <select id="sexo-${p.id_paciente}">
                    <option value="Masculino" ${p.sexo === 'Masculino' ? 'selected' : ''}>Masculino</option>
                    <option value="Femenino" ${p.sexo === 'Femenino' ? 'selected' : ''}>Femenino</option>
                    <option value="Otro" ${p.sexo === 'Otro' ? 'selected' : ''}>Otro</option>
                </select>
            </td>
            <td>
                <button onclick="actualizarPaciente(${p.id_paciente})">Actualizar</button>
                <button onclick="eliminarPaciente(${p.id_paciente})">Eliminar</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}


// CARGAR PACIENTES AL INICIAR
async function actualizarPaciente(id) {
    const nombre_completo = document.getElementById(`nombre-${id}`).value;
    const fecha_nacimiento = document.getElementById(`fecha-${id}`).value;
    const sexo = document.getElementById(`sexo-${id}`).value;

    const res = await fetch(`http://localhost:3000/api/pacientes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            nombre_completo,
            fecha_nacimiento,
            sexo
        })
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.mensaje || 'Error al actualizar paciente');
        return;
    }

    alert('Paciente actualizado correctamente');
}


// ELIMINAR PACIENTE
async function eliminarPaciente(id) {
    if (!confirm('Desea eliminar este paciente?')) return;

    const res = await fetch(`http://localhost:3000/api/pacientes/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.mensaje || 'Error al eliminar paciente');
        return;
    }

    cargarPacientes();
}
