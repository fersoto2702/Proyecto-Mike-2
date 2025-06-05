const CODIGO_CHECADOR = "12345"; // Código de seguridad para checador
let users = [];

function accederChecador() {
  const codigo = document.getElementById("codigo-checador").value.trim();
  if (codigo === CODIGO_CHECADOR) {
    alert("Acceso concedido al Checador ✅");
    localStorage.setItem("token", "checador");
    window.location.href = "checador.html";
  } else {
    alert("Código incorrecto. Inténtalo de nuevo.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  async function cargarUsuarios() {
    try {
      const response = await fetch("/data/users.json");
      users = await response.json();
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      alert("No se pudieron cargar los usuarios.");
    }
  }

  function login(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Por favor, ingresa tu usuario y contraseña.");
      return;
    }

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem("token", username);
      alert("Inicio de sesión exitoso ✅");
      if (user.type === "estudiante") {
        window.location.href = "estudiante.html";
      } else if (user.type === "maestro") {
        window.location.href = "maestro.html";
      }
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  }

  document.getElementById("user-type").addEventListener("change", function () {
    const tipo = this.value;
    document.getElementById("login-section").classList.toggle("hidden", tipo !== "estudiante" && tipo !== "maestro");
    document.getElementById("checador-section").classList.toggle("hidden", tipo !== "checador");
  });

  const loginForm = document.getElementById("login-form");
  if (loginForm) loginForm.addEventListener("submit", login);

  document.getElementById("btn-checador").addEventListener("click", accederChecador);

  cargarUsuarios();

  // Credenciales del administrador (simuladas)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123"
};

// Función para manejar el login del administrador
function handleAdminLogin(event) {
  event.preventDefault(); // Evitar que el formulario se envíe

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Validar credenciales
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      alert("Login exitoso. Bienvenido, administrador.");
      // Aquí podrías redirigir al panel de administrador
  } else {
      alert("Usuario o contraseña incorrectos.");
  }

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    alert("Login exitoso. Bienvenido, administrador.");
    // Redirigir al panel de administrador
    window.location.href = "admin.html";
}
}

function handleAdminLogin(event) {
  event.preventDefault(); // Evitar que el formulario se envíe

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("user-type").value;

  // Validar credenciales
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      alert("Login exitoso. Redirigiendo...");

      // Redirigir según el rol seleccionado
      switch (role) {
          case "administrador":
              window.location.href = "admin.html";
              break;
          case "estudiante":
              window.location.href = "estudiante.html";
              break;
          case "maestro":
              window.location.href = "maestro.html";
              break;
          case "checador":
              window.location.href = "checador.html";
              break;
          default:
              alert("Rol no válido.");
      }
  } else {
      alert("Usuario o contraseña incorrectos.");
  }
}
});