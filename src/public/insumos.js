document.addEventListener('DOMContentLoaded', () => {

    const API_URL = 'http://localhost:3000/api/insumos';
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const inputNombre = document.getElementById('nombre');
    const inputStockActual = document.getElementById('stock_actual');
    const inputStockMinimo = document.getElementById('stock_minimo');
    const tbody = document.querySelector('#tablaInsumos tbody');
    const form = document.getElementById('formInsumo');





    /* LISTAR INSUMOS */
    async function cargarInsumos() {
        const res = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();
        tbody.innerHTML = '';

        if (!Array.isArray(data)) {
            console.error('Respuesta inválida de insumos:', data);
            return;
        }

        data.forEach(i => {
            const tr = document.createElement('tr');

            if (i.stock_actual <= i.stock_minimo) {
                tr.style.background = '#ffdddd';
            }

            tr.innerHTML = `
            <td>${i.nombre}</td>
            <td>${i.stock_actual}</td>
            <td>${i.stock_minimo}</td>
            <td>
                <button onclick="mover(${i.id_insumo}, 'INGRESO')">+</button>
                <button onclick="mover(${i.id_insumo}, 'SALIDA')">-</button>
            </td>
        `;
            tbody.appendChild(tr);
        });
    }

    

    /* CREAR INSUMO*/
    form.addEventListener('submit', async e => {
        e.preventDefault();

        const body = {
            nombre: inputNombre.value,
            stock_actual: Number(inputStockActual.value),
            stock_minimo: Number(inputStockMinimo.value)
        };

        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data = await res.json();
        console.log('RESPUESTA:', data);

        if (!res.ok) {
            alert(data.mensaje || 'Error al crear insumo');
            return;
        }

        form.reset();
        cargarInsumos();
    });



    /* GESTION DEL MOVIMIENTO */
    window.mover = async function (id_insumo, tipo) {
        const cantidad = prompt('Cantidad');

        if (!cantidad || cantidad <= 0) return;

        await fetch(`${API_URL}/movimiento`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id_insumo,
                cantidad: Number(cantidad),
                tipo_movimiento: tipo
            })
        });

        cargarInsumos();
    };
    cargarInsumos();

});


