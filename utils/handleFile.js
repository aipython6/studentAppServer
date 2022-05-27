// 处理文件的一些工具函数
const fs = require('fs')
const path = require('path')
const URL = require('../utils/url')

// 可能要删除的文件路径
var dirMap = {
  'chapterContent': URL.chapterContentUpload,
  'bookList': URL.coverImgUpload,
  'swiperAndIcons': URL.swiperAndIconsUpload,
  'linkCoverImg': URL.linkCoverImgUpload,
}

// 根据访问文件的URL删除对应的文件
const delFileNameByURL = (url, type) => {
  // 文件所在的目录
  const dir = dirMap[type]
  // 文件名
  const filename = url.split('/').slice(-1)[0]
  // 要删除文件的绝对路径
  const absDir = path.join(dir, filename)
  return new Promise((resolve, reject) => {
    fs.unlink(absDir, function (err, result) {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

module.exports = { delFileNameByURL }