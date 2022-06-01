const https = require('https')
const qs = require('qs')
const fs = require('fs')
const iconv = require('iconv-lite')

const param = qs.stringify({
  'grant_type': 'client_credentials',
  'client_id': 'wWgTMQ6ZiWfAYydlDCquQESu',
  'client_secret': 'QaTCB5LbbMETO0TZnw0n73O6X2UaS3ux'
});

const getAccessToken = () => {
  return new Promise((resolve, reject) => {
    const req = https.get(
      {   
        hostname: 'aip.baidubce.com',
        path: '/oauth/2.0/token?' + param,
        agent: false
      },  (res) => {
        let datas = []
        let size = 0
        res.on('data', data => {
          datas.push(data)
          size +=data.length
        })
        res.on('end', ()=>{
          let buff = Buffer.concat(datas,size)
          let result = iconv.decode(buff, 'utf8')
          result = JSON.parse(result.trim())
          resolve({ access_token: result.access_token })
        })
      }
    );
  })
}


// 根据图片地址识别图片文字,@param:path-图片路径
const base64 = (path) => {
  const base64 = Buffer(path).toString('base64')
  return base64
}

const OCRHandle = async (path) => {
  const base = base64(path)
  const access_token = await getAccessToken()
  const url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic'
  const params = { 'image': base }
  const req_url = url + '?access_token=' + access_token
  const headers = { 'content-type': 'application/x-www-form-urlencoded' }
  const req = https.get({
    hostname: 'https://aip.baidubce.com',
    path: '/rest/2.0/ocr/v1/accurate_basic?access_token=' + access_token,
    params: params,
    headers: headers,
    agent: false
  }, res => {
    res.on('data', data => {
      const t = JSON.parse(data)
      console.log(t)
    })
  })
}

module.exports = { OCRHandle }