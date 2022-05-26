const mysqlConnect = require('../../../database/mysql_config')

class chapterContentImpl {
  allBybid(bid) {
    // 查询二级标题对应的课本名称和一级标题
    const sql = `select c.*,d.name as bname from 
    (select a.*,b.name as cname, b.pid as spid from 
    (select bid, pid, name from books a where bid=${bid}) a left join
    books b on a.pid=b.bid) c left join books d on c.spid=d.bid`
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

  all(params) {
    const { page, size } = params
    const sql = `select a.*, b.name as pname from chapterContent a left join books b on a.bid=b.bid`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if(!err) {
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
    const sql = `INSERT INTO chapterContent SET ?`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, [data], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

  edit(data) {
    const { url, update_time, ccid, enabled } = data
    const sql = ` update chapterContent set url = '${url}', update_time='${update_time}', enabled = ${enabled} where ccid = ${ccid} `
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
    const sql = `delete from chapterContent where ccid = ${id}`
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

module.exports = chapterContentImpl