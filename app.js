var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const flash = require('express-flash')
const session = require('express-session')
const { User_game } = require('./models')

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var apiRouter = require('./routes/api');
var methodOverride = require('method-override')


const passportjwt = require('./lib/passportjwt')



// var authorization = require('./middlewares/authorization');
var app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use(session({
  secret: 'secret code!!',
  resave: false,
  saveUninitialized: false
}))

const passport = require('./lib/passport')
app.use(passport.initialize())
app.use(passport.session())

//Middleware to see how the params are populated by Passport
let count = 1

printData = (req, res, next) => {
    // console.log("\n==============================")
    // console.log(`------------>  ${count++}`)

    // console.log(`req.body.username -------> ${req.body.username}`) 
    // console.log(`req.body.password -------> ${req.body.password}`)

    // console.log(`\n req.session.passport -------> `)
    // console.log(req.session.passport)
  
    // console.log(`\n req.user -------> `) 
    // console.log(req.user) 
  
    // console.log("\n Session and Cookie")
    // console.log(`req.session.id -------> ${req.session.id}`) 
    // console.log(`req.session.cookie -------> `) 
    // console.log(req.session.cookie) 
  
    // console.log("===========================================\n")

    next()
}

const restrict = require('./middlewares/restrict')
app.use(printData) //user printData function as middleware to print populated variables

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
// app.use('/admin', restrict, adminRouter);
app.use('/admin', restrict, adminRouter);
app.use('/api/v1', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
