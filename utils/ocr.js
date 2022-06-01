const https = require('https')
const qs = require('qs')
const fs = require('fs')
const iconv = require('iconv-lite')
const request = require('request')

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
  return new Promise(resolve => setTimeout(() => {
    const readLable = fs.readFileSync(path, 'binary')
    resolve(Buffer.from(readLable, 'binary').toString('base64'))
  }, 100))
}

const OCRHandle = async (path) => {
  const base = await base64(path)
  const { access_token } = await getAccessToken()
  const url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=' + access_token
  const params = { 'image': base }
  const options = {
    url: url,
    form: params,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  };
  return new Promise((resolve, reject) => {
    request.post(options, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        const json = res.body
        const obj = JSON.parse(json)
        resolve(obj)
      }
    })
  })
}

module.exports = { OCRHandle }