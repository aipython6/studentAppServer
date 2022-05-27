const linkImpl = require('../../../impl/settings/wechat/linkImpl')

class linkService {
  constructor() {
    this.linkImpl = new linkImpl()
  }
  getProvinces() {
    return this.linkImpl.getProvinces()
  }

  all(params) {
    return this.linkImpl.all(params)
  }

  add(data) {
    return this.linkImpl.add(data)
  }

  edit(data) {
    return this.linkImpl.edit(data)
  }

  del(id) {
    return this.linkImpl.del(id)
  }
}
module.exports = linkService