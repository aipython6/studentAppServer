const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./routes/auth/auth')
const bookRouter = require('./routes/book/book')
const projectRouter = require('./routes/project/project')
const settingRouter = require('./routes/setting/setting')
const regionRouter = require('./routes/region/region')
const studentRouter = require('./routes/student/student')
const studyRouter = require('./routes/study/study')
const toolRouter = require('./routes/tool/tool')
const userRouter = require('./routes/user/user')
const websiteRouter = require('./routes/website/website')


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/api/book', bookRouter);
app.use('/api/project', projectRouter);
app.use('/api/region', regionRouter);
app.use('/api/setting', settingRouter);
app.use('/api/student', studentRouter);
app.use('/api/study', studyRouter);
app.use('/api/tool', toolRouter);
app.use('/api/user', userRouter);
app.use('/api/website', websiteRouter);

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
