const express = require('express');
const bcrypt = require('bcrypt'); // Asegúrate de declarar esto solo una vez
const Usuario = require('../models/Usuario'); // Importar el modelo de Usuario
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existeUsuario = await Usuario.findOne({ where: { email } });
        if (existeUsuario) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear el usuario
        const nuevoUsuario = await Usuario.create({
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'Usuario registrado con éxito', usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Comparar la contraseña ingresada con el hash almacenado
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Simular un token (o JWT en producción)
        res.json({ token: '12345', email: usuario.email });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

module.exports = router;
