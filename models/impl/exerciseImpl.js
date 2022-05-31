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
    const { temp_start_time, temp_end_time, study_time, openid, pid } = data
    const sql = `update student_exercise_books set temp_start_time = '${temp_start_time}', 
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
}

module.exports = exerciseImpl