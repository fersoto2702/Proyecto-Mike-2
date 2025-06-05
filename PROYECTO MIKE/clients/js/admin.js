document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (token) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("admin-section").style.display = "block";

    // Cargar datos desde JSON
    await cargarCarreras();
    await cargarHorarios();
    actualizarDashboard();
  } else {
    document.getElementById("login-section").style.display = "block";
    document.getElementById("admin-section").style.display = "none";
  }
});

function logout() {
  localStorage.removeItem("token");
  document.getElementById("login-section").style.display = "block";
  document.getElementById("admin-section").style.display = "none";
}

// 🔵 Cargar Carreras desde JSON
async function cargarCarreras() {
  try {
    const respuesta = await fetch("data/carreras.json");
    const carreras = await respuesta.json();

    const tbody = document.querySelector("#tabla-carreras tbody");
    tbody.innerHTML = "";

    carreras.forEach((carrera) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${carrera.id}</td>
        <td>${carrera.nombre}</td>
        <td>
          <button onclick="editarCarrera(${carrera.id})">Editar</button>
          <button onclick="eliminarCarrera(${carrera.id})">Eliminar</button>
        </td>
      `;
      tbody.appendChild(fila);
    });

    document.getElementById("total-carreras").textContent = carreras.length;
  } catch (error) {
    console.error("Error al cargar carreras:", error);
  }
}

// 🔵 Agregar Carrera
function agregarCarrera() {
  const nombre = document.getElementById("nombreCarrera").value;
  if (!nombre) {
    alert("Ingresa un nombre de carrera.");
    return;
  }

  // Simulación de ID autoincrementable (sólo en el frontend)
  fetch("data/carreras.json")
    .then((res) => res.json())
    .then((carreras) => {
      const nuevaCarrera = {
        id: carreras.length ? carreras[carreras.length - 1].id + 1 : 1,
        nombre: nombre
      };

      carreras.push(nuevaCarrera);
      guardarDatos("data/carreras.json", carreras);
      cargarCarreras();
    });
}

// 🔴 Eliminar Carrera
function eliminarCarrera(id) {
  fetch("data/carreras.json")
    .then((res) => res.json())
    .then((carreras) => {
      const nuevasCarreras = carreras.filter((carrera) => carrera.id !== id);
      guardarDatos("data/carreras.json", nuevasCarreras);
      cargarCarreras();
    });
}

// 🟢 Cargar Horarios desde JSON
async function cargarHorarios() {
  try {
    const respuesta = await fetch("data/horarios.json");
    const horarios = await respuesta.json();

    const tbody = document.querySelector("#tabla-horarios tbody");
    tbody.innerHTML = "";

    horarios.forEach((horario) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${horario.id}</td>
        <td>${horario.id_carrera}</td>
        <td>${horario.dia}</td>
        <td>${horario.hora_inicio}</td>
        <td>${horario.hora_fin}</td>
        <td>${horario.profesor}</td>
        <td>
          <button onclick="editarHorario(${horario.id})">Editar</button>
          <button onclick="eliminarHorario(${horario.id})">Eliminar</button>
        </td>
      `;
      tbody.appendChild(fila);
    });

    document.getElementById("total-horarios").textContent = horarios.length;
  } catch (error) {
    console.error("Error al cargar horarios:", error);
  }
}

// 🟢 Agregar Horario
function agregarHorario() {
  const idCarrera = document.getElementById("idCarreraHorario").value;
  const dia = document.getElementById("diaHorario").value;
  const horaInicio = document.getElementById("horaInicioHorario").value;
  const horaFin = document.getElementById("horaFinHorario").value;
  const profesor = document.getElementById("profesorHorario").value;

  if (!idCarrera || !dia || !horaInicio || !horaFin || !profesor) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  fetch("data/horarios.json")
    .then((res) => res.json())
    .then((horarios) => {
      const nuevoHorario = {
        id: horarios.length ? horarios[horarios.length - 1].id + 1 : 1,
        id_carrera: idCarrera,
        dia: dia,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
        profesor: profesor
      };

      horarios.push(nuevoHorario);
      guardarDatos("data/horarios.json", horarios);
      cargarHorarios();
    });
}

// 🔴 Eliminar Horario
function eliminarHorario(id) {
  fetch("data/horarios.json")
    .then((res) => res.json())
    .then((horarios) => {
      const nuevosHorarios = horarios.filter((horario) => horario.id !== id);
      guardarDatos("data/horarios.json", nuevosHorarios);
      cargarHorarios();
    });
}

// 🔄 Guardar datos en JSON (simulación)
function guardarDatos(ruta, datos) {
  console.log(`Guardando en ${ruta}:`, datos);
  alert("⚠️ Guardado simulado en consola. Implementar backend para cambios reales.");
}

// 🔄 Actualizar Dashboard
function actualizarDashboard() {
  const totalCarreras = document.querySelectorAll("#tabla-carreras tbody tr").length;
  const totalHorarios = document.querySelectorAll("#tabla-horarios tbody tr").length;
  document.getElementById("total-carreras").textContent = totalCarreras;
  document.getElementById("total-horarios").textContent = totalHorarios;
}