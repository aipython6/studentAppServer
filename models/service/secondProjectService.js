const secondProjectImpl = require('../impl/secondProjectImpl')

class secondProjectService {
  constructor() {
    this.secondProjectImpl = new secondProjectImpl()
  }
  all(params) {
    return this.secondProjectImpl.all(params)
  }
  add(data) {
    return this.secondProjectImpl.add(data)
  }
  edit(data) {
    return this.secondProjectImpl.edit(data)
  }
  del(id) {
    return this.secondProjectImpl.del(id)
  }
  queryByBlur(data) {
    return this.secondProjectImpl.queryByBlur(data)
  }
}
module.exports = secondProjectService