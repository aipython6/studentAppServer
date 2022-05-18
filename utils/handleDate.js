const moment  = require('moment')

const getNow = () => {
  return moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')
}

const handleDate = date => {
  return moment(date).locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')
}

module.exports = { getNow, handleDate }