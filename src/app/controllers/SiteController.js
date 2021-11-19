const Dish = require('../models/Dish');
const { multipleMongooseToObject } = require('../../util/mongoose')

class SiteController {

  home(req,res,next) {

    Dish.find({})
      .then(dishes => {
        res.render('home', {
          dishes: multipleMongooseToObject(dishes)
        });
      })
      .catch(next);   

  }

  search(req,res) {
    res.render('search');
  }

  contact(req,res) {
    res.send('Contact with me!!!');
  }
}

module.exports = new SiteController;