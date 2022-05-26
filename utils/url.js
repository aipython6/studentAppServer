// 一些URL的配置
const { basename } = require('path')
const path = require('path')
const base_url = 'http://localhost:8090/'

const URL = {
  base_url: base_url,
  // 默认头像
  avatarDefaultUrl: base_url + 'images/avatar/default.jpg',

  // 下载课本封面的地址
  coverImgDownload: base_url + 'images/book/cover/',
  // 上传课本封面的地址
  coverImgUpload: path.join(__dirname, '../public/images/book/cover/'),

  // 上传章节内容
  chapterContentUpload: path.join(__dirname, '../public/images/book/chapterContent/'),

  // 下载章节内容
  chapterContentDownload: base_url + 'images/book/chapterContent/'
}

module.exports = URL