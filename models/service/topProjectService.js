const topProjectImpl = require('../impl/topProjectImpl')
class topProjectService {
  constructor() {
    this.topProjectImpl = new topProjectImpl()
  }
  all(params) {
    return this.topProjectImpl.all(params)
  }
  add(data) {
    return this.topProjectImpl.add(data)
  }
  edit(data) {
    return this.topProjectImpl.edit(data)
  }
  del(id) {
    return this.topProjectImpl.del(id)
  }
}
module.exports = topProjectService