const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors= require("cors");
const bodyParser = require('body-parser');
dotenv.config();
//create mongoose connection (connect to DB)
const mongoose = require('mongoose');
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/**
 * middleware function are function executed after a routes getting hitting
 * eg. app.use('/post',(req,res,next) =>{
 *     console.warn(`This is the middleware is running `)
 * })
 */
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routers
app.use('/',indexRouter);
app.use('/users', usersRouter);


//check for db error and once its connected
// const db = mongoose.connection
// db.on('error',(error) => console.error(error))
// db.once('open',() => console.log('database connected successfully!!'))

/*
* or use
 *
 */

mongoose.connect(process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(()=>{
      console.log('database connected successfully!!!!');
    })
    .catch((e)=>{
      console.log("Something went wrong", e);
    })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
