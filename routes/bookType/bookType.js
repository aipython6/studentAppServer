const express = require('express');
const router = express.Router();
const bookTypeService = require('../../models/service/bookTypeService')
const { handleDate } = require('../../utils/handleDate')

router.get('/all', async (req, res) => {
  const { page, limit } = req.query
  const booktypeService = new bookTypeService()
  const { content, total } = await booktypeService.all({ page: Number.parseInt(page), size: Number.parseInt(limit) })
  const items = content.map(item => {
    return {
      btid: item.btid, sid: item.sid, name: item.name, pname: item.pname,
      create_time: handleDate(item.create_time), enabled: item.enabled === 1 ? true : false,
      create_by: item.create_by, bgColor: item.bgColor
    }
  })
  res.json({ code: 200, content: items, total: total })
})

router.post('/add', async (req, res) => {
  const { name ,enabled, sid, bgColor } = req.body
  const create_by = req.headers.username
  const booktypeService = new bookTypeService()
  const insert_item = {
    name: name, enabled: enabled === true ? 1 : 0, create_time: handleDate(new Date()),
    update_time: handleDate(new Date()), create_by: create_by,
    sid: sid, bgColor: bgColor
  }
  const result = await booktypeService.add(insert_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '添加成功' })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})

router.put('/edit', async (req, res) => {
  const { btid, name, enabled, sid, bgColor } = req.body
  const booktypeService = new bookTypeService()
  const create_by = req.headers.username
  const update_item = {
    sid: sid, btid: btid, name: name, enabled: enabled === true ? 1 : 0,
    update_time: handleDate(new Date()), create_by: create_by, bgColor: bgColor
  }
  const result = await booktypeService.edit(update_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '更新成功' })
  } else {
    res.json({ code: 200, msg: '更新失败'})
  }
})

router.delete('/del', async (req, res) => {
  const { btid } = req.query
  const booktypeService = new bookTypeService()
  const result = await booktypeService.del(btid)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '删除成功' })
  } else {
    res.json({ code: 200, msg: '删除失败'})
  }
})

router.post('/blurry', async (req, res) => {
  const { name, create_time, page, limit } = req.body
  const data = { name: name, create_time, page: page, size: limit }
  const booktypeService = new bookTypeService()
  const { content, total } = await booktypeService.queryByBlur(data)
  const items = content.map(item => {
    return {
      btid: item.btid, tid: item.tid,name: item.name, pname: item.pname, create_time: item.create_time, enabled: item.enabled === 1 ? true : false, create_by: item.create_by, bgColor: item.bgColor
    }
  })
  res.json({ code: 200, content: items, total: total })
})

module.exports = router