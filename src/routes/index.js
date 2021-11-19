const siteRouter = require('./site')
const meRouter = require('./me');
const foodRouter = require('./food')


function route(app) {
  app.use('/me', meRouter);
  app.use('/foods', foodRouter);
  app.use('/', siteRouter);
}

module.exports = route;