const express = require('express');
const router = express.Router();

const dishController = require('../app/controllers/DishController');

router.post('/store', dishController.store);
router.get('/create', dishController.create);
router.get('/:id/edit', dishController.edit);
router.post('/handle-form-actions', dishController.handleFormActions);
router.post('/handle-form-actions-2', dishController.handleFormActions2);
router.put('/:id', dishController.update);
router.patch('/:id/restore', dishController.restore);
// router.delete('/:id', dishController.delete);
router.delete('/:id/force', dishController.forcedestroy);
router.get('/:slug', dishController.show);

module.exports = router;