const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const upload = require('../../../utils/postFile')
const uploadObj = upload.postOCRImg()
const URL = require('../../../utils/url')
const { OCRHandle } = require('../../../utils/ocr')

router.post('/upload', uploadObj.array('file'), async (req, res) => {
  const uploadUrl = URL.OCRImgUpload
  const downloadUrl = URL.OCRImgDownload
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

router.get('/getSessionKey', async (req, res, next) => {
  OCRHandle()
  // console.log(access_token)
  // getSessionKey()
  res.json({ code: 200 })
});

module.exports = router;
