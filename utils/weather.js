const request = require('request')

const getWeather = () => {
  const location = "101250401";
  const key = "b4e661a4527649d7b5ddee0bb95cdfa5";
  const url = `https://devapi.qweather.com/v7/weather/now?location=${location}&key=${key}`
  const headers = { 'content-Type': 'application/json', 'Accept': '*/*' }
  return new Promise((resolve, reject) => {
    request({ url: url, method:'get', headers: headers, gzip: true }, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        const json = res.body
        const obj = JSON.parse(json)
        resolve({ weather: obj })
      }
    })
  })
}

module.exports = { getWeather }
