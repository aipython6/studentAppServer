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

}
module.exports = exerciseService