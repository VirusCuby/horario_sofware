const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Docente = sequelize.define('Docente', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prioridad: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    horas_disponibles: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Docente;
