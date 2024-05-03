const Car = require('../models/Car');

// Function to handle fetching all cars
exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to handle creating a new car
exports.createCar = async (req, res) => {
    try {
        const newCar = await Car.create(req.body);
        res.status(201).json(newCar);
    } catch (error) {
        console.error('Error creating car:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to handle updating a car
exports.updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json(updatedCar);
    } catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to handle deleting a car
exports.deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCar = await Car.findByIdAndDelete(id);
        if (!deletedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error('Error deleting car:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
