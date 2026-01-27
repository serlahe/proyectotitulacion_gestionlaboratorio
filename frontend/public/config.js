// URL base del backend
const API_BASE = 'https://gestion-laboratorio.onrender.com';

// Token global
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'login.html';
}

// Usuario logueado
const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

// Mostrar secciones
function mostrarSeccion(id) {
    document.querySelectorAll('.seccion').forEach(sec => {
        sec.style.display = 'none';
    });

    const activa = document.getElementById(id);
    if (activa) activa.style.display = 'block';
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
}
