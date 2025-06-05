const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/profesores.json');

// Función para leer los datos del archivo JSON
const readData = () => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// Función para escribir los datos en el archivo JSON
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Obtener todos los profesores
exports.getProfesores = (req, res) => {
  const profesores = readData();
  res.json(profesores);
};

// Crear un nuevo profesor
exports.createProfesor = (req, res) => {
  const { nombre, especialidad } = req.body;
  let profesores = readData();

  const newProfesor = {
    id: profesores.length > 0 ? profesores[profesores.length - 1].id + 1 : 1,
    nombre,
    especialidad
  };

  profesores.push(newProfesor);
  writeData(profesores);

  res.json({ message: 'Profesor creado', newProfesor });
};

// Actualizar un profesor
exports.updateProfesor = (req, res) => {
  const { id } = req.params;
  const { nombre, especialidad } = req.body;
  let profesores = readData();

  const index = profesores.findIndex(p => p.id == id);
  if (index === -1) return res.status(404).json({ message: 'Profesor no encontrado' });

  profesores[index] = { id: Number(id), nombre, especialidad };
  writeData(profesores);

  res.json({ message: 'Profesor actualizado', profesor: profesores[index] });
};

// Eliminar un profesor
exports.deleteProfesor = (req, res) => {
  const { id } = req.params;
  let profesores = readData();

  const filteredProfesores = profesores.filter(p => p.id != id);
  if (filteredProfesores.length === profesores.length) {
    return res.status(404).json({ message: 'Profesor no encontrado' });
  }

  writeData(filteredProfesores);
  res.json({ message: 'Profesor eliminado' });
};