const API_CRITICOS = `${API_BASE}/api/valores-criticos`;
const token = localStorage.getItem('token');
const usuario = JSON.parse(localStorage.getItem('usuario'));

document.addEventListener('DOMContentLoaded', () => {

    if (!token || !usuario) {
        window.location.href = 'login.html';
        return;
    }

    // Mostrar nombre usuario
    const nombreUsuarioLabel = document.getElementById('nombreUsuarioLabel');
    if (nombreUsuarioLabel) {
        nombreUsuarioLabel.innerText = usuario.nombre_completo;
    }

    const idRol = usuario.id_rol;

    const formCritico = document.getElementById('formCritico');
    const btnUsuarios = document.getElementById('btnUsuarios');

    if (idRol === 3 && formCritico) formCritico.style.display = 'none';
    if ((idRol === 2 || idRol === 3) && btnUsuarios) btnUsuarios.style.display = 'none';

    if (formCritico) {
        formCritico.addEventListener('submit', async e => {
            e.preventDefault();

            const body = {
                paciente: document.getElementById('pacienteCritico').value,
                examen: document.getElementById('examenCritico').value,
                resultado: parseFloat(document.getElementById('resultadoCritico').value),
                limite: document.getElementById('limiteCritico').value
            };

            const res = await fetch(API_CRITICOS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            if (res.ok && typeof cargarCriticos === 'function') {
                cargarCriticos();
            }

            formCritico.reset();
        });
    }

    mostrarSeccion('avisos');
});
