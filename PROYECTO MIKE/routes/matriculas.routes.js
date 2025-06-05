const express = require('express');
const router = express.Router();
const matriculasController = require('../Controllers/matriculas.controller');
const auth = require('../config/auth');

router.get('/', auth, matriculasController.getMatriculas);
router.post('/', auth, matriculasController.createMatricula);
router.put('/:id', auth, matriculasController.updateMatricula);
router.delete('/:id', auth, matriculasController.deleteMatricula);

module.exports = router;