const carTypes = [
    { name: 'Audi' },
    { name: 'Benz' },
    { name: 'Ferrari' }
  ];
  
  const bikeType = { name: 'KTM' };
  
  const vehicles = [
    { name: 'KIA', typeId: 1 },
    { name: 'Honda', typeId: 2 },
    { name: 'Maruti', typeId: 3 },
  ];
  
  const sequelize = require('../src/models/database');
  const VehicleType = require('../src/models/VehicleType');
  const VehicleModel = require('../src/models/VehicleModel');
  
  (async () => {
    try {
      await sequelize.sync({ force: true });
  
      await VehicleType.bulkCreate(carTypes);
      await VehicleType.create(bikeType);
      await VehicleModel.bulkCreate(vehicles);
  
      console.log('Seed data inserted successfully.');
      process.exit(0);
    } catch (error) {
      console.error('Error seeding data:', error);
      process.exit(1);
    }
  })();
