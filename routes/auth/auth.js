const express = require('express');
const router = express.Router();
const http = require('http')
const getOpenId = require('../../utils/getOpenId')
const authService = require('../../models/service/authService')
// 获取微信用户的openid
router.post('/login', async (req, res, next) => {
  const authservice = new authService()
  const { nickName, code, avatarUrl } = req.body
  const result = await getOpenId(code)
  const insert_item = { nickName: nickName, openid: result.openid, avatarUrl: avatarUrl}
  const r = await authservice.add(insert_item)
  const content = { openid: result.openid, sessionKey: result.sessionKey }
  res.json({ code: 200, msg: '授权成功', content:content })
});

module.exports = router;
