// 处理URL白名单
const isWhiteURL = (whiteList, url) => {
  whiteList.forEach(a => {
    return url.indexOf(a) !== -1
  })
}

module.exports = { isWhiteURL }