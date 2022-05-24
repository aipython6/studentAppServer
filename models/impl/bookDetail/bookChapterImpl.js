const mysqlConnect = require('../../../database/mysql_config')

class bookChapterImpl {
  all(params) {
    const { page, size } = params
    const sql = `select a.*,b.name as pname from bookChapter a left join bookList b on a.blid=b.blid ORDER BY a.create_time DESC`
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
    const sql = `INSERT INTO bookChapter SET ?`
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
    const { bcid, blid, name, update_time, create_by, enabled } = data
    const sql = `UPDATE bookChapter SET blid = ${blid}, name = '${name}', update_time = '${update_time}', create_by = '${create_by}', enabled = ${enabled} WHERE bcid = ${bcid}`
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
    const sql = `DELETE FROM bookChapter WHERE bcid = ${id}`
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

  queryByBlur({ name, create_time=[], page, size }) {
    let sql = `select a.*,b.name as pname from bookChapter a left join bookList b on a.blid=b.blid `
    if(name || (create_time.length > 0)) {
      if (name) {
        sql += `where a.name like %'${fullName}'%`  
      } else if (create_time.length > 0){
        const s = create_time[0] + ' :00:00:00'
        const e = create_time[1] + '23:59:59'
        sql += `where a.create_time between '${s}' and '${e}'`
      }
    }
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
}

module.exports = bookChapterImpl