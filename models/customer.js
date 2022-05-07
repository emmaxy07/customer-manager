const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = mongoose.model('Customer', Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        max: 80,
        min: 18,
        isActive: {
            type: Boolean,
            default: true
        },
    },
    imageUrl: {
        type: String
    }
}))

module.exports = Customer;