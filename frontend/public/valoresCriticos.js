(() => {

    const API_CRITICOS = `${API_BASE}/api/valores-criticos`;
    const API_PACIENTES = `${API_BASE}/api/pacientes`;
    const token = localStorage.getItem('token');
    if (!token) return;

    const form = document.getElementById('formCritico');
    const tbody = document.querySelector('#tablaCriticos tbody');

    window.cargarCriticos = async () => {
        const res = await fetch(API_CRITICOS, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await res.json();
        tbody.innerHTML = '';

        data.forEach(v => {
            tbody.innerHTML += `
                <tr>
                    <td>${v.paciente}</td>
                    <td>${v.examen}</td>
                    <td>${v.resultado}</td>
                    <td>${v.limite}</td>
                    <td>${v.estado}</td>
                    <td>
                        ${v.estado === 'PENDIENTE'
                    ? `<button onclick="gestionarCritico(${v.id})">Gestionar</button>`
                    : 'Listo'}
                    </td>
                </tr>
            `;
        });
    };

    form.addEventListener('submit', async e => {
        e.preventDefault();

        await fetch(API_CRITICOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                paciente: document.getElementById('pacienteCritico').value,
                examen: document.getElementById('examenCritico').value,
                resultado: Number(document.getElementById('resultadoCritico').value),
                limite: document.getElementById('limiteCritico').value
            })
        });

        form.reset();
        cargarCriticos();
    });

    window.gestionarCritico = async id => {
        await fetch(`${API_CRITICOS}/${id}/gestionar`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        cargarCriticos();
    };

    window.cargarPacientesCriticos = async () => {
        const res = await fetch(API_PACIENTES, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const pacientes = await res.json();
        const select = document.getElementById('pacienteCritico');

        select.innerHTML = '<option value="">Seleccione paciente</option>';
        pacientes.forEach(p => {
            const opt = document.createElement('option');
            opt.value = `${p.nombre_completo} (${p.rut})`;
            opt.textContent = opt.value;
            select.appendChild(opt);
        });
    };

    cargarPacientesCriticos();
    cargarCriticos();

})();

