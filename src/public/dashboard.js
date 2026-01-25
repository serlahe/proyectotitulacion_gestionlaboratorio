const API_CRITICOS = 'http://localhost:3000/api/valores-criticos';
const idRol = 1; // mock: Administrador
const token = 'mock';

document.addEventListener('DOMContentLoaded', () => {

    const formCritico = document.getElementById('formCritico');
    const btnUsuarios = document.getElementById('btnUsuarios');

    /*
      ROLES
      1 = Administrador
      2 = Tecnólogo
      3 = Técnico laboratorio
    */

    // Técnico laboratorio NO puede registrar valores críticos
    if (idRol === 3 && formCritico) {
        formCritico.style.display = 'none';
    }

    // Tecnólogo y Técnico NO ven administración de usuarios
    if ((idRol === 2 || idRol === 3) && btnUsuarios) {
        btnUsuarios.style.display = 'none';
    }

    // SUBMIT REGISTRO VALOR CRÍTICO
    if (formCritico) {
        formCritico.addEventListener('submit', async e => {
            e.preventDefault();

            const body = {
                paciente: document.getElementById('pacienteCritico').value,
                examen: document.getElementById('examenCritico').value,
                resultado: parseFloat(document.getElementById('resultadoCritico').value),
                limite: document.getElementById('limiteCritico').value
            };

            try {
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
            } catch (err) {
                console.warn('Backend no disponible (ok para presentación)');
            }

            formCritico.reset();
        });
    }

    // Sección por defecto
    mostrarSeccion('avisos');
});

