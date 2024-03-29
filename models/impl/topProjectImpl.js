const mysqlConnect = require('../../database/mysql_config')
class topProjectImpl {
  // 获取所有数据
  all(params) {
    const { page, size } = params
    const sql = `SELECT * FROM topProject ORDER BY create_time DESC`
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
    const sql = `INSERT INTO topProject SET ?`
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
    const { tid, name, update_time, create_by, enabled } = data
    const sql = `UPDATE topProject SET name = '${name}', update_time = '${update_time}', create_by = '${create_by}', enabled = ${enabled} WHERE tid = ${tid}`
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
    const sql = `DELETE FROM topProject WHERE tid = ${id}`
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
  queryByBlur({ name, create_time=[], page, size }) {
    let sql = `SELECT * FROM topProject `
    if(name || (create_time.length > 0)) {
      if (name) {
        sql += `where name like '%${name}%'`  
      } else if (create_time.length > 0){
        const s = create_time[0] + ' :00:00:00'
        const e = create_time[1] + '23:59:59'
        sql += `where create_time between '${s}' and '${e}'`
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

module.exports = topProjectImpl