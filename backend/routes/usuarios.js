const express = require('express');
const router = express.Router();

// Usuario y contraseña simulados
const usuarios = [{ email: 'admin@unt.edu.pe', password: '123456' }];

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const usuario = usuarios.find((u) => u.email === email && u.password === password);

    if (!usuario) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Simular un token
    res.json({ token: '12345' });
});

module.exports = router;
