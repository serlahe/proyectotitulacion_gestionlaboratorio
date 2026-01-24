document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return;
    }

    const form = document.getElementById('formUsuario');

   
    if (!form) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();

        const body = {
            nombre_completo: document.getElementById('nombreUsuario').value.trim(),
            correo: document.getElementById('usernameUsuario').value.trim(),
            password: document.getElementById('passwordUsuario').value,
            id_rol: Number(document.getElementById('rolUsuario').value)
        };

        const res = await fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.mensaje || 'Error al crear usuario');
            return;
        }

        alert('Usuario creado correctamente');
        form.reset();
    });

