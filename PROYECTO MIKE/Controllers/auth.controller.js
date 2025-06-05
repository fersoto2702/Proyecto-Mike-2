const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const usersFile = path.join(__dirname, '../data/users.json');

// Función para leer el archivo JSON
const readUsers = () => {
  if (!fs.existsSync(usersFile)) return [];
  return JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
};

// Función para escribir en el archivo JSON
const writeUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8');
};

// 📌 **Registro de usuario**
exports.register = (req, res) => {
  const { nombre, email, password, rol } = req.body;
  let users = readUsers();

  // Verificar si el usuario ya existe
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Encriptar la contraseña y guardar el nuevo usuario
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { id: users.length + 1, nombre, email, password: hashedPassword, rol: rol || 'estudiante' };

  users.push(newUser);
  writeUsers(users);

  res.json({ message: 'Usuario registrado', id: newUser.id });
};

// 📌 **Inicio de sesión**
exports.login = (req, res) => {
  const { email, password } = req.body;
  let users = readUsers();

  // Buscar usuario
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

  // Comparar la contraseña
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

  // Generar token
  const token = jwt.sign({ id: user.id, email: user.email, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
};