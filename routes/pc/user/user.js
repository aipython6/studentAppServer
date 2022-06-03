const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { handleDate } = require('../../../utils/handleDate')
const pass = require('../../../utils/password')
const userService = require('../../../models/service/userService')
const token = require('../../../utils/token')
const URL = require('../../../utils/url')
const upload = require('../../../utils/postFile');
const uploadObj = upload.postAvatar()

router.get('/roles', async (req, res) => {
  const userservice = new userService()
  const { content } = await userservice.getRoles()
  const items = content.map(item => {
    return {
      rid: item.rid, name: item.name
    }
  })
  res.json({ code: 200, content: items })
})

// 后台管理员登录
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  // console.log(req.body)
  const userservice = new userService()
  const user = await userservice.findUserByUsername({ username: username })
  if (user.length > 0) {
    if (await pass.passDecode(user[0].password, password)) {
      const t = token.sign(username)
      await userservice.addToken({ token: t, username: username, create_time: handleDate(new Date()) })
      res.json({ code: 200,  token: t, username: username })
    } else {
      res.json({ code: 201, msg: '密码错误,请重新输入' })
    }
  } else {
    res.json({ code: 202, msg: '该用户不存在,登陆失败' })
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
        avatar: e.avatar, gender: e.gender, role: e.role, create_time: handleDate(e.create_time)
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
  const { username, email, deptid, gender, role } = req.body
  // 默认密码
  const password = '123456'
  const userservice = new userService()
  const { roleName } = await userservice.getRoleNameByid(role)
  const user = await userservice.findUserByUsername({ username: username })
  // 用户名不能相同
  if (user.length === 0) {
    const passEncode = await pass.passEncode(password)
    const insert = {
      username: username, password: passEncode,
      deptid: deptid, gender: gender, email: email,
      enabled: 1, create_time: handleDate(new Date()),
      avatar: URL.avatarDefaultUrl, loginNum: 0, role: roleName
    }
    const result = await userservice.add(insert)
    if (result.affectedRows > 0) {
      res.json({ code: 200, msg: '添加成功,初始密码为123456' })
    } else {
      res.json({ code: 200, msg: '程序错误,添加失败' })
    }
  } else {
    res.json({ code: 201, msg: '添加失败,要添加的用户已经存在,请重新添加' })
  }
})

router.get('/all', async (req, res) => {
  const { page, limit } = req.query
  const params = { page: Number.parseInt(page), size: Number.parseInt(limit) }
  const userservice = new userService()
  const { content, total } = await userservice.all(params)
  const items = content.map(item => {
    return {
      uid: item.uid, username: item.username, email: item.email, create_time: handleDate(item.create_time),
      enabled: item.enabled === 1 ? true: false, role: item.role, deptname: item.deptname,
      gender: item.gender
    } 
  })
  res.json({ code: 200, content: items, total: total })
})

router.put('/edit', async (req, res) => {
  const { deptid, username, enabled, uid, role, gender } = req.body
  const userservice = new userService()
  const update_item = {
    uid: Number.parseInt(uid), deptid: Number.parseInt(deptid), username: username,
    enabled: enabled === true ? 1 : 0,
    update_time: handleDate(new Date()), role: role, gender:gender
  }
  const result = await userservice.edit(update_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '更新成功' })
  } else {
    res.json({ code: 200, msg: '更新失败'})
  }
})

router.delete('/del', async (req, res) => {
  const { uid } = req.query
  const userservice = new userService()
  const result = await userservice.del(Number.parseInt(uid))
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '删除成功' })
  } else {
    res.json({ code: 200, msg: '删除失败'})
  }
})

// 用户个人信息更新的相关路由
// 1.头像上传
router.post('/upload', uploadObj.array('img'), async (req, res) => {
  const userservice = new userService()
  const username = req.headers.username
  const uploadUrl = URL.avatarUpload
  const downloadUrl = URL.avataDownload
  const files = req.files
  const temp = files.map(e => {
    const uuid = uuidv4()
    const basename = path.basename(e.path)
    const suffix = path.basename(e.path)
    const newname = uuid + suffix
    fs.rename(uploadUrl + basename, uploadUrl + newname, err => {})
    return { url: downloadUrl + newname }
  })
  const url = temp[0].url
  const result = await userservice.updateAvatar({ url: url, username: username })
  if (result.affectedRows > 0) {
    res.json({ code: 200, content: temp[0], msg: '上传成功' })
  } else {
    res.json({ code: 200, msg: '上传失败'})
  }
})

// 2.更新密码
router.post('/updatePass', async (req, res) => {
  const userservice = new userService()
  const { oldPass, newPass } = req.body
  const username = req.headers.username
  const passEncode = await pass.passEncode(newPass)
  const { content } = await userservice.all({ page: 1, size: 9999 })
  const user = content.filter(item => item.username === username)
  if (await pass.passDecode(user[0].password, oldPass)) {
    const result = await userservice.updatePass({ password: passEncode, username: username })
    if (result.affectedRows > 0) {
      res.json({ code: 200, msg: '密码更新成功' })
    } else {
      res.json({ code: 200, msg: '密码更新失败' })
    }
  } else {
    res.json({ code: 201, msg: '原始密码错误'})
  }
})

// 根据用户名搜索
router.post('/blurry', async (req, res) => {
  const { name, page, limit } = req.body
  const userservice = new userService()
  const { content, total } = await userservice.all({ name: name, page: page, size: limit })
  const items = content.map(item => {
    return {
      uid: item.uid, username: item.username, email: item.email, create_time: handleDate(item.create_time),
      enabled: item.enabled === 1 ? true: false, role: item.role, deptname: item.deptname,
      gender: item.gender
    } 
  })
  res.json({ code: 200, content: items, total: total })
})

module.exports = router;
