const mysqlConnect = require('../../../database/mysql_config')

class bookImpl {
  all(params) {
    const { page, size } = params
    const sql = `select a.*, b.name as pname from books a left join bookType b on a.btid=b.btid order by a.create_time desc`
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

  // 根据pid查询上一级的name
  getPnameBypid(pids) {
    const sql = `select name as pname, bid from books where bid in (?)`
    mysqlConnect.query(sql, [pids], (err, result) => {
      if (!err) {
        const items = result.map(e => {
          return { pname: e.pname, bid: e.bid }
          resolve(items)
        })
      } else {
        reject(err)
      }
    })
  }

  add(data) {
    const sql = `INSERT INTO books SET ?`
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
    const { bid, pid, btid, type, coverImg, author, publishedName, ISBN, name, update_time, create_by, enabled } = data
    const sql = `UPDATE books SET pid = ${pid}, btid = ${btid}, type = ${type}, coverImg = '${coverImg}', author = '${author}', publishedName='${publishedName}', ISBN='${ISBN}, name = '${name}', update_time = '${update_time}', create_by = '${create_by}', enabled = ${enabled} WHERE bid = ${bid}`
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
    const sql = `DELETE FROM books WHERE bid = ${id}`
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

module.exports = bookImpl