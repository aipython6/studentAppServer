const express = require('express');
const router = express.Router();
const noticeService = require('../../../../models/service/settings/wechat/noticeService')
const { handleDate } = require('../../../../utils/handleDate')


router.get('/all', async (req, res, next) => {
  const { limit, page } = req.query
  const ns = new noticeService()
  const { content, total } = await ns.all({ page: Number.parseInt(page), size: Number.parseInt(limit) })
  const items = content.map(item => {
    return {
      nid: item.nid, content: item.content, create_time: handleDate(item.create_time),
      enabled: item.enabled === 1 ? true : false, typeName: item.type === 0 ? '滚动内容' : '系统通知', type: item.type, create_by: item.create_by
    }
  })
  res.json({ code: 200, content: items, total: total })
});

router.post('/add', async (req, res) => {
  const { content, type, enabled } = req.body
  const create_by = req.headers.username
  const ns = new noticeService()
  const insert_item = {
    content: content, type: type, enabled: enabled === true ? 1 : 0,
    create_by: create_by, create_time: handleDate(new Date())
  }
  const result = await ns.add(insert_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '添加成功' })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})


router.put('/edit', async (req, res) => {
  const { nid, content, type, enabled } = req.body
  const ns = new noticeService()
  const create_by = req.headers.username
  const update_item = {
    nid: nid, content: content, enabled: enabled === true ? 1 : 0,
    update_time: handleDate(new Date()), create_by: create_by, type: type
  }
  const result = await ns.edit(update_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '更新成功' })
  } else {
    res.json({ code: 200, msg: '更新失败'})
  }
})

router.delete('/del', async (req, res) => {
  const { nid } = req.query
  const ns = new noticeService()
  const result = await ns.del(nid)
  if (result.affectedRows > 0) {
    const r = await delFileNameByURL(url, 'linkCoverImg')
    res.json({ code: 200, msg: '删除成功' })
  } else {
    res.json({ code: 200, msg: '删除失败'})
  }
})

module.exports = router;