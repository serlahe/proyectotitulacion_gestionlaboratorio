const API_CRITICOS = 'http://localhost:3000/api/valores-criticos';

document.addEventListener('DOMContentLoaded', () => {

    const token = localStorage.getItem('token');
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!token || !usuario) {
        window.location.replace('login.html');
        return;
    }

    document.getElementById('nombreUsuario').innerText =
        usuario.nombre_completo;

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

            const res = await fetch(API_CRITICOS, {
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

            formCritico.reset();
            cargarCriticos();
        });
    }

    // Sección por defecto
    mostrarSeccion('avisos');
});



// FUNCIONES DE NAVEGACIÓN
function mostrarSeccion(id) {
    document.querySelectorAll('.seccion')
        .forEach(s => s.style.display = 'none');

    const seccion = document.getElementById(id);

    if (!seccion) {
        console.error(`No existe la sección con id: ${id}`);
        return;
    }

    seccion.style.display = 'block';

    if (id === 'criticos') {
        cargarCriticos();
    }
}



// LOGOUT
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.replace('login.html');
}
