const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const carrerasRoutes = require('./routes/carreras.routes');
const horarioRoutes = require('./routes/horario.routes');
const matriculaRoutes = require('./routes/matriculas.routes');
const profesorRoutes = require('./routes/profesores.routes');

dotenv.config();
const app = express();

app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/carreras', carrerasRoutes);
app.use('/horario', horarioRoutes);
app.use('/matriculas', matriculaRoutes);
app.use('/profesores', profesorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));