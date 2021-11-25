const siteRouter = require('./site');
const meRouter = require('./me');
const foodRouter = require('./food');
const userRouter = require('./user');


function route(app) {
  app.use('/me', meRouter);
  app.use('/foods', foodRouter);
  app.use('/user', userRouter);
  app.use('/', siteRouter);
}

module.exports = route;