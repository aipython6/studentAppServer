const express = require('express');
const router = express.Router();
const http = require('http')

// 获取微信用户基本信息
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
