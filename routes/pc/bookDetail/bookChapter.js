const express = require('express');
const router = express.Router();
const bookChapterService = require('../../../models/service/bookDetail/bookChapterService')
const { handleDate } = require('../../../utils/handleDate')
const { handleChapter } = require('../../../utils/handleChapter')

router.get('/all', async (req, res) => {
  // const { page, limit } = req.query
  const bookchapterService = new bookChapterService()
  const { content } = await bookchapterService.all()
  const items = handleChapter(content)
  res.json({ code: 200, content: items })
})

router.get('/getNameBybid', async (req, res) => {
  const { bid } = req.query
  const bookchapterService = new bookChapterService()
  const { pname } = await bookchapterService.getNameBybid(bid)
  res.json({ code: 200, pname: pname })
})

router.post('/add' ,async (req, res) => {
  const { name, enabled, pid, type } = req.body
  const create_by = req.headers.username
  const bookchapterService = new bookChapterService()
  const insert_item = {
    name: name, enabled: enabled === true ? 1 : 0, create_time: handleDate(new Date()),
    update_time: handleDate(new Date()), create_by: create_by, pid: pid, type: type
  }
  const result = await bookchapterService.add(insert_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '添加成功' })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})

router.put('/edit', async (req, res) => {
  const { bid, name, enabled } = req.body
  const bookchapterService = new bookChapterService()
  const create_by = req.headers.username
  const update_item = {
    bid: bid, name: name, enabled: enabled === true ? 1 : 0,
    update_time: handleDate(new Date()), create_by: create_by
  }
  const result = await bookchapterService.edit(update_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '更新成功' })
  } else {
    res.json({ code: 200, msg: '更新失败'})
  }
})

router.delete('/del', async (req, res) => {
  const { bid } = req.query
  const bookchapterService = new bookChapterService()
  const result = await bookchapterService.del(bid)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '删除成功' })
  } else {
    res.json({ code: 200, msg: '删除失败'})
  }
})

router.post('/blurry', async (req, res) => {
  const { name, create_time, page, limit } = req.body
  const data = { name: name, create_time, page: page, size: limit }
  const bookchapterService = new bookChapterService()
  const { content, total } = await bookchapterService.queryByBlur(data)
  const items = content.map(item => {
    return {
      ccid: item.ccid, blid: item.blid, name: item.name, 
      pname: item.pname, create_time: item.create_time,
      enabled: item.enabled === 1 ? true : false,
      create_by: item.create_by
    }
  })
  res.json({ code: 200, content: items, total: total })
})

module.exports = router