if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  }),
);

app.use(function(req,res,next) {
  res.locals.session = req.session;
  next();
});

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json());

app.use(methodOverride('_method'));

app.engine(
  '.hbs',
  handlebars({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
    }
  }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

// add them
const Handlebars = require('handlebars')
Handlebars.registerHelper('if_eq', function(a, b, opts) {
  if (a == b) {
      return opts.fn(this)
  } else {
      return opts.inverse(this)
  }
});
