var express = require('express');

var comentarioRouter = require('./routes/comentario');
var postRouter = require('./routes/post');
var indexRouter = require('./routes/index')

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', postRouter);
app.use('/', comentarioRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err.status)
});

module.exports = app;
