document.addEventListener('DOMContentLoaded', () => {

    const API_BASE = 'https://gestion-laboratorio.onrender.com';
    const API_AVISOS = `${API_BASE}/api/avisos`;
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById('formAviso');
    const lista = document.getElementById('listaAvisos');
    const tipo = document.getElementById('tipoAviso');
    const mensaje = document.getElementById('mensajeAviso');

    async function cargarAvisos() {
        const res = await fetch(API_AVISOS, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await res.json();
        lista.innerHTML = '';

        data.forEach(a => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>[${a.tipo}]</strong> ${a.mensaje}
                <br>
                <small>${new Date(a.fecha_creacion).toLocaleString()} - ${a.creado_por}</small>
                <br>
                <button onclick="desactivarAviso(${a.id_aviso})">Cerrar</button>
            `;
            lista.appendChild(li);
        });
    }

    form.addEventListener('submit', async e => {
        e.preventDefault();

        await fetch(API_AVISOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                tipo: tipo.value,
                mensaje: mensaje.value
            })
        });

        form.reset();
        cargarAvisos();
    });

    window.desactivarAviso = async function (id) {
        await fetch(`${API_AVISOS}/${id}/desactivar`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        cargarAvisos();
    };

    cargarAvisos();
});
