const mysqlConnect = require('../../../../database/mysql_config')

class imageImpl {

  all(data) {
    const { size, page } = data
    const sql = `select * from wxImgs`
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
    const sql = `INSERT INTO wxImgs SET ?`
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
    const { wid, content, update_time, create_by, enabled, type, url } = data
    const sql = `UPDATE wxImgs SET content = '${content}', update_time = '${update_time}', create_by = '${create_by}', enabled = ${enabled}, type = ${type}, url = '${url}' WHERE wid = ${wid}`
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
    const sql = `DELETE FROM wxImgs WHERE wid = ${id}`
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

  // 小程序相关
  // 1.根据type获取获取swiper或icons
  getImages({ type }) {
    const sql = `select * from wxImgs where type = ${type} and enabled = 1`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          resolve({ content: result })
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = imageImpl