const express = require('express');
const router = express.Router();
const getOpenId = require('../../utils/getOpenId')
const { handleDate }  = require('../../utils/handleDate')
const authService = require('../../models/service/authService')
// 获取微信用户的openid
router.post('/login', async (req, res, next) => {
  const authservice = new authService()
  const { nickName, code, avatarUrl } = req.body
  const result = await getOpenId(code)
  const { isAuth } = await authservice.queryStudentByOpenid({ openid: result.openid })
  // 初次授权
  if (!isAuth) {
    const insert_item = { nickName: nickName, openid: result.openid, avatarUrl: avatarUrl, create_time: handleDate(new Date()) }
    await authservice.add(insert_item)
  }
  // flag: 表示用户访问后端接口时,第一次请求状态是登录,则进行标记,作用是首次登录后,只获取一次个人信息,后面的登录都不再获取个人信息了
  const content = { openid: result.openid, sessionKey: result.sessionKey, flag: 'isLogin' }
  res.json({ code: 200, msg: '授权成功', content: content })
});

// 根据openid获取userinfo
router.get('/getinfo', async (req, res, next) => {
  const { openid } = req.query
  const authservice = new authService()
  const { student } = await authservice.queryStudentByOpenid({ openid: openid })
  res.json({ code: 200, content: student[0] })
})

module.exports = router;
