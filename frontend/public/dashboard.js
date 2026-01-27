const API_CRITICOS = `${API_BASE}/api/valores-criticos`;
const token = localStorage.getItem('token');
const usuario = JSON.parse(localStorage.getItem('usuario'));

document.addEventListener('DOMContentLoaded', () => {

    // Seguridad básica
    if (!token || !usuario) {
        window.location.href = 'login.html';
        return;
    }

    // Mostrar nombre de usuario
    const nombreUsuarioLabel = document.getElementById('nombreUsuarioLabel');
    if (nombreUsuarioLabel) {
        nombreUsuarioLabel.innerText = usuario.nombre_completo;
    }

    const idRol = usuario.id_rol;

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

    // Registrar valor crítico
    if (formCritico) {
        formCritico.addEventListener('submit', async (e) => {
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
                console.warn('Error al conectar con el backend');
            }

            formCritico.reset();
        });
    }

    // Sección inicial
    mostrarSeccion('avisos');
});

/* NAVEGACIÓN DE SECCIONES */

function mostrarSeccion(id) {
    document.querySelectorAll('.seccion').forEach(sec => {
        sec.style.display = 'none';
    });

    const activa = document.getElementById(id);
    if (activa) {
        activa.style.display = 'block';
    }
}

/* LOGOUT */

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
}
