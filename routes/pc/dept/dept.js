const express = require('express');
const router = express.Router();
const { handleDate } = require('../../../utils/handleDate')
const pass = require('../../../utils/password')
const deptService = require('../../../models/service/deptService')

router.get('/all', async (req, res) => {
  const deptservice = new deptService()
  const depts = await deptservice.all()
  const content = depts.map(e => {
    return {
      id: e.id, deptname: e.deptname, create_tiem: e.create_tiem, enabled: e.enabled === 1 ? true : false
    }
  })
  res.json({ code: 200, content: content })
})

router.get('/get/:id', async (req, res) => {
  const { id } = req.params
  const deptservice = new deptService()
  const dept = await deptservice.get(id)
  const content = dept.map(e => {
    return {
      id: e.id, deptname: e.deptname, create_time: e.create_time, enabled: e.enabled === 1 ? true : false
    }
  })
  res.json({ code: 200, content: content })
})

router.post('/add', async (req, res) => {
  const { deptname, enabled } = req.body
  const deptservice = new deptService()
  const insert = {
    deptname: deptname, create_time: handleDate(new Date()), enabled: enabled, update_time: handleDate(new Date())
  }
  const result = await deptservice.add(insert)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '添加成功' })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})

router.put('/edit', async (req, res) => {
  const { id, deptname, enabled } = req.body
  const update = { id: id, deptname: deptname, enabled: enabled, update_time: handleDate(new Date()) }
  const deptservice = new deptService()
  const result = await deptservice.edit(update)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '添加成功' })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})

router.delete('/del', async (req, res) => {
  const { id } = req.body
  const deptservice = new deptService()
  const result = await deptservice.del(id)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '添加成功' })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})


module.exports = router