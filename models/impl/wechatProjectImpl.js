const mysqlConnect = require('../../database/mysql_config')

// 小程序用到所有关于课程和课本信息的方法

class wechatProjectImpl {
  // 1.课程列表的加载，查询topProject和secondProject表
  getTopAndSecondProject() {
    const sql = `select a.*, b.name as pname from secondProject a left join topProject b on a.tid=b.tid`
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
  // 获取六个最热门的课程,根据clickNum
  getTop6Hot() {
    const sql = `select a.*, b.name as pname from secondProject a left join topProject b on a.tid=b.tid order by clickNum desc limit 6`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          resolve({ hot_content: result })
        } else {
          reject(err)
        }
      })
    })
  }

  getSecondProjectByName({ name }) {
    const sql = `select a.*, b.name as pname from secondProject a left join topProject b on a.tid=b.tid where a.name like '%${name}%'`
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

  // 根据bid查询某个课程下有哪些类别的书?这些书分别有几本?
  getBookTypeList(sid) {
    const sql = `select * from 
    (
    select e.btid, e.name, sum(pname) as num from 
    (select c.btid, c.name, (case when d.name is not null then 1 else 0 end) as pname
    from 
    (
    select b.btid, b.sid, b.name from secondProject a left join bookType b on a.sid=b.sid where a.sid=${sid}
    ) c left join books d on c.btid=d.btid
    ) e group by e.btid,e.name
    ) f where f.num>0`
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

  // 根据btid获取books中的课本列表
  getBookList(btid) {
    let sql = `select * from books `
    if (btid) {
      sql += `where btid = ${btid}`
    }
    sql += ` order by name`
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

  // 根据bid查询课本详细信息
  getBookInfoBybid(bid) {
    const sql = `select * from books where bid = ${bid}`
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

  // 更新clickNum
  updateClickNum({ bid, clickNum }) {
    const sql = `update books set clickNum=${clickNum} where bid = ${bid}`
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

  getChapterConentList(bid, type) {
    // type:0=表示章节内容,1=练习题
    const sql = `select * from chapterContent where bid = ${bid} and type = ${type}`
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
}

module.exports = wechatProjectImpl