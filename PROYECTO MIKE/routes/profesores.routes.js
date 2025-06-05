const express = require('express');
const router = express.Router();
const profesoresController = require('../Controllers/profesores.controller');
const auth = require('../config/auth');

router.get('/', auth, profesoresController.getProfesores);
router.post('/', auth, profesoresController.createProfesor);
router.put('/:id', auth, profesoresController.updateProfesor);
router.delete('/:id', auth, profesoresController.deleteProfesor);

module.exports = router;