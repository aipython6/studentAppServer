const express = require('express');
const router = express.Router();
const bookChapterService = require('../../../models/service/bookDetail/bookChapterService')
const { handleDate } = require('../../../utils/handleDate')

router.get('/all', async (req, res) => {
  const { page, limit } = req.query
  const bookchapterService = new bookChapterService()
  const { content, total } = await bookchapterService.all({ page: Number.parseInt(page), size: Number.parseInt(limit) })
  const items = content.map(item => {
    return {
      ccid: item.ccid, blid: item.blid, name: item.name, 
      pname: item.pname, create_time: handleDate(item.create_time),
      enabled: item.enabled === 1 ? true : false,
      create_by: item.create_by
    }
  })
  res.json({ code: 200, content: items, total: total })
})

router.post('/add' ,async (req, res) => {
  const { name, enabled, blid } = req.body
  const create_by = req.headers.username
  const bookchapterService = new bookChapterService()
  const insert_item = {
    name: name, enabled: enabled === true ? 1 : 0, create_time: handleDate(new Date()),
    update_time: handleDate(new Date()), create_by: create_by, blid: blid
  }
  const result = await bookchapterService.add(insert_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '添加成功' })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})

router.put('/edit', async (req, res) => {
  const { ccid, name, enabled, blid } = req.body
  const bookchapterService = new bookChapterService()
  const create_by = req.headers.username
  const update_item = {
    blid: blid, ccid: ccid, name: name, enabled: enabled === true ? 1 : 0,
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
  const { bcid } = req.query
  console.log(req.query)
  const bookchapterService = new bookChapterService()
  const result = await bookchapterService.del(bcid)
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