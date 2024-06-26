var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
require('dotenv').config();
const { sequelize } = require('./models');


var aslabRouter = require('./routes/aslabRoute');
var adminRouter = require('./routes/adminRoute');
var authRouter = require('./routes/authRoute');
var tamuRouter = require('./routes/tamuRoute');
var feedbackRouter = require('./routes/feedbackRoute');

var app = express();

sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Unable to sync database:', err);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/aslab', aslabRouter); 
app.use('/admin', adminRouter); 
app.use('/', authRouter);
app.use('/tamu', tamuRouter);
app.use('/feedback', feedbackRouter); 

app.use(express.static(path.join(__dirname, "./node_modules/preline/dist")));app.use('/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));
app.use('/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));

app.use(function(req, res, next) {
  next(createError(404));
});

app.use((req, res, next) => {
  console.log(`Menerima permintaan: ${req.method} ${req.url}`);
  next();
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = app;