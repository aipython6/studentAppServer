const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const bookListService = require('../../../models/service/bookListService')
const { handleDate } = require('../../../utils/handleDate')
const { delFileNameByURL } = require('../../../utils/handleFile')
const URL = require('../../../utils/url')

const upload = require('../../../utils/postFile')
const uploadObj = upload.postCoverImg()
// 课本封面上传
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

router.get('/all', async (req, res) => {
  const { page, limit } = req.query
  const booklistService = new bookListService()
  const { content, total } = await booklistService.all({ page: Number.parseInt(page), size: Number.parseInt(limit) })
  const items = content.map(item => {
    return {
      btid: item.btid, blid: item.blid, name: item.name, 
      author: item.author, publishedName: item.publishedName, ISBN: item.ISBN,
      coverImg: item.coverImg, clickNum: item.clickNum,
      pname: item.pname, create_time: handleDate(item.create_time),
      enabled: item.enabled === 1 ? true : false,
      create_by: item.create_by
    }
  })
  res.json({ code: 200, content: items, total: total })
})

router.post('/add', async (req, res) => {
  const { name, enabled, btid, ISBN, coverImg, publishedName, author } = req.body
  const create_by = req.headers.username
  const booklistService = new bookListService()
  const insert_item = {
    name: name, enabled: enabled === true ? 1 : 0, create_time: handleDate(new Date()),
    update_time: handleDate(new Date()), create_by: create_by, author: author,
    btid: btid, ISBN: ISBN, coverImg: coverImg, publishedName: publishedName, clickNum: 0
  }
  const result = await booklistService.add(insert_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '添加成功' })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})

router.put('/edit', async (req, res) => {
  const { btid, name, enabled, blid, ISBN, publishedName, author, coverImg } = req.body
  const booklistService = new bookListService()
  const create_by = req.headers.username
  const update_item = {
    blid: blid, btid: btid, name: name, enabled: enabled === true ? 1 : 0,
    update_time: handleDate(new Date()), create_by: create_by, ISBN: ISBN,
    publishedName: publishedName, author: author, coverImg: coverImg
  }
  const result = await booklistService.edit(update_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '更新成功' })
  } else {
    res.json({ code: 200, msg: '更新失败'})
  }
})

router.delete('/del', async (req, res) => {
  const { blid, url } = req.query
  const booklistService = new bookListService()
  const result = await booklistService.del(blid)
  if (result.affectedRows > 0) {
    const r = await delFileNameByURL(url, 'bookList')
    res.json({ code: 200, msg: '删除成功' })
  } else {
    res.json({ code: 200, msg: '删除失败'})
  }
})

router.post('/blurry', async (req, res) => {
  const { name, create_time, page, limit, author, publishedName, ISBN } = req.body
  const data = { name: name, create_time, page: page, size: limit }
  const booklistService = new bookListService()
  const { content, total } = await booklistService.queryByBlur(data)
  const items = content.map(item => {
    return {
      btid: item.btid, blid: item.blid, name: item.name, 
      author: item.author, publishedName: item.publishedName, ISBN: item.ISBN,
      coverImg: item.coverImg, clickNum: item.clickNum,
      pname: item.pname, create_time: item.create_time,
      enabled: item.enabled === 1 ? true : false,
      create_by: item.create_by
    }
  })
  res.json({ code: 200, content: items, total: total })
})

module.exports = router