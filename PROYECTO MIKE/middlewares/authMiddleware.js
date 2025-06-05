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

exports.authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Acceso denegado, token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const users = readUsers();
    const user = users.find(u => u.id === decoded.id);
    if (!user) return res.status(401).json({ message: 'Usuario no válido' });

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido' });
  }
};