const { multipleMongooseToObject } = require('../../util/mongoose')
const Dish = require('../models/Dish');

class FoodController {
    create(req, res, next) {
        res.render('courses/create')
    }
}

module.exports = new FoodController;