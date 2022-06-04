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
    const sql = `select c.bid, c.create_time,c.name, c.publishedName,c.coverImg,c.clickNum,
    (case when d.pid is not null then '已学习' else '未学习' end) status
    from 
    (
    select a.create_time,a.status, b.name, b.publishedName,b.coverImg, b.clickNum, b.bid from student_collect_books a left join books b on a.bid=b.bid
    where a.openid = '${openid}'
    ) c left join student_study_books d on c.bid=d.pid`
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

  //2.用户学习,添加一条新记录到课程学习关系表中 
  setStudyProjectRecord(data) {
    const sql = `insert into student_study_books set ?`
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
  // 根据openid和bid从课程学习关系表获取一条记录
  getStudyProjectRecord({ openid, pid }) {
    const sql = `select * from student_study_books where openid='${openid}' and pid = ${pid} `
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

  updateStudyProjectRecord(data) {
    const { temp_start_time, temp_end_time, study_time, openid, pid } = data
    const sql = `update student_study_books set temp_start_time = '${temp_start_time}', 
    temp_end_time = '${temp_end_time}', study_time = ${study_time} where openid = '${openid}' and pid = ${pid}`
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

  // 获取已学习的课程列表
  getStudyProjectList({ openid }) {
    const sql = `select a.id, a.temp_end_time,a.study_time, b.bid, b.name, b.publishedName, b.coverImg from student_study_books a left join books b on a.pid = b.bid where openid = '${openid}'`
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

  // 根据id删除课程记录表中的数据
  deleteStudyProject({ id }) {
    const sql = `delete from student_study_books where id = ${id}`
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

  getStudentNumFromStudyProject() {
    const sql = `select openid from student_study_books group by openid`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          resolve({ content: result.length })
        } else {
          reject(err)
        }
      })
    })
  }

  // 获取今日战果数据,查询今天课程学习的前3条记录
  getTodayStudyProject({ openid }) {
    const sql = `select distinct e.sid,f.name,f.bgColor from 
    (
    select c.*,d.sid from 
    (
    select a.pid,b.btid from student_study_books a left join books b on a.pid = b.bid where openid = '${openid}'
    and (TO_DAYS(temp_end_time)-TO_DAYS(NOW()))=0 order by temp_end_time desc limit 3
    )c left join bookType d on c.btid=d.btid
    ) e left join secondProject f on e.sid=f.sid`
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

module.exports = studentImpl