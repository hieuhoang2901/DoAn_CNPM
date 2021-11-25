const express = require('express');
const route = express.Router();

const AdminController = require('../app/controllers/AdminController');
const adminRequire    = require('../app/middlewares/RequiresAdmin');
const requireLogin = require('../app/middlewares/LoginRequires');

route.use(requireLogin)
route.use(adminRequire)
route.post('/handle-form-action',AdminController.handleFormAction)
route.delete('/deleteUser/:id',AdminController.deleteUser)
route.post('/createManager',AdminController.createManagerPost)
route.get('/createManager', AdminController.createManager)
route.get('/',AdminController.index)

module.exports = route;
