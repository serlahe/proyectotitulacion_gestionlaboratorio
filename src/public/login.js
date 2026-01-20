const API_URL = 'http://localhost:3000/api/auth/login';

const form = document.getElementById('loginForm');
const mensaje = document.getElementById('mensaje');

// MANEJADOR DEL EVENTO SUBMIT DEL FORMULARIO
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo, password })
        });

        const data = await res.json();

        if (!res.ok) {
            mensaje.innerText = data.mensaje || 'Error al iniciar sesion';
            mensaje.style.color = 'red';
            return;
        }

        // FUNCION PARA GUARDAR TOKEN Y USUARIO
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));

        // REDIRIGIR UNA VEZ INGRESADO CORRECTAMENTE
        window.location.href = 'dashboard.html';

    } catch (error) {
        mensaje.innerText = 'Error de conexion con el servidor';
        mensaje.style.color = 'red';
    }
});


