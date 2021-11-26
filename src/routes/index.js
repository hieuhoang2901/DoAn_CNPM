const siteRouter = require('./site');
const meRouter = require('./me');
const foodRouter = require('./food');
const userRouter = require('./user');
const managerRouter = require('./manager');


function route(app) {
  app.use('/me', meRouter);
  app.use('/foods', foodRouter);
  app.use('/manager', managerRouter);
  app.use('/user', userRouter);
  app.use('/', siteRouter);
}

module.exports = route;