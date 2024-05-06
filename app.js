
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const carRoutes = require('./src/routes/carRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Body parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // Logging middleware
app.use('/api/cars', carRoutes); // Car routes
app.use('/api/users', userRoutes); // User routes


module.exports = app;

const Car = mongoose.model('Car', {
    make: String, model: String, year: Number, mileage: Number, MPG: Number,
    Price: Number, Seats: Number, Engine: String, PreviousOwners: Number
});

app.get('/cars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.render('cars', { cars }); // Render 'cars.ejs' template with cars data
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).send('Internal server error');
    }
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


mongoose.connect('mongodb+srv://noamhstraus:mongo412@cluster0.jco3tfi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to mongodb')
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to mongoDB', err);
    });
