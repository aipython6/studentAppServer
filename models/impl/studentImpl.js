const mysqlConnect =require('../../database/mysql_config')

class studentImpl {
  /****** 对student_collect_books表的相关操作 ******/
  // 查询openid的用户是否收藏了bid
  getCollectOneBook({ bid, openid }) {
    const sql = `select * from student_collect_books where bid = ${bid} and openid = '${openid}'`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          if (result.length > 0) {
            resolve({ content: true })
          } else {
            resolve({ content: false })
          }
        } else {
          reject(err)
        }
      })
    })
  }
  // 收藏或取消收藏课程
  collectBook(data) {
    const { isCollect, bid, openid, create_time, status } = data
    const insert_item = { bid: bid, openid: openid, create_time: create_time, status: status }
    const add_sql = `insert into student_collect_books set ?`
    const del_sql = `delete from student_collect_books where bid = ${bid} and openid = '${openid}'`
    // 已收藏,再次点击按钮,则变为取消收藏,删除记录
    if (isCollect) {
      return new Promise((resolve, reject) => {
        mysqlConnect.query(del_sql, (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
      })
      // 从取消收藏到收藏,添加记录
    } else {
      return new Promise((resolve, reject) => {
        mysqlConnect.query(add_sql, insert_item, (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
      })
    }
  }

  // 获取openid所有收藏的课本列表
  getCollectedBooks({ openid }) {
    const sql = `select c.bid, c.create_time,c.name, c.publishedName,c.coverImg,
    (case when d.bid is not null then '已学习' else '未学习' end) status
    from 
    (
    select a.create_time,a.status, b.bid, b.name, b.publishedName,b.coverImg, b.clickNum from student_collect_books a left join books b on a.bid=b.bid
    where a.openid = '${openid}'
    )c left join student_study_books d on c.bid=d.bid`
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

  /*************对student_study_books表的相关操作*******************/
  //1.根据openid和bid查询某门课程是否已经学习了
  getIsStudy({ bid, openid }) {
    const sql = `select * from student_study_books where bid= ${bid} and openid='${openid}'`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          if (result.length > 0) {
            resolve({ result: true })
          } else {
            resolve({ result: false })
          }
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = studentImpl