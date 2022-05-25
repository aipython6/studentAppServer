const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const URL = require('../../../utils/url')
const bookService = require('../../../models/service/bookDetail/bookService')
const { handleDate } = require('../../../utils/handleDate')

// 处理课本信息的所有路由
const upload = require('../../../utils/postFile')
const uploadObj = upload.postCoverImg()
// 1.课本封面上传
router.post('/upload', uploadObj.array('file'), async (req, res) => {
  const uploadUrl = URL.coverImgUpload
  const downloadUrl = URL.coverImgDownload
  const files = req.files
  const temp = files.map(e => {
    const uuid = uuidv4()
    const basename = path.basename(e.path)
    const suffix = path.basename(e.path)
    const newname = uuid + suffix
    fs.rename(uploadUrl + basename, uploadUrl + newname, err => {})
    return { url: downloadUrl + newname }
  })
  res.json({ code: 200, content: temp[0], msg: '上传成功' })
})
// 2.获取
router.get('/all', async (req, res) => {
  const { page, size } = req.query
  const params = { page: page, size: size }
  const bookservice = new bookService()
  const { content, total } = await bookservice.all(params)
  items = content.map(item => {
    return {
      bid: item.bid, btid: item.btid, name: item.name, pname: item.pname,
      create_time: handleDate(item.create_time), enabled: item.enabled === 1 ? true : false,
      create_by: item.create_by, type: item.type, publishedName: item.publishedName,
      ISBN: item.ISBN, author: item.author, coverImg: item.coverImg, clickNum: item.clickNum
    }
  })
  res.json({ code: 200, content: items, total: total })
})

// 3.添加
router.post('/add', async (req, res) => {
  const { name, enabled, btid, ISBN, coverImg, publishedName, author } = req.body
  const create_by = req.headers.username
  const bookservice = new bookService()
  const insert_item = {
    name: name, enabled: enabled === true ? 1 : 0, create_time: handleDate(new Date()),
    update_time: handleDate(new Date()), create_by: create_by, author: author,
    btid: btid, ISBN: ISBN, coverImg: coverImg, publishedName: publishedName, clickNum: 0, type: 0
  }
  const result = await bookservice.add(insert_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '添加成功' })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})

// 4.编辑
router.put('/edit', async (req, res) => {
  const { bid, name, enabled, btid, ISBN, publishedName, author, coverImg } = req.body
  const bookservice = new bookService()
  const create_by = req.headers.username
  const update_item = {
    btid: btid, bid: bid, name: name, enabled: enabled === true ? 1 : 0,
    update_time: handleDate(new Date()), create_by: create_by, ISBN: ISBN,
    publishedName: publishedName, author: author, coverImg: coverImg
  }
  const result = await bookservice.edit(update_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '更新成功' })
  } else {
    res.json({ code: 200, msg: '更新失败'})
  }
})

// 5.删除
router.delete('/del', async (req, res) => {
  const { bid } = req.query
  const bookservice = new bookService()
  const result = await bookservice.del(bid)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '删除成功' })
  } else {
    res.json({ code: 200, msg: '删除失败'})
  }
})

module.exports = router