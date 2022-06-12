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

  getStudyProjectList(data) {
    return this.studentImpl.getStudyProjectList(data)
  }

  deleteStudyProject(data) {
    return this.studentImpl.deleteStudyProject(data)
  }

  getStudentNumFromStudyProject() {
    return this.studentImpl.getStudentNumFromStudyProject()
  }

  getTodayStudyProject(data) {
    return this.studentImpl.getTodayStudyProject(data)
  }

  deleteStudyRecordByopenid(data) {
    return this.studentImpl.deleteStudyRecordByopenid(data)
  }

  deleteCollectRecordByopenid(data) {
    return this.studentImpl.deleteCollectRecordByopenid(data)
  }
}
module.exports = studentService