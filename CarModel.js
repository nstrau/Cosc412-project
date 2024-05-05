const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    MPG: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    Seats: {
        type: Number,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    PreviousOwners: {
        type: Number,
    },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
