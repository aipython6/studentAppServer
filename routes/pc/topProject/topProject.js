const express = require('express');
const router = express.Router();
const topProjectService = require('../../../models/service/topProjectService')
const { handleDate } = require('../../../utils/handleDate')

router.get('/all', async (req, res) => {
  const { page, limit } = req.query
  const topprojectservice = new topProjectService()
  const { content, total } = await topprojectservice.all({ page: Number.parseInt(page), size: Number.parseInt(limit) })
  const items = content.map(item => {
    return {
      tid: item.tid, name: item.name, create_time: item.create_time, enabled: item.enabled === 1 ? true : false, create_by: item.create_by
    }
  })
  res.json({ code: 200, content: items, total: total })
})

router.post('/add', async (req, res) => {
  const { name, enabled } = req.body
  const create_by = req.headers.username
  const topprojectservice = new topProjectService()
  const insert_item = { name: name, enabled: enabled === true ? 1 : 0, create_time: handleDate(new Date()), update_time: handleDate(new Date()), create_by: create_by }
  const result = await topprojectservice.add(insert_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '添加成功' })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})

router.put('/edit', async (req, res) => {
  const { tid, name, enabled } = req.body
  const topprojectservice = new topProjectService()
  const create_by = req.headers.username
  const update_item = { tid: tid, name: name, enabled: enabled === true ? 1 : 0, update_time: handleDate(new Date()), create_by: create_by }
  const result = await topprojectservice.edit(update_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '更新成功' })
  } else {
    res.json({ code: 200, msg: '更新失败'})
  }
})

router.delete('/del', async (req, res) => {
  const { tid } = req.query
  const topprojectservice = new topProjectService()
  const result = await topprojectservice.del(tid)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '删除成功' })
  } else {
    res.json({ code: 200, msg: '删除失败'})
  }
})

router.post('/blurry', async (req, res) => {
  const { name, create_time, page, limit } = req.body
  const data = { name: name, start: create_time[0], end: create_time[1], page: page, limit: limit }
  const topprojectservice = new topProjectService()
  const { content, total } = await topprojectservice.queryByBlur(data)
  const items = content.map(item => {
    return {
      tid: item.tid, name: item.name, create_time: item.create_time, enabled: item.enabled === 1 ? true : false, create_by: item.create_by
    }
  })
  res.json({ code: 200, content: items, total: total })
})

module.exports = router;