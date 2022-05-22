const express = require('express');
const router = express.Router();
const { handleDate } = require('../../utils/handleDate')
const pass = require('../../utils/password')
const userService = require('../../models/service/userService')
const token = require('../../utils/token')
const URL = require('../../utils/url')
// 后台管理员登录
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  const userservice = new userService()
  const user = await userservice.findUserByUsername({ username: username })
  if (user.length > 0) {
    if (await pass.passDecode(user[0].password, password)) {
      const t = token.sign(username)
      await userservice.addToken({ token: t, username: username, create_time: handleDate(new Date()) })
      res.json({ code: 200,  token: t, username: username, msg: '登录成功' })
    } else {
      res.json({ code: 200, msg: '密码错误,请重新登录' })
    }
  } else {
    res.json({ code: 200, msg: '登陆失败,该用户不存在' })
  }
})

router.get('/info', async (req, res) => {
  const { username } = req.query
  const userservice = new userService()
  const user = await userservice.findUserByUsername({ username: username })
  if (user.length === 1) {
    const content = user.map(e => {
      return {
        uid: e.uid, username: e.username, email: e.email,
        avatar: e.avatar, gender: e.gender, role: e.role
      }
    })
    
    res.json({ code: 200, content: content[0] })
  } else {
    res.json({ code: 200, msg: '获取用户信息失败'})
  }
})

// 用户退出登录
router.post('/logout', async (req, res) => {
  res.json({ code: 200, msg: '已退出' })
})

// 添加用户
router.post('/add', async (req, res) => {
  const { username, password, email, deptid, gender, role } = req.body
  const userservice = new userService()
  const user = await userservice.findUserByUsername({ username: username })
  // 用户名不能相同
  if (user.length === 0) {
    const passEncode = await pass.passEncode(password)
    const insert = {
      username: username, password: passEncode,
      deptid: deptid, gender: gender, email: email,
      enabled: 1, create_time: handleDate(new Date()),
      avatar: URL.avatarDefaultUrl, loginNum: 0, role: role
    }
    const result = await userservice.add(insert)
    if (result.affectedRows > 0) {
      res.json({ code: 200, msg: '添加成功' })
    } else {
      res.json({ code: 200, msg: '程序错误,添加失败' })
    }
  } else {
    res.json({ code: 200, msg: '添加失败,要添加的用户已经存在,请重新添加' })
  }
})

module.exports = router;
