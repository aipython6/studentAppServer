const express = require('express');
const router = express.Router();
const getOpenId = require('../../../utils/getOpenId')
const { handleDate }  = require('../../../utils/handleDate')
const authService = require('../../../models/service/authService')
const studentService = require('../../../models/service/studentService')
const exerciseService = require('../../../models/service/exerciseService')
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

router.put('/editUserinfo', async (req, res) => {
  const { openid, username, age, gender, birthday, school, professional, email } = req.body
  const authservice = new authService()
  const update_item = {
    openid: openid, username: username, age: age,
    gender: gender, birthday: birthday, school: school,
    professional: professional, email: email, update_time: handleDate(new Date())
  }
  const result = await authservice.editUserinfo(update_item)
  if (result) {
    res.json({ code: 200, msg: '更新信息成功' })
  } else {
    res.json({ code: 200, msg: '更新信息失败' })
  }
})

// 注销账户
router.post('/logout', async (req, res) => {
  const { openid } = req.body
  const as = new authService()
  const ss = new studentService()
  const es = new exerciseService()
  const res1 = await as.deleteUserinfoByopenid({ openid: openid })
  const res2 = await ss.deleteStudyRecordByopenid({ openid: openid })
  const res3 = await ss.deleteCollectRecordByopenid({ openid: openid })
  const res4 = await es.deleteExerciseRecordByOpenid({ openid: openid })
  if (res1.affectedRows > 0) {
    res.json({ code: 200, msg: '你的账户已经注销' })
  }
})

module.exports = router;
