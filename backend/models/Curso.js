const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Ciclo = require('./Ciclo');

const Curso = sequelize.define('Curso', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    horas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});

// Relación: Un curso pertenece a un ciclo
Curso.belongsTo(Ciclo, { foreignKey: 'ciclo_id', onDelete: 'CASCADE' });

module.exports = Curso;
