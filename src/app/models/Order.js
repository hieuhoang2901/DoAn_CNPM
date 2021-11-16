const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Order = new Schema({
    userName: { type: String, required: true },
    dishName: [{ type: String }],
    totalCost: { type: Number, required: true },
    feedback: { type: String, default: "NULL" }
});

module.exports = mongoose.model('Order', Order);