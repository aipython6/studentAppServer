const moment  = require('moment')

const getNow = () => {
  return moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')
}

const handleDate = date => {
  return moment(date).locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')
}

// 将秒转为分钟
const SecondsToMinutes = second => {
  let time = moment.duration(second, 'seconds')
  let hours = time.hours()
  let minutes = time.minutes()
  let seconds = time.seconds()
  return moment({ h: hours, m: minutes, s:seconds }).format('HH:mm:ss')
}

module.exports = { getNow, handleDate, SecondsToMinutes }