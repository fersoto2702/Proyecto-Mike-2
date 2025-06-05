const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/matriculas.json');

// Función para leer los datos del archivo JSON
const readData = () => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// Función para escribir los datos en el archivo JSON
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Obtener todas las matrículas
exports.getMatriculas = (req, res) => {
  const matriculas = readData();
  res.json(matriculas);
};

// Crear una nueva matrícula
exports.createMatricula = (req, res) => {
  const { id_usuario, id_carrera } = req.body;
  let matriculas = readData();

  const newMatricula = {
    id: matriculas.length > 0 ? matriculas[matriculas.length - 1].id + 1 : 1,
    id_usuario,
    id_carrera
  };

  matriculas.push(newMatricula);
  writeData(matriculas);

  res.json({ message: 'Matrícula creada', newMatricula });
};

// Actualizar una matrícula
exports.updateMatricula = (req, res) => {
  const { id } = req.params;
  const { id_usuario, id_carrera } = req.body;
  let matriculas = readData();

  const index = matriculas.findIndex(m => m.id == id);
  if (index === -1) return res.status(404).json({ message: 'Matrícula no encontrada' });

  matriculas[index] = { id: Number(id), id_usuario, id_carrera };
  writeData(matriculas);

  res.json({ message: 'Matrícula actualizada', matricula: matriculas[index] });
};

// Eliminar una matrícula
exports.deleteMatricula = (req, res) => {
  const { id } = req.params;
  let matriculas = readData();

  const filteredMatriculas = matriculas.filter(m => m.id != id);
  if (filteredMatriculas.length === matriculas.length) {
    return res.status(404).json({ message: 'Matrícula no encontrada' });
  }

  writeData(filteredMatriculas);
  res.json({ message: 'Matrícula eliminada' });
};