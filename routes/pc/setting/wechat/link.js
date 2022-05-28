const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const linkService = require('../../../../models/service/settings/wechat/linkService')
const { handleDate } = require('../../../../utils/handleDate')
const { delFileNameByURL } = require('../../../../utils/handleFile')
const URL = require('../../../../utils/url')
const upload = require('../../../../utils/postFile')
const uploadObj = upload.postLinkCoverImg()

router.post('/upload', uploadObj.array('file'), async (req, res) => {
  const uploadUrl = URL.linkCoverImgUpload
  const downloadUrl = URL.linkCoverImgDownload
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
  const ls = new linkService()
  const { content, total } = await ls.all({ page: Number.parseInt(page), size: Number.parseInt(limit) })
  const items = content.map(item => {
    return {
      lid: item.lid, name: item.name, coverImg: item.coverImg, create_time: handleDate(item.create_time),
      enabled: item.enabled === 1 ? true : false, type: item.type, create_by: item.create_by,
      pname : item.pname, link: item.link, pid: item.pid, clickNum: item.clickNum
    }
  })
  res.json({ code: 200, content: items, total: total })
});

router.post('/add', async (req, res) => {
  const { name, link, pid, type, enabled, coverImg } = req.body
  const create_by = req.headers.username
  const ls = new linkService()
  const insert_item = {
    name: name, link: link, type: type, enabled: enabled === true ? 1 : 0,
    create_by: create_by, create_time: handleDate(new Date()), pid: pid, coverImg: coverImg, clickNum: 0
  }
  const result = await ls.add(insert_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '添加成功' })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})


router.put('/edit', async (req, res) => {
  const { lid, name, link, pid, type, enabled, coverImg } = req.body
  const ls = new linkService()
  const create_by = req.headers.username
  const update_item = {
    lid: lid, name: name, enabled: enabled === true ? 1 : 0,
    update_time: handleDate(new Date()), create_by: create_by, link: link,
    type: type, coverImg: coverImg, pid: pid
  }
  const result = await ls.edit(update_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '更新成功' })
  } else {
    res.json({ code: 200, msg: '更新失败'})
  }
})

router.delete('/del', async (req, res) => {
  const { lid, url } = req.query
  const ls = new linkService()
  const result = await ls.del(lid)
  if (result.affectedRows > 0) {
    const r = await delFileNameByURL(url, 'linkCoverImg')
    res.json({ code: 200, msg: '删除成功' })
  } else {
    res.json({ code: 200, msg: '删除失败'})
  }
})

router.get('/getProvinces', async (req, res) => {
  const ls = new linkService()
  const { content } = await ls.getProvinces()
  res.json({ code: 200, content: content })
})

module.exports = router;
