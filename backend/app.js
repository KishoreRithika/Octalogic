
const express = require('express');
const sequelize = require('./src/models/database');
const { Op } = require('sequelize');
const VehicleType = require('./src/models/VehicleType');
const VehicleModel = require('./src/models/VehicleModel');
const Booking = require('./src/models/booking');
const app = express();
const PORT = process.env.PORT || 3200;
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Database sync error:', err);
});

app.get('/api/vehicle-types', async (req, res) => {
  try {
    const vehicleTypes = await VehicleType.findAll();
    return res.json(vehicleTypes);
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/vehicle-models', async (req, res) => {
  try {
    const vehicleModels = await VehicleModel.findAll();
    return res.json(vehicleModels);
  } catch (error) {
    console.error('Error fetching vehicle models:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const { firstName, lastName, wheels, vehicleTypeId, vehicleModelId, startDate, endDate } = req.body;

    const existingBooking = await Booking.findOne({
      where: {
        vehicleModelId,
        startDate: { [Op.lt]: endDate },
        endDate: { [Op.gt]: startDate }
      }
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Vehicle already booked for this date range' });
    }

    const booking = await Booking.create({
      firstName,
      lastName,
      wheels,
      vehicleTypeId,
      vehicleModelId,
      startDate,
      endDate
    });

    return res.status(201).json(booking);
  } catch (error) {
    console.error('Error submitting booking:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
