const express = require('express');
const sequelize = require('./config/db'); // Configuración de la base de datos
const authRoutes = require('./routes/auth'); // Ruta de autenticación

const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());

// Middleware para manejar JSON
app.use(express.json());

// Registrar las rutas
app.use('/api', authRoutes);

// Probar la conexión a la base de datos
sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos exitosa'))
    .catch((err) => console.error('Error al conectar a la base de datos:', err));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
