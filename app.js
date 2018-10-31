var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var regRouter = require('./routes/reg');
var loginRouter = require('./routes/login');
var studentsRouter = require('./routes/students');
var movieRouter = require('./routes/movie');
var trademanageRouter = require('./routes/trademanage');
var servicesRouter = require('./routes/services');
var ordersRouter = require('./routes/orders');
var backStoresRouter = require('./routes/backStores');
var backUsersRouter = require('./routes/backUsers');
var petsKeepersRouter = require('./routes/petsKeepers');
var suppliersRouter = require('./routes/suppliers');
var lcRouter = require('./routes/lcRouter');
const session = require('express-session'); //新增express-session
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//新增express-session
app.use(session({
  secret:"lovo",  //加密字符串
  resave:true,   // 是否强制保存session
  saveUninitialized:true,
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reg', regRouter);
app.use('/login', loginRouter);
app.use('/students', studentsRouter);
app.use('/movie', movieRouter);
app.use('/lcRouter', lcRouter);
app.use('/services', servicesRouter);
app.use('/orders', ordersRouter);
app.use('/trademanage', trademanageRouter);
app.use('/backStores', backStoresRouter);
app.use('/backUsers', backUsersRouter);
app.use('/petsKeepers', petsKeepersRouter);
app.use('/suppliers', suppliersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
