const express = require('express');
const router = express.Router();
const chapterChildrenService = require('../../../models/service/bookDetail/chapterChildrenService')
const { handleDate } = require('../../../utils/handleDate')

router.get('/all', async (req, res) => {
  const { page, limit } = req.query
  const chapterchildrenService = new chapterChildrenService()
  const { content, total } = await chapterchildrenService.all({ page: Number.parseInt(page), size: Number.parseInt(limit) })
  const items = content.map(item => {
    return {
      bcid: item.bcid, ccid: item.ccid, name: item.name,
      cname: item.pname, bname: item.bname, create_time: handleDate(item.create_time),
      enabled: item.enabled === 1 ? true : false, create_by: item.create_by
    }
  })
  res.json({ code: 200, content: items, total: total })
})

router.post('/add' ,async (req, res) => {
  const { name, enabled, bcid } = req.body
  const create_by = req.headers.username
  const chapterchildrenService = new chapterChildrenService()
  const insert_item = {
    name: name, enabled: enabled === true ? 1 : 0, create_time: handleDate(new Date()),
    update_time: handleDate(new Date()), create_by: create_by, bcid: bcid
  }
  const result = await chapterchildrenService.add(insert_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '添加成功' })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})

router.put('/edit', async (req, res) => {
  const { ccid, name, enabled, bcid } = req.body
  const chapterchildrenService = new chapterChildrenService()
  const create_by = req.headers.username
  const update_item = {
    ccid: ccid, bcid: bcid, name: name, enabled: enabled === true ? 1 : 0,
    update_time: handleDate(new Date()), create_by: create_by
  }
  const result = await chapterchildrenService.edit(update_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '更新成功' })
  } else {
    res.json({ code: 200, msg: '更新失败'})
  }
})

router.delete('/del', async (req, res) => {
  const { ccid } = req.query
  const chapterchildrenService = new chapterChildrenService()
  const result = await chapterchildrenService.del(ccid)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '删除成功' })
  } else {
    res.json({ code: 200, msg: '删除失败'})
  }
})

module.exports = router