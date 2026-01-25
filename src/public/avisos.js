document.addEventListener('DOMContentLoaded', () => {


    const API_URL = 'https://gestion-laboratorio.onrender.com/api/avisos';
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById('formAviso');
    const lista = document.getElementById('listaAvisos');
    const tipo = document.getElementById('tipoAviso');
    const mensaje = document.getElementById('mensajeAviso');

    /* LISTAR AVISOS */
    async function cargarAvisos() {
        const res = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
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

    /* CREAR AVISO */
    form.addEventListener('submit', async e => {
        e.preventDefault();

        const body = {
            tipo: tipo.value,
            mensaje: mensaje.value
        };

        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            alert('Error al crear aviso');
            return;
        }

        form.reset();
        cargarAvisos();
    });

    /* DESACTIVAR AVISO */
    window.desactivarAviso = async function (id) {
        if (!confirm('Cerrar este aviso?')) return;

        await fetch(`${API_URL}/${id}/desactivar`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        cargarAvisos();
    };

    cargarAvisos();
});


