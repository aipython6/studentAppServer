const exerciseImpl = require('../impl/exerciseImpl')

class exerciseService {
  constructor() {
    this.exerciseImpl = new exerciseImpl()
  }

  setExerciseRecord(data) {
    return this.exerciseImpl.setExerciseRecord(data)
  }

  getExerciseRecord(data) {
    return this.exerciseImpl.getExerciseRecord(data)
  }

  updateExerciseRecord(data) {
    return this.exerciseImpl.updateExerciseRecord(data)
  }

  getTodayExerciseList(data) {
    return this.exerciseImpl.getTodayExerciseList(data)
  }

  getStudentNumFromExerciseProject() {
    return this.exerciseImpl.getStudentNumFromExerciseProject()
  }

  deleteStudyRecord(data) {
    return this.exerciseImpl.deleteStudyRecord(data)
  }

  deleteExerciseRecordByOpenid(data) {
    return this.exerciseImpl.deleteExerciseRecordByOpenid(data)
  }

}
module.exports = exerciseService