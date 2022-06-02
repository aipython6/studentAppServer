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
    return { url: downloadUrl + newname, fullPath: uploadUrl + newname }
  })
  const { fullPath } = temp[0]
  const obj = await OCRHandle(fullPath)
  const words = obj.words_result.map(e => e.words)
  res.json({ code: 200, words: words.join('') })
})

module.exports = router;
