const express = require('express');
const Curso = require('../models/Curso');
const router = express.Router();

// Obtener cursos por ciclo
router.get('/:ciclo_id', async (req, res) => {
    const { ciclo_id } = req.params;
    try {
        const cursos = await Curso.findAll({ where: { ciclo_id } });
        res.json(cursos);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los cursos', error: err.message });
    }
});

// Crear un curso para un ciclo
router.post('/', async (req, res) => {
    const { nombre, horas, ciclo_id } = req.body;
    try {
        const nuevoCurso = await Curso.create({ nombre, horas, ciclo_id });
        res.json(nuevoCurso);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el curso', error: err.message });
    }
});

module.exports = router;
