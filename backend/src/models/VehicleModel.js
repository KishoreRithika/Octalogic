const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const VehicleType = require('./VehicleType');

const VehicleModel = sequelize.define('VehicleModel', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'VehicleModels'
});

VehicleType.hasMany(VehicleModel);
VehicleModel.belongsTo(VehicleType);

module.exports = VehicleModel;
