// 根据code获取用户的openid
const wxConfig = require('./wxConfig')
const https = require('https')

const getOpenId = (code) => {
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${wxConfig.AppID}&secret=${wxConfig.AppSecret}&js_code=${code}&grant_type=authorization_cod`
  return new Promise((resolve, reject) => {
    const req = https.get(url, res => {
      res.on('data', (data) => {
        const t = JSON.parse(data)
        const result = { openid: t.openid, sessionKey: t.session_key }
        resolve(result)
      })
    })
  })
}

module.exports = getOpenId