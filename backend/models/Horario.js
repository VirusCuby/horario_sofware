const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Docente = require('./Docente');
const Curso = require('./Curso');

const Horario = sequelize.define('Horario', {
    dia: {
        type: DataTypes.ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'),
        allowNull: false,
    },
    hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    hora_fin: {
        type: DataTypes.TIME,
        allowNull: false,
    },
}, {
    timestamps: true,
});

// Relación: Un horario pertenece a un docente y un curso
Horario.belongsTo(Docente, { foreignKey: 'docente_id', onDelete: 'CASCADE' });
Horario.belongsTo(Curso, { foreignKey: 'curso_id', onDelete: 'CASCADE' });

module.exports = Horario;
