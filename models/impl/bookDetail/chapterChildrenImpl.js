const mysqlConnect = require('../../../database/mysql_config')

class chapterChildrenImpl {
  all(params) {
    const { page, size } = params
    const sql = `select c.*,d.name as bname from (
    select a.*, b.name as pname, b.blid from chapterChildren a left join bookChapter b on a.bcid = b.bcid)c
    left join bookList d on c.blid = d.blid ORDER BY c.create_time DESC`
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
    const sql = `INSERT INTO chapterChildren SET ?`
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
    const { ccid, bcid, name, update_time, create_by, enabled } = data
    const sql = `UPDATE chapterChildren SET bcid = ${bcid}, name = '${name}', update_time = '${update_time}', create_by = '${create_by}', enabled = ${enabled} WHERE ccid = ${ccid}`
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
    const sql = `DELETE FROM chapterChildren WHERE ccid = ${id}`
    console.log(sql)
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

module.exports = chapterChildrenImpl