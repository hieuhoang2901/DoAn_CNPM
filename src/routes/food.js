const express = require('express');
const router = express.Router();

const foodController = require('./../app/controllers/FoodController')

router.get('/create', foodController.create);

module.exports = router;