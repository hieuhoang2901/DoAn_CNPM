if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const path              = require('path');
const express           = require('express');
const flash             = require('express-flash');
const session           = require('express-session');
const handlebars        = require('express-handlebars');
const SortMiddleware    = require('./app/middlewares/SortMiddleware');
const app               = express();
const port              = 3000;
const db                = require('./config/db');
const route             = require('./routes/index');
const methodOverride    = require('method-override');
const getUser           = require('./app/middlewares/SetUser');
const bodyParser        = require('body-parser');
// const morgan            = require('morgan');
db.connect();

app.use(flash());
app.use(
  session({
      secret: 'process.env.SECERT_SESSION_KEY',
      resave: true,
      saveUninitialized: false,
  }),
);

app.use(function(req,res,next) {
  res.locals.session = req.session;
  next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(methodOverride('_method')); //override using a query value

app.use(SortMiddleware);
app.use(getUser);
//app.use(morgan("combined")) // track HTTP call

app.use(
  express.urlencoded({
      extended: true,
  }),
);

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public'))); // set static public

//templet engine
app.engine(
  'hbs',
  handlebars({
      extname: '.hbs', // change file types name
      helpers: require('./app/helpers/handlebars'),
  }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); // set views

route(app);

app.listen(port, () => {
  console.log(`Restaurant app listening at http://localhost:${port}`);
});
