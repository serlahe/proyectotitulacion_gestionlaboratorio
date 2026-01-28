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

  
    mostrarSeccion('avisos');
});
