const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const carRoutes = require('./src/routes/carRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Body parsing middleware
app.use(morgan('dev')); // Logging middleware
app.use('/api/cars', carRoutes); // Car routes
app.use('/api/users', userRoutes); // User routes

//connect to mongodb
const uri = "mongodb+srv://testUser:carTests792@cluster0.jco3tfi.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0"; // MongoDB connection URI
//testUser: mongodb user, carTests792: user pswd
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(port))
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
