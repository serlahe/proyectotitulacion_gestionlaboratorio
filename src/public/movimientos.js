const tbodyMov = document.querySelector('#tablaMovimientos tbody');
const API_MOV = 'https://gestion-laboratorio.onrender.com/api/insumos/movimientos';
const tokenMov = localStorage.getItem('token');


// FUNCION PARA CARGAR MOVIMIENTOS
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


