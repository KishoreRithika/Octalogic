const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Booking = sequelize.define('Booking', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wheels: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vehicleModelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Booking;
