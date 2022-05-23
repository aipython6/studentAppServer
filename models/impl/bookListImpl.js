const mysqlConnect = require('../../database/mysql_config')

class bookListImpl {
  all({ page, size }) {
    const sql = `select a.*, b.name as pname from bookList a left join bookType b on a.btid=b.btid ORDER BY a.create_time DESC`
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
  // 添加
  add(data) {
    const sql = `INSERT INTO bookList SET ?`
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

  // 编辑
  edit(data) {
    const { blid, btid, name, update_time, create_by, enabled, bgColor, author, ISBN, coverImg, publishedName } = data
    const sql = `UPDATE bookList SET btid = ${btid}, name = '${name}',author = '${author}', published = '${publishedName}', ISBN = '${ISBN}', coverImg = '${coverImg}' update_time = '${update_time}', create_by = '${create_by}', enabled = ${enabled}, bgColor = '${bgColor}' WHERE blid = ${blid}`
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

  // 删除
  del(id) {
    const sql = `DELETE FROM bookList WHERE blid = ${id}`
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
  queryByBlur({ name='', author='', publishedName='', ISBN='', create_time=[], page, size }) {
    let sql = `select a.*, b.name as pname from bookList a left join secondProject b on a.sid=b.sid `
    if(name || (create_time.length > 0)) {
      if (name) {
        sql += `where a.name like %'${name}'%`  
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

module.exports = bookListImpl