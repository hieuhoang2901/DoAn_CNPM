const { multipleMongooseToObject } = require('../../util/mongoose')
const Dish = require('../models/Dish');

class MeController {
    // [GET]    /stored/courses
  storedFoods(req, res, next) {

    if (req.query.hasOwnProperty('_sort')) {
      res.json({ message: 'successfully!!!' });
    }

    // Promise
    Promise.all([Dish.find({}), Dish.countDocumentsDeleted()])
      .then(([dishes,deletedCount]) =>  
          res.render('me/stored-food', {
            deletedCount,
            dishes: multipleMongooseToObject(dishes),
          })
      )
      .catch(next);
  }
}

module.exports = new MeController;