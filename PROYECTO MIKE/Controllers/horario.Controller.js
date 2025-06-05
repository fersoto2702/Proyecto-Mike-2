const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/horarios.json');

// Función para leer los horarios desde JSON
const readData = () => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// Función para escribir los horarios en JSON
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Obtener todos los horarios
exports.getHorarios = (req, res) => {
  const horarios = readData();
  res.json(horarios);
};

// Crear un nuevo horario
exports.createHorario = (req, res) => {
  const { id_carrera, dia, hora_inicio, hora_fin, profesor } = req.body;
  let horarios = readData();

  const newHorario = {
    id: horarios.length > 0 ? horarios[horarios.length - 1].id + 1 : 1,
    id_carrera,
    dia,
    hora_inicio,
    hora_fin,
    profesor
  };

  horarios.push(newHorario);
  writeData(horarios);

  res.json({ message: 'Horario creado', newHorario });
};

// Actualizar un horario
exports.updateHorario = (req, res) => {
  const { id } = req.params;
  const { id_carrera, dia, hora_inicio, hora_fin, profesor } = req.body;
  let horarios = readData();

  const index = horarios.findIndex(h => h.id == id);
  if (index === -1) return res.status(404).json({ message: 'Horario no encontrado' });

  horarios[index] = { id: Number(id), id_carrera, dia, hora_inicio, hora_fin, profesor };
  writeData(horarios);

  res.json({ message: 'Horario actualizado', updatedHorario: horarios[index] });
};

// Eliminar un horario
exports.deleteHorario = (req, res) => {
  const { id } = req.params;
  let horarios = readData();

  const newHorarios = horarios.filter(h => h.id != id);
  if (newHorarios.length === horarios.length) return res.status(404).json({ message: 'Horario no encontrado' });

  writeData(newHorarios);
  res.json({ message: 'Horario eliminado' });
};