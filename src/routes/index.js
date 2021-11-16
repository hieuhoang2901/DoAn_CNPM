
const meRouter = require('./me');

function route(app) {
  app.use('/', meRouter);
}

module.exports = route;