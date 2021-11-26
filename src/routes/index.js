const siteRouter = require('./site');
const meRouter = require('./me');
const foodRouter = require('./food');
const userRouter = require('./user');
const managerRouter = require('./manager');
const manageRouter = require('./manage');




function route(app) {
  app.use('/me', meRouter);
  app.use('/foods', foodRouter);
  app.use('/user', userRouter);
  app.use('/manager', managerRouter);
  app.use('/manage', manageRouter);
  app.use('/', siteRouter);
}

module.exports = route;