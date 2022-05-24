const express = require('express');
const router = express.Router();
const secondProjectService = require('../../../models/service/secondProjectService')
const { handleDate } = require('../../../utils/handleDate')

router.get('/all', async (req, res) => {
  const { page, limit } = req.query
  const secondprojectService = new secondProjectService()
  const { content, total } = await secondprojectService.all({ page: Number.parseInt(page), size: Number.parseInt(limit) })
  const items = content.map(item => {
    return {
      sid: item.sid, tid: item.tid, name: item.name, pname: item.pname,
      create_time: item.create_time, enabled: item.enabled === 1 ? true : false,
      create_by: item.create_by, bgColor: item.bgColor
    }
  })
  res.json({ code: 200, content: items, total: total })
})

router.post('/add', async (req, res) => {
  const { name, enabled, tid, bgColor } = req.body
  const create_by = req.headers.username
  const secondprojectService = new secondProjectService()
  const insert_item = {
    name: name, enabled: enabled === true ? 1 : 0, create_time: handleDate(new Date()),
    update_time: handleDate(new Date()), create_by: create_by,
    tid: tid, bgColor: bgColor
  }
  const result = await secondprojectService.add(insert_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '添加成功' })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})

router.put('/edit', async (req, res) => {
  const { sid, name, enabled, tid, bgColor } = req.body
  const secondprojectService = new secondProjectService()
  const create_by = req.headers.username
  const update_item = {
    sid: sid, tid: tid, name: name, enabled: enabled === true ? 1 : 0,
    update_time: handleDate(new Date()), create_by: create_by, bgColor: bgColor
  }
  const result = await secondprojectService.edit(update_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '更新成功' })
  } else {
    res.json({ code: 200, msg: '更新失败'})
  }
})

router.delete('/del', async (req, res) => {
  const { sid } = req.query
  const secondprojectService = new secondProjectService()
  const result = await secondprojectService.del(sid)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '删除成功' })
  } else {
    res.json({ code: 200, msg: '删除失败'})
  }
})

router.post('/blurry', async (req, res) => {
  const { name, create_time, page, limit } = req.body
  const data = { name: name, create_time, page: page, size: limit }
  const secondprojectService = new secondProjectService()
  const { content, total } = await secondprojectService.queryByBlur(data)
  const items = content.map(item => {
    return {
      tid: item.tid, sid: item.sid, name: item.name, pname: item.pname, create_time: item.create_time, enabled: item.enabled === 1 ? true : false, create_by: item.create_by, bgColor: item.bgColor
    }
  })
  res.json({ code: 200, content: items, total: total })
})

module.exports = router