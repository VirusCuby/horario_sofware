const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ciclo = sequelize.define('Ciclo', {
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad_estudiantes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    timestamps: true,
});

module.exports = Ciclo;
