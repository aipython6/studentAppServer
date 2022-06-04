const mysqlConnect = require('../../database/mysql_config')

// 学生练习题目时的操作方法
class exerciseImpl {
  setExerciseRecord(data) {
    const sql = `insert into student_exercise_books set ?`
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

  getExerciseRecord({ openid, pid }) {
    const sql = `select * from student_exercise_books where openid='${openid}' and pid = ${pid} `
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

  updateExerciseRecord(data) {
    const { temp_start_time, temp_end_time, exercise_time, openid, pid } = data
    const sql = `update student_exercise_books set temp_start_time = '${temp_start_time}', 
    temp_end_time = '${temp_end_time}', exercise_time = ${exercise_time} where openid = '${openid}' and pid = ${pid}`
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

  getTodayExerciseList({ openid }) {
    const sql = `select e.sid,f.name,f.bgColor from 
    (
    select c.*,d.sid from 
    (
    select a.pid,b.btid from student_exercise_books a left join books b on a.pid = b.bid
    where openid = '${openid}'
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

  getStudentNumFromExerciseProject() {
    const sql = `select openid from student_exercise_books group by openid`
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

  deleteStudyRecord({ id }) {
    const sql = `delete from student_exercise_books where id = ${id}`
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

module.exports = exerciseImpl