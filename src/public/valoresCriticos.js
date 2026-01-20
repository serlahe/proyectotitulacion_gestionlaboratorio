document.addEventListener('DOMContentLoaded', () => {

    const API_URL = 'http://localhost:3000/api/valores-criticos';
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById('formCritico');
    const tbody = document.querySelector('#tablaCriticos tbody');

    /* LISTAR VALORES CRÍTICOS */
    window.cargarCriticos = async function () {
        const res = await fetch(API_URL, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await res.json();
        tbody.innerHTML = '';

        if (!Array.isArray(data)) return;

        data.forEach(v => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
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
        `;
            tbody.appendChild(tr);
        });
    };


    /* REGISTRAR VALOR CRÍTICO */
    form.addEventListener('submit', async e => {
        e.preventDefault();

        const body = {
            paciente: document.getElementById('pacienteCritico').value,
            examen: document.getElementById('examenCritico').value,
            resultado: parseFloat(document.getElementById('resultadoCritico').value),
            limite: document.getElementById('limiteCritico').value
        };

        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.mensaje || 'Error al registrar valor crítico');
            return;
        }

        form.reset();
        cargarCriticos();
    });

    /* GESTIONAR VALOR CRÍTICO */
    window.gestionarCritico = async function (id) {
        if (!confirm('Se confirmará la gestión')) return;

        await fetch(`${API_URL}/${id}/gestionar`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        cargarCriticos();
    };


    cargarCriticos();
});
