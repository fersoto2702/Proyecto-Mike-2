async function cargarHorarios() {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:3000/api/horarios', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const horarios = await res.json();
  
  const tbody = document.querySelector("#tabla-horarios tbody");
  tbody.innerHTML = horarios.map(h => `
    <tr>
      <td>${h.id}</td>
      <td>${h.id_carrera}</td>
      <td>${h.dia}</td>
      <td>${h.hora_inicio}</td>
      <td>${h.hora_fin}</td>
      <td>${h.profesor}</td>
      <td>
        <button onclick="editarHorario(${h.id})">Editar</button>
        <button onclick="eliminarHorario(${h.id})">Eliminar</button>
      </td>
    </tr>
  `).join('');
  
  actualizarDashboard();
}

async function agregarHorario() {
  const token = localStorage.getItem('token');
  const id_carrera = document.getElementById('idCarreraHorario').value;
  const dia = document.getElementById('diaHorario').value;
  const hora_inicio = document.getElementById('horaInicioHorario').value;
  const hora_fin = document.getElementById('horaFinHorario').value;
  const profesor = document.getElementById('profesorHorario').value;
  
  await fetch('http://localhost:3000/api/horarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ id_carrera, dia, hora_inicio, hora_fin, profesor })
  });
  
  cargarHorarios();
}

async function eliminarHorario(id) {
  const token = localStorage.getItem('token');
  
  await fetch(`http://localhost:3000/api/horarios/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  cargarHorarios();
}

function editarHorario(id) {
  // Implementa la edición de horario
  alert("Editar horario " + id);
}