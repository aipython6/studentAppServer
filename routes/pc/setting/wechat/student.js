const express = require('express');
const router = express.Router();
const studentService = require('../../../../models/service/settings/wechat/studentService')
const { handleDate } = require('../../../../utils/handleDate')

router.get('/all', async (req, res, next) => {
  const { limit, page } = req.query
  const ss = new studentService()
  const { content, total } = await ss.all({ page: Number.parseInt(page), size: Number.parseInt(limit) })
  const items = content.map(item => {
    return {
      sid: item.sid, username: item.username, create_time: handleDate(item.create_time), age: item.age,
      nickName: item.nickName, gender: item.gender, email: item.email, professional: item.professional,
      school: item.school,birthday: item.birthday
    }
  })
  res.json({ code: 200, content: items, total: total })
});

module.exports = router;