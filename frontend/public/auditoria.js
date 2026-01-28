let auditoriaCompleta = [];


const API_AUDITORIA = `${API_BASE}/api/auditoria`;

window.cargarAuditoria = async function () {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const res = await fetch(API_AUDITORIA, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!Array.isArray(data)) {
        console.error('Respuesta inválida auditoría:', data);
        return;
    }

    auditoriaCompleta = data;
    renderAuditoria(auditoriaCompleta);
};

function renderAuditoria(lista) {
    const tbody = document.querySelector('#tablaAuditoria tbody');
    tbody.innerHTML = '';

    lista.forEach(a => {
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

document.getElementById('filtroModulo').addEventListener('change', e => {
    const modulo = e.target.value;

    if (!modulo) {
        renderAuditoria(auditoriaCompleta);
        return;
    }

    const filtrado = auditoriaCompleta.filter(a => a.tabla_afectada === modulo);
    renderAuditoria(filtrado);
});

document.addEventListener('DOMContentLoaded', () => {
    cargarAuditoria();
});
