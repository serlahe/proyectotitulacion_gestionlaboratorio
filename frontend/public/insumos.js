
const API_INSUMOS = `${API_BASE}/api/insumos`;

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) return window.location.href = 'login.html';

    const tbody = document.querySelector('#tablaInsumos tbody');
    const form = document.getElementById('formInsumo');

    async function cargarInsumos() {
        const res = await fetch(API_INSUMOS, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        tbody.innerHTML = '';

        data.forEach(i => {
            tbody.innerHTML += `
                <tr ${i.stock_actual <= i.stock_minimo ? 'style="background:#ffdddd"' : ''}>
                    <td>${i.nombre}</td>
                    <td>${i.stock_actual}</td>
                    <td>${i.stock_minimo}</td>
                    <td>
                        <button onclick="mover(${i.id_insumo},'INGRESO')">+</button>
                        <button onclick="mover(${i.id_insumo},'SALIDA')">-</button>
                    </td>
                </tr>
            `;
        });
    }

    form.addEventListener('submit', async e => {
        e.preventDefault();

        await fetch(API_INSUMOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nombre: nombre.value,
                stock_actual: Number(stock_actual.value),
                stock_minimo: Number(stock_minimo.value)
            })
        });

        form.reset();
        cargarInsumos();
    });

    window.mover = async (id, tipo) => {
        const cantidad = prompt('Cantidad');
        if (!cantidad) return;

        await fetch(`${API_INSUMOS}/movimiento`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id_insumo: id, cantidad, tipo_movimiento: tipo })
        });

        cargarInsumos();
    };

    cargarInsumos();
});


