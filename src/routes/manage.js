const express = require('express');
const router = express.Router();

const UserController = require('./../app/controllers/userManageController')


router.get('/', UserController.getAllUser);
router.get('/feedback', UserController.feedback);
router.get('/feedback/:page', UserController.feedback);
router.get('/note', UserController.note);
router.post('/fbkDelete/:slug', UserController.feedbackDelete);
router.post('/delete/:phone', UserController.deleteUser);
router.get('/detail/:phone', UserController.detailUser);
router.get('/:page', UserController.getAllUser);
router.post('/:phone', UserController.updateUser);


module.exports = router;