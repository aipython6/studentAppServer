const mysqlConnect = require('../../../../database/mysql_config')

class studentImpl {

  all(data) {
    const { size, page } = data
    const sql = `select * from students`
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

  queryByBlur({ name, type, create_time=[], page, size }) {
    let sql = `select * from students a `
    if(name || (create_time.length > 0)) {
      if (name) {
        switch (type) {
          case '姓名':
            sql += `where a.username like '%${name}%'`
            break;
          case '性别':
            sql += `where a.gender like '%${name}%'`
            break
          case '学校':
            sql += `where a.school like '%${name}%'`
            break
          case '专业':
            sql += `where a.professional like '%${name}%'`
            break
        }
      } else if (create_time.length > 0 && create_time[0] !== '' && create_time[1] !== '') {
        const s = create_time[0] + ' :00:00:00'
        const e = create_time[1] + ' 23:59:59'
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

module.exports = studentImpl