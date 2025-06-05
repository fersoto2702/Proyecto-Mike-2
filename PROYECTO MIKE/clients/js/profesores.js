async function cargarProfesores() {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/api/profesores', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const profesores = await res.json();
    const lista = document.getElementById('lista-profesores');
    lista.innerHTML = profesores.map(p => `<li>${p.nombre} (${p.especialidad}) <button onclick="eliminarProfesor(${p.id})">Eliminar</button></li>`).join('');
  }
  
  async function agregarProfesor() {
    const token = localStorage.getItem('token');
    const nombre = document.getElementById('nombreProfesor').value;
    const especialidad = document.getElementById('especialidadProfesor').value;
    await fetch('http://localhost:3000/api/profesores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ nombre, especialidad })
    });
    cargarProfesores();
  }
  
  async function eliminarProfesor(id) {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:3000/api/profesores/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    cargarProfesores();
  }  