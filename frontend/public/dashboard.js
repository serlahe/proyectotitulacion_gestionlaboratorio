const API_CRITICOS = `${API_BASE}/api/valores-criticos`;
const idRol = 1;
const token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const formCritico = document.getElementById('formCritico');
    const btnUsuarios = document.getElementById('btnUsuarios');

    // Técnico laboratorio NO puede registrar valores críticos
    if (idRol === 3 && formCritico) {
        formCritico.style.display = 'none';
    }

    // Tecnólogo y Técnico NO ven administración de usuarios
    if ((idRol === 2 || idRol === 3) && btnUsuarios) {
        btnUsuarios.style.display = 'none';
    }

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

    // sección inicial
    mostrarSeccion('avisos');
});

