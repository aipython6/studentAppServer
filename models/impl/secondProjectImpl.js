const mysqlConnect = require('../../database/mysql_config')

class secondProjectImpl {
  all({ page, size }) {
    const sql = `select a.*, b.name as pname from secondProject a left join topProject b on a.tid=b.tid ORDER BY a.create_time DESC`
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
    const sql = `INSERT INTO secondProject SET ?`
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
    const { tid, sid, name, update_time, create_by, enabled, bgColor } = data
    const sql = `UPDATE secondProject SET tid = ${tid}, name = '${name}', update_time = '${update_time}', create_by = '${create_by}', enabled = ${enabled}, bgColor = '${bgColor}' WHERE sid = ${sid}`
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
    const sql = `DELETE FROM secondProject WHERE sid = ${id}`
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
    let sql = `select a.*, b.name as pname from secondProject a left join topProject b on a.tid=b.tid `
    if(name || (create_time.length > 0)) {
      if (name) {
        sql += `where a.name like '%${name}%'`
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

module.exports = secondProjectImpl