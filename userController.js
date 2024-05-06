const User = require('../models/UserModel');
const Favorites = require('../models/FavoritesModel');

// Function to handle creating a new user
exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to handle getting all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to handle getting a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to handle updating a user by ID
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to handle deleting a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//function to add a car to the users favorites
async function addFavorite(req, res) {
    try {
        // Extract the user ID from the request
        const userId = req.body.userId; // Assuming the user ID is provided in the request body

        // Logic to add a favorite car for a user
        // For example:
        const favorite = new Favorites({
            userId: userId,
            carId: req.body.carId // Assuming the car ID is provided in the request body
        });
        await favorite.save();

        res.status(201).json({ message: 'Favorite added successfully' });
    } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//function to display users favorites
async function getUserFavorites(req, res) {
    try {
        // Extract the user ID from the request
        const userId = req.params.userId; // Assuming the user ID is provided in the request parameters

        // Logic to get favorites for a user
        // For example:
        const favorites = await Favorites.find({ userId: userId });
        res.json(favorites);
    } catch (error) {
        console.error('Error fetching user favorites:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    addFavorite,
    getUserFavorites,
    createUser,
    deleteUser,
    updateUser,
    getAllUsers,
    getUserById
};
