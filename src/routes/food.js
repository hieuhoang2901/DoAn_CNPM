const express = require('express');
const router = express.Router();

const dishController = require('../app/controllers/DishController');
const managerRequire    = require('../app/middlewares/RequiresManager');
const requireLogin = require('../app/middlewares/LoginRequires');

router.use(requireLogin)
router.use(managerRequire)
router.post('/store', dishController.store);
router.get('/:id/edit', dishController.edit);
router.post('/handle-form-actions', dishController.handleFormActions);
router.post('/handle-form-actions-2', dishController.handleFormActions2);
router.put('/:id', dishController.update);
router.patch('/:id/restore', dishController.restore);
router.delete('/:id', dishController.destroy);
router.delete('/:id/force', dishController.forcedestroy);
router.get('/:slug', dishController.show);

module.exports = router;