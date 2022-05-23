// 一些URL的配置
const path = require('path')
const base_url = 'http://localhost:8090/'

const URL = {
  base_url: base_url,
  // 默认头像
  avatarDefaultUrl: base_url + 'images/avatar/default.jpg',

  // 下载课本封面的地址
  coverImgDownload: base_url + 'images/book/cover/',
  // 上传课本封面的地址
  coverImgUpload: path.join(__dirname, '../public/images/book/cover/')
}

module.exports = URL