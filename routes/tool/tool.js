const express = require('express');
const router = express.Router();
const http = require('http')

// 其他一些工具路由：入获取菜单图片、轮播图片、文件等
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
