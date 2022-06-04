const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { isWhiteURL } = require('./utils/handleRouter')
const token = require('./utils/token')
const cors = require('cors');
const cors_instance = require('./utils/cors')

const authRouter = require('./routes/wx/auth/auth')
const bookRouter = require('./routes/pc/bookDetail/book')
const bookChapterRouter = require('./routes/pc/bookDetail/bookChapter')
const chapterContentRouter = require('./routes/pc/bookDetail/chapterContent')
// const bookListRouter = require('./routes/pc/bookList/bookList')
const bookTypeRouter = require('./routes/pc/bookType/bookType')
const deptRouter = require('./routes/pc/dept/dept')
const projectRouter = require('./routes/pc/project/project')
const settingRouter = require('./routes/pc/setting/setting')
const regionRouter = require('./routes/wx/region/region')
const secondProjectRouter = require('./routes/pc/secondProject/secondProject')
const studentRouter = require('./routes/wx/student/student')
const studyRouter = require('./routes/wx/study/study')
const toolRouter = require('./routes/wx/tool/tool')
const topProjectRouter = require('./routes/pc/topProject/topProject')
const userRouter = require('./routes/pc/user/user')
const websiteRouter = require('./routes/wx/website/website')


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors(cors_instance.getCorsOptions()))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  const url = req.url
  // PC端放行登录操作
  const pc_whiteList = ['/api/user/login', '/api/user/add']
  // const pc_whiteList = ['/api/user/login']
  if (pc_whiteList.includes(url)) {
    return next()
  } else {
    const t = req.headers.authorization
    const username = req.headers.username
    if (t && username) {
      try {
        if (!(await token.verify(t, username))) {
          res.json({ code: 200, msg: 'token验证失败' })
        } else {
          return next()
        }
      } catch (err) {
        const error = Object.assign({}, err, { status: 401 })
        res.status(401).json(error)
      }
    }
  }
  // 微信端放行登录操作
  const wx_whiteList = ['/auth/login', '/api/wx/website', '/api/study', 'api/tool']
  // console.log(url)
  if (isWhiteURL(wx_whiteList, url)) {
    return next()
  } else {
    const sessionKey = req.headers.authorization
    const openid = req.headers.openid
    // console.log(sessionKey)
    // console.log(openid)
    if (!(sessionKey && openid)) {
      res.json({ code: 200, msg: '您还未授权登录,请先授权登录' })
    } else {
      return next()
    }
  }
})


app.use('/auth', authRouter);
app.use('/api/book', bookRouter)
app.use('/api/bookChapter', bookChapterRouter);
app.use('/api/chapterContent', chapterContentRouter);
// app.use('/api/bookList', bookListRouter);
app.use('/api/bookType', bookTypeRouter);
app.use('/api/dept', deptRouter);
app.use('/api/project', projectRouter);
app.use('/api/region', regionRouter);
app.use('/api/secondProject', secondProjectRouter);
app.use('/api/settings', settingRouter);
app.use('/api/student', studentRouter);
app.use('/api/study', studyRouter);
app.use('/api/tool', toolRouter);
app.use('/api/topProject', topProjectRouter);
app.use('/api/user', userRouter);
app.use('/api/wx/website', websiteRouter);

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
