const imageImpl = require('../../../impl/settings/wechat/imageImpl')

class imageService {
  constructor() {
    this.imageImpl = new imageImpl()
  }
  all(params) {
    return this.imageImpl.all(params)
  }
  add(data) {
    return this.imageImpl.add(data)
  }
  edit(data) {
    return this.imageImpl.edit(data)
  }
  del(id) {
    return this.imageImpl.del(id)
  }
  queryByBlur(data) {
    return this.imageImpl.queryByBlur(data)
  }
}
module.exports = imageService