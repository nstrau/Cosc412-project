const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Define routes for CRUD operations on cars

// Create a new car
router.post('/cars', carController.createCar);

// Read all cars
router.get('/cars', carController.getAllCars);

// Read a single car by ID
router.get('/cars/:id', carController.getCarById);

// Update a car by ID
router.put('/cars/:id', carController.updateCar);

// Delete a car by ID
router.delete('/cars/:id', carController.deleteCar);

module.exports = router;
