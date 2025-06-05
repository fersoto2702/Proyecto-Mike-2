const express = require('express');
const router = express.Router();
const carrerasController = require('../Controllers/carreras.controller');
const auth = require('../config/auth');

router.get('/', auth, carrerasController.getCarreras);
router.post('/', auth, carrerasController.createCarrera);
router.put('/:id', auth, carrerasController.updateCarrera);
router.delete('/:id', auth, carrerasController.deleteCarrera);

module.exports = router;