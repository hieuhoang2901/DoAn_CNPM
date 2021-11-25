const express = require('express');
const route = express.Router();

const ManagerController = require('../app/controllers/ManagerController');
const managerRequire    = require('../app/middlewares/RequiresManager');
const requireLogin = require('../app/middlewares/LoginRequires');

route.use(requireLogin)
route.use(managerRequire)
route.get('/viewrevenue', ManagerController.viewrevenue);
route.get('/vieworders', ManagerController.viewOrders);
route.get('/trash', ManagerController.trash);
route.get('/:id/edit', ManagerController.edit);
route.get('/viewtablereservation', ManagerController.viewtablereservation);
route.get('/trashed/tablereservation', ManagerController.trashedTableReservation);
route.get('/create', ManagerController.create);

module.exports = route;
