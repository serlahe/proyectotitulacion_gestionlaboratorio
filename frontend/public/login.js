const API_URL = 'https://gestion-laboratorio.onrender.com/api/auth/login';

const form = document.getElementById('loginForm');
const mensaje = document.getElementById('mensaje');

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
            mensaje.innerText = data.mensaje || 'Error al iniciar sesión';
            mensaje.style.color = 'red';
            return;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));

        window.location.href = '/';
    } catch (err) {
        mensaje.innerText = 'Error de conexión con el servidor';
        mensaje.style.color = 'red';
    }
});
