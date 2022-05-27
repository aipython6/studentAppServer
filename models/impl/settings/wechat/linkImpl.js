const mysqlConnect = require('../../../../database/mysql_config')

class imageImpl {

  // 获取省份
  getProvinces() {
    const sql = `select pid, pname from provinces`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          const dicts = result.map(e => {
            return { pid: e.pid, pname: e.pname }
          })
          resolve({ content: dicts })
        } else {
          reject(err)
        }
      })
    })
  }

  all(data) {
    const { size, page } = data
    const sql = `select a.*, b.pname from links a left join provinces b on a.pid = b.pid`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          const total = result.length
          let dicts = result
          if (page && size) {
            const pageList = dicts.filter((item, index) => index < size * page && index >= size * (page - 1))
            dicts = pageList
          }
          resolve({ content: dicts, total: total })
        } else {
          reject(err)
        }
      })
    })
  }

  add(data) {
    const sql = `INSERT INTO links SET ?`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

  edit(data) {
    const { lid, name, update_time, create_by, enabled, type, link, pid, coverImg } = data
    const sql = `UPDATE links SET name = '${name}', update_time = '${update_time}', create_by = '${create_by}', enabled = ${enabled}, type = '${type}', link = '${link}', pid = ${pid}, coverImg = '${coverImg}' WHERE lid = ${lid}`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

  del(id) {
    const sql = `DELETE FROM links WHERE lid = ${id}`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = imageImpl