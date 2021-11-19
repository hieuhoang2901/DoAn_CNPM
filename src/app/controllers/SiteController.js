const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose')

class SiteController {

  home(req,res,next) {

    Course.find({})
      .then(courses => {
        res.render('home', {
          courses: multipleMongooseToObject(courses)
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