const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('octalogic', 'postgres', 'postgresql', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;