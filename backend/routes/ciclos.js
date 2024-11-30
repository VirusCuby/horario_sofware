const express = require('express');
const Ciclo = require('../models/Ciclo');
const router = express.Router();

// Obtener todos los ciclos
router.get('/', async (req, res) => {
    try {
        const ciclos = await Ciclo.findAll();
        res.json(ciclos);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los ciclos', error: err.message });
    }
});

// Crear un nuevo ciclo
router.post('/', async (req, res) => {
    const { nombre, cantidad_estudiantes } = req.body;
    try {
        const nuevoCiclo = await Ciclo.create({ nombre, cantidad_estudiantes });
        res.json(nuevoCiclo);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el ciclo', error: err.message });
    }
});

module.exports = router;
