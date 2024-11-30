const express = require('express');
const Horario = require('../models/Horario');
const router = express.Router();

// Obtener horarios por ciclo
router.get('/:ciclo_id', async (req, res) => {
    const { ciclo_id } = req.params;
    try {
        const horarios = await Horario.findAll({
            where: { ciclo_id },
            include: [{ model: Curso, as: 'curso' }],
        });
        res.json(horarios);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los horarios', error: err.message });
    }
});

// Asignar un horario
router.post('/', async (req, res) => {
    const { docente, curso_id, horario } = req.body;
    try {
        const nuevoHorario = await Horario.create({ docente, curso_id, horario });
        res.json(nuevoHorario);
    } catch (err) {
        res.status(500).json({ message: 'Error al asignar el horario', error: err.message });
    }
});

module.exports = router;
