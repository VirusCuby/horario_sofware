const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario'); // Importar el modelo de Usuario

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { email, password, rol } = req.body; // Incluye el rol en el registro
  try {
    const existeUsuario = await Usuario.findOne({ where: { email } });
    if (existeUsuario) {
      return res.status(400).json({ message: 'El usuario ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = await Usuario.create({
      email,
      password: hashedPassword,
      rol, // Guardar el rol
    });

    res.status(201).json({ message: 'Usuario registrado con éxito', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Generar el token incluyendo el rol
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      'clave_secreta',
      { expiresIn: '1h' }
    );

    res.json({ token, email: usuario.email, rol: usuario.rol });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

module.exports = router;
