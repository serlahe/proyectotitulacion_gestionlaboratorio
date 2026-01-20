async function cargarAuditoria() {
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:3000/api/auditoria', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();
    const tbody = document.querySelector('#tablaAuditoria tbody');
    tbody.innerHTML = '';

    data.forEach(a => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${a.usuario}</td>
            <td>${a.accion}</td>
            <td>${a.tabla_afectada}</td>
            <td>${new Date(a.fecha).toLocaleString()}</td>
        `;
        tbody.appendChild(tr);
    });
}


