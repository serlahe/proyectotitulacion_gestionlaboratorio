const API_MOV = `${API_BASE}/api/insumos/movimientos`;

const tbodyMov = document.querySelector('#tablaMovimientos tbody');
const tokenMov = localStorage.getItem('token');

async function cargarMovimientos() {
    const res = await fetch(API_MOV, {
        headers: {
            'Authorization': `Bearer ${tokenMov}`
        }
    });

    const data = await res.json();
    tbodyMov.innerHTML = '';

    data.forEach(m => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${m.insumo}</td>
            <td>${m.tipo_movimiento}</td>
            <td>${m.cantidad}</td>
            <td>${m.usuario}</td>
            <td>${new Date(m.fecha).toLocaleString()}</td>
        `;
        tbodyMov.appendChild(tr);
    });
}

cargarMovimientos();

const API_MOV = `${API_BASE}/api/insumos/movimientos`;

const tbodyMov = document.querySelector('#tablaMovimientos tbody');
const tokenMov = localStorage.getItem('token');

async function cargarMovimientos() {
    const res = await fetch(API_MOV, {
        headers: {
            'Authorization': `Bearer ${tokenMov}`
        }
    });

    const data = await res.json();
    tbodyMov.innerHTML = '';

    data.forEach(m => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${m.insumo}</td>
            <td>${m.tipo_movimiento}</td>
            <td>${m.cantidad}</td>
            <td>${m.usuario}</td>
            <td>${new Date(m.fecha).toLocaleString()}</td>
        `;
        tbodyMov.appendChild(tr);
    });
}

cargarMovimientos();

const API_MOV = `${API_BASE}/api/insumos/movimientos`;

const tbodyMov = document.querySelector('#tablaMovimientos tbody');
const tokenMov = localStorage.getItem('token');

async function cargarMovimientos() {
    const res = await fetch(API_MOV, {
        headers: {
            'Authorization': `Bearer ${tokenMov}`
        }
    });

    const data = await res.json();
    tbodyMov.innerHTML = '';

    data.forEach(m => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${m.insumo}</td>
            <td>${m.tipo_movimiento}</td>
            <td>${m.cantidad}</td>
            <td>${m.usuario}</td>
            <td>${new Date(m.fecha).toLocaleString()}</td>
        `;
        tbodyMov.appendChild(tr);
    });
}

cargarMovimientos();
