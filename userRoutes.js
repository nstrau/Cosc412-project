const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes for CRUD operations on users

// Create a new user
router.post('/users', userController.createUser);

//creae new favorite attached to user
router.post('/favorites', userController.addFavorite);

// Read all users
router.get('/users', userController.getAllUsers);

// Read a single user by ID
router.get('/users/:id', userController.getUserById);

//get user favorite
router.get('/favorites', userController.getUserFavorites);

// Update a user by ID
router.put('/users/:id', userController.updateUser);

// Delete a user by ID
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
