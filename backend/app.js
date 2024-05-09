const express = require('express');
const sequelize = require('./src/models/database');
const VehicleType = require('./src/models/VehicleType');
const VehicleModel = require('./src/models/VehicleModel');

const app = express();
const PORT = process.env.PORT || 3200;

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
