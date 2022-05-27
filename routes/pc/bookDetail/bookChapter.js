const express = require('express');
const router = express.Router();
const bookChapterService = require('../../../models/service/bookDetail/bookChapterService')
const chapterContentService = require('../../../models/service/bookDetail/chapterContentService')
const { handleDate } = require('../../../utils/handleDate')
const { handleChapter, getAllbids } = require('../../../utils/handleChapter')

router.get('/all', async (req, res) => {
  // const { page, limit } = req.query
  const bcs = new bookChapterService()
  const { content } = await bcs.all()
  const items = handleChapter(content)
  res.json({ code: 200, content: items })
})

router.get('/getNameBybid', async (req, res) => {
  const { bid } = req.query
  const bcs = new bookChapterService()
  const { pname } = await bcs.getNameBybid(bid)
  res.json({ code: 200, pname: pname })
})

router.post('/add' ,async (req, res) => {
  const { name, enabled, pid, type } = req.body
  const create_by = req.headers.username
  const bcs = new bookChapterService()
  const insert_item = {
    name: name, enabled: enabled === true ? 1 : 0, create_time: handleDate(new Date()),
    update_time: handleDate(new Date()), create_by: create_by, pid: pid, type: type
  }
  const result = await bcs.add(insert_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '添加成功' })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})

router.put('/edit', async (req, res) => {
  const { bid, name, enabled } = req.body
  const bcs = new bookChapterService()
  const create_by = req.headers.username
  const update_item = {
    bid: bid, name: name, enabled: enabled === true ? 1 : 0,
    update_time: handleDate(new Date()), create_by: create_by
  }
  const result = await bcs.edit(update_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '更新成功' })
  } else {
    res.json({ code: 200, msg: '更新失败'})
  }
})

// 删除父节点时，其下所有子节点也均被删除,同时,也删除chapterContent表中对应的章节记录
router.delete('/del', async (req, res) => {
  const { bid } = req.query
  const bcs = new bookChapterService()
  const ccs = new chapterContentService()
  const { content } = await bcs.all()
  const items = content.map(item => {
    return { bid: item.bid, pid: item.pid }
  })
  // 找出所有要删除的bid
  const bids = getAllbids(Number.parseInt(bid), items)
  const result = await bcs.delBybids(bids)
  const result1 = await ccs.delBybid(bid)
  if (result.affectedRows > 0 || result1.affectedRows > 0) {
    res.json({ code: 200, msg: '删除成功' })
  } else {
    res.json({ code: 200, msg: '删除失败'})
  }
})

router.post('/blurry', async (req, res) => {
  const { name, create_time, page, limit } = req.body
  const data = { name: name, create_time, page: page, size: limit }
  const bcs = new bookChapterService()
  const { content, total } = await bcs.queryByBlur(data)
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