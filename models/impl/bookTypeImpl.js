const mysqlConnect = require('../../database/mysql_config')

class bookTypeImpl {
  all({ page, size }) {
    const sql = `select a.*, b.name as pname from bookType a left join secondProject b on a.sid=b.sid ORDER BY a.create_time DESC`
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
    const sql = `INSERT INTO bookType SET ?`
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
    const { sid, btid, name, update_time, create_by, enabled, bgColor } = data
    const sql = `UPDATE bookType SET sid = ${sid}, name = '${name}', update_time = '${update_time}', create_by = '${create_by}', enabled = ${enabled}, bgColor = '${bgColor}' WHERE btid = ${btid}`
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
    const sql = `DELETE FROM bookType WHERE btid = ${id}`
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
  queryByBlur({ fullName, create_time=[], page, size }) {
    let sql = `select a.*, b.name as pname from bookType a left join secondProject b on a.sid=b.sid `
    if(name || (create_time.length > 0)) {
      if (fullName) {
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

module.exports = bookTypeImpl