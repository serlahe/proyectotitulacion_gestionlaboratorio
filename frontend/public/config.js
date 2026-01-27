// URL base del backend
const API_BASE = 'https://gestion-laboratorio.onrender.com';

// Mostrar secciones del dashboard
function mostrarSeccion(id) {
    document.querySelectorAll('.seccion').forEach(sec => {
        sec.style.display = 'none';
    });

    const activa = document.getElementById(id);
    if (activa) activa.style.display = 'block';
}

// Cerrar sesion
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
}
