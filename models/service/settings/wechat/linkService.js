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

  // 小程序端使用到的查询
  allLinksByclickNum(params) {
    return this.linkImpl.allLinksByclickNum(params)
  }

  // 根据name查询所有link
  allLinksByName(params) {
    return this.linkImpl.allLinksByName(params)
  }

  allLinksByProvince() {
    return this.linkImpl.allLinksByProvince()
  }
}
module.exports = linkService