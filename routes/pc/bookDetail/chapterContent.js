const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { handleDate } = require('../../../utils/handleDate')
const chapterContentService = require('../../../models/service/bookDetail/chapterContentService')
const URL = require('../../../utils/url')

const upload = require('../../../utils/postFile');
const uploadObj = upload.postChapterContent()


// 用于二级章节内容的CRUD
/*
 前端显示规则
 1.点击2级章节添加按钮跳转到新页面,新页面页头展示其对应的课本名称和一级章节名称
 2.表格展示具体的2级章节内容,只能上传图片,用户在微信端可以点击图片进行浏览
*/
// 1.上传章节内容
router.post('/upload', uploadObj.array('file'), async (req, res) => {
  const uploadUrl = URL.chapterContentUpload
  const downloadUrl = URL.chapterContentDownload
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

// 2.根据bid获取对应的2级章节标题，连带出对应的课本名称和1级章节名称
router.get('/allBybid', async (req, res) => {
  const { bid } = req.query
  const chaptercontentService = new chapterContentService()
  const { content } = await chaptercontentService.allBybid(Number.parseInt(bid))
  res.json({ code: 200, content: content[0] })
})

// 3.获取该2级章节下的所有图片
router.get('/all', async (req, res) => {
  const { page, limit, bid } = req.query
  const chaptercontentService = new chapterContentService()
  const { content, total } = await chaptercontentService.all({ page: Number.parseInt(page), size: Number.parseInt(limit), bid: Number.parseInt(bid) })
  const items = content.map(item => {
    return {
      ccid: item.ccid, pname: item.pname, url: item.url, enabled: item.enabled === 1 ? true : false,
      create_time: handleDate(item.create_time), create_by: item.create_by
    }
  })
  res.json({ code: 200, content: items, total: total})
})

router.post('/add', async (req, res) => {
  const data = req.body
  // 0表示课本内容，1表示练习题
  const type = 0
  // console.log(data)
  const create_by = req.headers.username
  const chaptercontentService = new chapterContentService()
  // 添加多条记录的数据格式:data[[item1],[item2],...]
  const insert_item = []
  for (let item of data.urls) {
    let t = [ Number.parseInt(data.bid), item, create_by, handleDate(new Date()), data.enabled === true ? 1 : 0, type ]
    insert_item.push(t)
    t = []
  }
  const result = await chaptercontentService.add(insert_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '添加成功' })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})

router.put('/edit', async (req, res) => {
  const { ccid, name, enabled, url } = req.body
  const chaptercontentService = new chapterContentService()
  const create_by = req.headers.username
  const update_item = {
    ccid: ccid, name: name, enabled: enabled === true ? 1 : 0,
    update_time: handleDate(new Date()), create_by: create_by, url: url
  }
  const result = await chaptercontentService.edit(update_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '更新成功' })
  } else {
    res.json({ code: 200, msg: '更新失败'})
  }
})

router.delete('/del', async (req, res) => {
  const { ccid } = req.query
  const chaptercontentService = new chapterContentService()
  const result = await chaptercontentService.del(ccid)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '删除成功' })
  } else {
    res.json({ code: 200, msg: '删除失败'})
  }
})

module.exports = router