var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const flash = require('express-flash')
const session = require('express-session')

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var apiRouter = require('./routes/api');
var methodOverride = require('method-override')
const restrict = require('./middlewares/restrict')

// var authorization = require('./middlewares/authorization');
var app = express();

app.use(session({
  secret: 'secret code!!',
  resave: false,
  saveUninitialized: false
}))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const passport = require('./lib/passport')
const passportjwt = require('./lib/passportjwt')
var LocalStrategy = require('passport-local');
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/admin', restrict, adminRouter);
app.use('/api/v1', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
