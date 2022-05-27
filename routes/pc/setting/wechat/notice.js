const express = require('express');
const router = express.Router();
const studentService = require('../../../../models/service/settings/wechat/studentService')

router.get('/all', async (req, res, next) => {
  const { limit, page } = req.query
  const ns = new studentService()
  const { content, total } = await ns.all({ page: Number.parseInt(page), size: Number.parseInt(limit) })
  const items = content.map(item => {
    return {
      sid: item.sid, username: item.username, age: item.age, nickName: item.nickName, gender: item.gender,
      email: item.email, school: item.school, avatarUrl: item.avatarUrl, create_time: handleDate(item.create_time)
    }
  })
  res.json({ code: 200, content: items, total: total })
});

module.exports = router;