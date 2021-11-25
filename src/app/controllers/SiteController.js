const Dish = require('./../models/Dish');

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
  redirect_to_search(req, res, next) {
    var data = (req.body.searchBar).replace(' ', '-');
    res.redirect('/search/' + data);
  }
  search(req,res,next) {
    var data = (req.params.data).replace('-', ' ');
    Dish.find({'name' : new RegExp(data, 'i')})
    .then(dishes => {
      res.render('searchResult', {
        dishes: multipleMongooseToObject(dishes)
      });
    })
    .catch(next);
    // Dish.find({})
    //   .then(dishes => {
    //     res.render('searchResult', {
    //       dishes: multipleMongooseToObject(dishes)
    //     });
    //   })
    //   .catch(next);
  }
}

module.exports = new SiteController;