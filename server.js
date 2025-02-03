const Trip = require('./models/Trip');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Set up Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = 'mongodb+srv://sujith_k:sujithk@cluster0.rxocj.mongodb.net/travelPlanner?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Sample routes
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'user' && password === 'password') {
    res.status(200).send({ message: 'Login Successful!' });
  } else {
    res.status(400).send({ message: 'Invalid credentials' });
  }
});

app.post('/plan-trip', (req, res) => {
  const { destination, dates } = req.body;

  // Save trip details in MongoDB
  const trip = new Trip({ destination, dates });
  trip.save()
    .then(() => res.status(200).send({ message: 'Trip planned successfully', destination, dates }))
    .catch((err) => res.status(500).send({ message: 'Error saving trip', error: err }));
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
