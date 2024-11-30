const express = require('express');
const Docente = require('../models/Docente');
const authorize = require('../middleware/authorize'); // Middleware para roles

const router = express.Router();

// Obtener todos los docentes (solo admin)
router.get('/', authorize(['admin']), async (req, res) => {
  try {
    const docentes = await Docente.findAll();
    res.json(docentes);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los docentes', error: err.message });
  }
});

// Crear un nuevo docente (solo admin)
router.post('/', authorize(['admin']), async (req, res) => {
  const { nombre, prioridad, horas_disponibles } = req.body;
  try {
    const nuevoDocente = await Docente.create({ nombre, prioridad, horas_disponibles });
    res.json(nuevoDocente);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el docente', error: err.message });
  }
});

module.exports = router;
