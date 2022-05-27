const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const imageService = require('../../../../models/service/settings/wechat/imageService')
const { handleDate } = require('../../../../utils/handleDate')
const { delFileNameByURL } = require('../../../../utils/handleFile')
const URL = require('../../../../utils/url')
const upload = require('../../../../utils/postFile')
const uploadObj = upload.postwxImg()

router.post('/upload', uploadObj.array('file'), async (req, res) => {
  const uploadUrl = URL.swiperAndIconsUpload
  const downloadUrl = URL.swiperAndIconsDownload
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


router.get('/all', async (req, res, next) => {
  const { limit, page } = req.query
  const imageservice = new imageService()
  const { content, total } = await imageservice.all({ page: Number.parseInt(page), size: Number.parseInt(limit) })
  const items = content.map(item => {
    return {
      wid: item.wid, content: item.content, url: item.url, create_time: handleDate(item.create_time),
      enabled: item.enabled === 1 ? true : false, type: item.type, create_by: item.create_by
    }
  })
  res.json({ code: 200, content: items, total:total })
});

router.post('/add', async (req, res) => {
  const { content, url, type, enabled } = req.body
  console.log(req.body)
  const create_by = req.headers.username
  const imageservice = new imageService()
  const insert_item = {
    content: content, url: url, type: Number.parseInt(type), enabled: enabled === true ? 1 : 0,
    create_by: create_by, create_time: handleDate(new Date())
  }
  const result = await imageservice.add(insert_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '添加成功' })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})


router.put('/edit', async (req, res) => {
  const { wid, content, enabled, url, type } = req.body
  const imageservice = new imageService()
  const create_by = req.headers.username
  const update_item = {
    wid: wid, content: content, enabled: enabled === true ? 1 : 0,
    update_time: handleDate(new Date()), create_by: create_by, url: url,
    type: type
  }
  const result = await imageservice.edit(update_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '更新成功' })
  } else {
    res.json({ code: 200, msg: '更新失败'})
  }
})

router.delete('/del', async (req, res) => {
  const { wid, url } = req.query
  const imageservice = new imageService()
  const result = await imageservice.del(wid)
  if (result.affectedRows > 0) {
    const r = await delFileNameByURL(url, 'swiperAndIcons')
    res.json({ code: 200, msg: '删除成功' })
  } else {
    res.json({ code: 200, msg: '删除失败'})
  }
})

module.exports = router;
