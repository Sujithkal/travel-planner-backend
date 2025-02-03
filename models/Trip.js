const mongoose = require('mongoose');

// Define the Trip schema
const tripSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  dates: { type: String, required: true }
});

// Create the Trip model
const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
