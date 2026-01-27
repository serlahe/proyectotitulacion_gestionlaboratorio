
const API_USUARIOS = `${API_BASE}/api/usuarios`;

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const form = document.getElementById('formUsuario');
    if (!form) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();

        const body = {
            nombre_completo: document.getElementById('nombreUsuario').value,
            correo: document.getElementById('usernameUsuario').value,
            password: document.getElementById('passwordUsuario').value,
            id_rol: Number(document.getElementById('rolUsuario').value)
        };

        const res = await fetch(API_USUARIOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            alert('Error al crear usuario');
            return;
        }

        alert('Usuario creado');
        form.reset();
    });
});
