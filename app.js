var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var comida = require('./routes/comida');

var app = express();

//MONGODB - BD
mongoose = require('mongoose'),
fs = require('fs');

//var mongoUri = 'mongodb://nacho:nacho@ds011258.mlab.com:11258/heroku_6g7p6vrk';
var mongoUri = 'mongodb://localhost:27017/mrschef';
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function (err) {
  throw new Error(err+' unable to connect to database at ' + mongoUri);
});
db.on('disconnected', function(ref){
  console.log("MONGO:disconnected");
});
db.on('close', function(ref){
  console.log("MONGO:close");
})
//---

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/', index);
app.use('/comida', comida);

// MODELS
require('./models/comida');
require('./models/ingrediente');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
