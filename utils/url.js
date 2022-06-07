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
  coverImgUpload: path.join(__dirname, '../public/images/book/cover/'),

  // 上传章节内容
  chapterContentUpload: path.join(__dirname, '../public/images/book/chapterContent/'),

  // 下载章节内容
  chapterContentDownload: base_url + 'images/book/chapterContent/',

  //上传swiper和icons
  swiperAndIconsUpload: path.join(__dirname, '../public/images/settings/wechat/image/'),

  //下载swiper和icons
  swiperAndIconsDownload: base_url + 'images/settings/wechat/image/',

  // 上传link的背景图片
  linkCoverImgUpload: path.join(__dirname, '../public/images/settings/wechat/link/'),
  // 下载link的背景图片
  linkCoverImgDownload: base_url + 'images/settings/wechat/link/',

  // 上传OCR图片
  OCRImgUpload: path.join(__dirname, '../public/images/ocr/'),
  // 下载OCR图片
  OCRImgDownload: base_url + 'images/ocr/',

  // 上传后台用户头像
  avatarUpload: path.join(__dirname, '../public/images/avatar/'),
  // 下载后台用户头像
  avataDownload: base_url + 'images/avatar/',

  // 获取天气的图片
  weatherIconDownload: base_url + 'images/weatherIcon/'
}

module.exports = URL