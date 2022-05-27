const express = require('express');
const app = express()
const imageRouter = require('../setting/wechat/image')
const linkRouter = require('../setting/wechat/link')
const noticeRouter = require('../setting/wechat/notice')
const OCRRouter = require('../setting/wechat/OCR')
const studentRouter = require('../setting/wechat/student')
// 微信管理5个tabs的路由
app.use('/wechat/image', imageRouter)
app.use('/wechat/link', linkRouter)
app.use('/wechat/notice', noticeRouter)
app.use('/wechat/OCR', OCRRouter)
app.use('/wechat/student', studentRouter)

module.exports = app;
