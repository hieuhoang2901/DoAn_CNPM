
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Dish = new Schema({
    name: { type: String, unique: true },
    image: { type: String },
    price: { type: String, required: true },
    description: { type: String }
});

module.exports = mongoose.model('Dish', Dish);