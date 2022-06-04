const mysqlConnect = require('../../../database/mysql_config')

class bookImpl {
  all(params) {
    const { page, size } = params
    const sql = `select a.*, b.name as pname from books a left join bookType b on a.btid=b.btid where a.type = 0 order by a.create_time desc`
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
    const { bid, btid, coverImg, author, publishedName, ISBN, name, update_time, create_by, enabled } = data
    const sql = `UPDATE books SET btid = ${btid}, coverImg = '${coverImg}', author = '${author}', publishedName='${publishedName}', ISBN='${ISBN}', name = '${name}', update_time = '${update_time}', create_by = '${create_by}', enabled = ${enabled} WHERE bid = ${bid}`
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

  // 根据name或create_time查询
  queryByBlur({ name, type, create_time=[], page, size }) {
    let sql = `select a.*, b.name as pname from books a left join bookType b on a.btid=b.btid where a.type = 0 `
    if(name || (create_time.length > 0)) {
      if (name) {
        switch (type) {
          case '课本名称':
            sql += `and a.name like '%${name}%'`
            break;
          case '编者':
            sql += `and a.author like '%${name}%'`
            break
          case 'ISBN':
            sql += `and a.ISBN like '%${name}%'`
            break
          case '出版社':
            sql += `and a.publishedName like '%${name}%'`
            break
          case "上级类目":
            sql += `and b.name like '%${name}%'`
            break
        }
      } else if (create_time.length > 0 && create_time[0] !== '' && create_time[1] !== '') {
        const s = create_time[0] + ' 00:00:00'
        const e = create_time[1] + ' 23:59:59'
        sql += `and a.create_time between '${s}' and '${e}'`
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

module.exports = bookImpl