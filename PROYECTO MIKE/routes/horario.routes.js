const express = require('express');
const router = express.Router();
const horarioController = require('../Controllers/horario.Controller');
const auth = require('../config/auth');

router.get('/', auth, horarioController.getHorarios);
router.post('/', auth, horarioController.createHorario);
router.put('/:id', auth, horarioController.updateHorario);
router.delete('/:id', auth, horarioController.deleteHorario);

module.exports = router;