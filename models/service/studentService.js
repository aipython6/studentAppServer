const studentImpl = require('../impl/studentImpl')

class studentService {
  constructor() {
    this.studentImpl = new studentImpl()
  }
  getCollectOneBook(data) {
    return this.studentImpl.getCollectOneBook(data)
  }
  collectBook(data) {
    return this.studentImpl.collectBook(data)
  }
  getCollectedBooks(data) {
    return this.studentImpl.getCollectedBooks(data)
  }


  /*student_study_books表的相关操作*/
  getIsStudy(data) {
    return this.studentImpl.getIsStudy(data)
  }

  setStudyProjectRecord(data) {
    return this.studentImpl.setStudyProjectRecord(data)
  }

  getStudyProjectRecord(data) {
    return this.studentImpl.getStudyProjectRecord(data)
  }

  updateStudyProjectRecord(data) {
    return this.studentImpl.updateStudyProjectRecord(data)
  }

}
module.exports = studentService