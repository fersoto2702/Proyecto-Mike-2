const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/carreras.json');

const readData = () => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

exports.getCarreras = (req, res) => {
  const carreras = readData();
  res.json(carreras);
};

exports.addCarrera = (req, res) => {
  const { nombre } = req.body;
  let carreras = readData();
  const newCarrera = { id: carreras.length + 1, nombre };

  carreras.push(newCarrera);
  writeData(carreras);

  res.json({ message: 'Carrera agregada', newCarrera });
};