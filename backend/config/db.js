const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('horarios_informatica', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
