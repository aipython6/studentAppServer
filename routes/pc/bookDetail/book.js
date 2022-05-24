const express = require('express');
const router = express.Router();
const bookService = require('../../../models/service/bookDetail/bookService')
const { handleDate } = require('../../../utils/handleDate')

router.get('/all', async (req, res) => {
  const { type, page, size } = req.query
  const params = { type: type, page: page, size: size }
  const bookservice = new bookService()
  const { content, total } = await bookservice.all(params)
  const items = []
  switch (type) {
    case 0:
      items = content.map(item => {
        return {
          bid: item.bcid, btid: item.btid, name: item.name, pname: item.pname,
          create_time: handleDate(item.create_time),
          enabled: item.enabled === 1 ? true : false, create_by: item.create_by
        }
      })
      break
    case 1:
      items = content.map(item => {
        return {
          bcid: item.bcid, ccid: item.ccid, name: item.name,
          cname: item.pname, bname: item.bname, create_time: handleDate(item.create_time),
          enabled: item.enabled === 1 ? true : false, create_by: item.create_by
        }
      })
      break
    case 2:
      items = content.map(item => {
        return {
          bcid: item.bcid, ccid: item.ccid, name: item.name,
          cname: item.pname, bname: item.bname, create_time: handleDate(item.create_time),
          enabled: item.enabled === 1 ? true : false, create_by: item.create_by
        }
      })
      break
  }
  res.json({ code: 200, content: items, total: total })
})

module.exports = router