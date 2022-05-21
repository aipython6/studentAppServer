const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const token = require('./utils/token')

const authRouter = require('./routes/auth/auth')
const bookRouter = require('./routes/book/book')
const deptRouter = require('./routes/dept/dept')
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

app.use(async (req, res, next) => {
  const url = req.url
  // PC端放行登录操作
  const pc_whiteList = ['/api/user/login']
  if (pc_whiteList.includes(url)) {
    return next()
  } else {
    const t = req.headers.authorization
    const username = req.headers.username
    if (t && username) {
      if (!(await token.verify(t, username))) {
        res.json({ code: statusCode.tokenVerifyError, msg: 'token验证失败' })
      } else {
        return next()
      }
    }
  }
  // 微信端放行登录操作
  const wx_whiteList = ['/auth/login']
  if (wx_whiteList.includes(url)) {
    return next()
  } else {
    const sessionKey = req.headers.authorization
    const openid = req.headers.openid
    if (!(sessionKey && openid)) {
      res.json({ code: 200, msg: '您还未授权登录,请先授权登录' })
    } else {
      return next()
    }
  }
})


app.use('/auth', authRouter);
app.use('/api/book', bookRouter);
app.use('/api/dept', deptRouter);
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
