const express = require('express');
const router = express.Router();
const password = require('../../utils/password')
// 后台管理员登录
router.post('/login', function(req, res, next) {
  const { username, password } = req.body
  res.json({ code: 200, msg: '登录成功' })
});

module.exports = router;
