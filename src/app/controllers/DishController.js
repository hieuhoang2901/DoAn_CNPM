const Dish = require('../models/Dish')
const { MongoosetoObject, modifyRequestImage } = require('../../util/mongoose')

class DishController {

  show(req, res, next) {
    Dish.findOne({ slug: req.params.slug })
      .then((course) => 
        res.render('courses/show', {course: MongoosetoObject(course)})
      )
      .catch(next);
  }
  
  // [GET] /courses/create 
  create(req, res, next) {
    res.render('courses/create');
  }

  // [POST] /courses/store
  store(req, res, next) {
    const formData = req.body;
    modifyRequestImage(req);
    const dish = new Dish(formData);
    dish.save()
      .then(() => res.redirect('/'))
      .catch(error => {});
  }

  edit(req, res, next) {
    Dish.findById(req.params.id)
      .then(dish => res.render('courses/edit', {
        dish: MongoosetoObject(dish),
        user: req.user,
      }))
      .catch(next)
  }

  // [PUT] /foods/:id
  update(req,res,next) {
    Dish.updateOne({ _id: req.params.id}, req.body)
      .then(() => res.redirect('/manager/stored/foods'))
      .catch(next)
  }

  // [DELETE] /courses/:id
  destroy(req, res, next) {
    Dish.delete({ _id: req.params.id})
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [PATCH] /courses/:id/restore
  restore(req, res, next) {
    Dish.restore({ _id: req.params.id})
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [DELETE] /courses/:id/force
  forcedestroy(req, res, next) {
    Dish.deleteOne({ _id: req.params.id})
      .then(() => res.redirect('back'))
      .catch(next);
  }
  
  // [POST] /courses/handle-form-actions  
  handleFormActions(req, res, next) {
    switch(req.body.action) {
      case 'delete':
        Dish.delete({ _id: {  $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        res.json( {message: 'Invalid action'} );
    }
  }

  // [POST] /courses/handle-form-actions-2
  handleFormActions2(req, res, next) {
    switch(req.body.action) {
      case 'restore':
        Dish.restore({ _id: {  $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
          break;
      // -----------------------------------------------------
      case 'delete-force':
        Dish.deleteOne({ _id: {  $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
          break;
      // -----------------------------------------------------
      default:
        res.json( {message: 'Invalid action'} );
    }
  }

}

module.exports = new DishController();