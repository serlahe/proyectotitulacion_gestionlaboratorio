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
    const btnPacientes = document.getElementById('btnPacientes');
    const btnInsumosCrear = document.getElementById('btnCrearInsumo');

    // Tecnico no ve valores criticos ni pacientes
    if (idRol === 3) {
        if (formCritico) formCritico.style.display = 'none';
        if (btnPacientes) btnPacientes.style.display = 'none';
    }

    // Tecnologo y tecnico no gestionan usuarios
    if (idRol === 2 || idRol === 3) {
        if (btnUsuarios) btnUsuarios.style.display = 'none';
    }

    // Solo admin crea insumos
    if (idRol !== 1) {
        if (btnInsumosCrear) btnInsumosCrear.style.display = 'none';
    }

    mostrarSeccion('avisos');
});
