const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const VehicleType = sequelize.define('VehicleType', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'VehicleTypes'
});

module.exports = VehicleType;
