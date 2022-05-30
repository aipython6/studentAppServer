// 处理URL白名单
const isWhiteURL = (whiteList, url) => {
  let flag = false
  for (let i of whiteList) {
    if (url.indexOf(i) !== -1) {
      flag = true
      break
    }
  }
  return flag
}

module.exports = { isWhiteURL }