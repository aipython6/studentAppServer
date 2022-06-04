const express = require('express');
const router = express.Router();
const studentService = require('../../../models/service/studentService')
const exerciseService = require('../../../models/service/exerciseService')
const { handleDate, SecondsToMinutes } = require('../../../utils/handleDate')

// 学生收藏、取消收藏、学习记录的相关路由

// 1.当用户点击课本进入课程详情页面时,根据bid和openid查询课程收藏映射表,用于确定该学生是否已经收藏了改课本
router.get('/getCollectOneBook', async (req, res) => {
  const { bid } = req.query
  const openid = req.headers.openid
  const ss = new studentService()
  const { content } = await ss.getCollectOneBook({ bid: bid, openid: openid })
  res.json({ code: 200, isCollect: content })
})

// 2.收藏课程
router.post('/collectBook', async (req, res) => {
  // 需要收藏的课程id
  const { bid, isCollect } = req.body
  const openid = req.headers.openid
  const ss = new studentService()
  const result = await ss.collectBook({ bid: bid, isCollect: isCollect, openid: openid, create_time: handleDate(new Date())})
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: isCollect === true ? '已取消': '已收藏' })
  } else {
    res.json({ code: 200, msg: '更新信息失败' })
  }
});

// 3.获取已经收藏的课本列表
router.get('/getCollectedBooks', async (req, res) => {
  const openid = req.headers.openid
  const ss = new studentService()
  const { content } = await ss.getCollectedBooks({ openid: openid })
  const items = content.map(item => {
    return {
      bid: item.bid, name: item.name, publishedName: item.publishedName, create_time: handleDate(item.create_time),
      clickNum: item.clickNum, status: item.status, coverImg: item.coverImg
    }
  })
  res.json({ code: 200, content: items })
})

// 4.用户学习课程,添加一条新纪录到课程学习关系表
router.post('/setStudyProjectRecord', async (req, res) => {
  const { bid, start_time, end_time, study_time, temp_start_time, temp_end_time, pid } = req.body
  const openid = req.headers.openid
  const ss = new studentService()
  const insert_item = { 
    bid: Number.parseInt(bid), openid: openid, start_time: handleDate(start_time), end_time: handleDate(end_time), 
    study_time: study_time, temp_start_time: handleDate(temp_start_time), 
    temp_end_time: handleDate(temp_end_time), pid: Number.parseInt(pid)
  }
  const result = await ss.setStudyProjectRecord(insert_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200 })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})

// 5.从课程学习关系表获取一条记录(根据openid和pid)
router.get('/getStudyProjectRecord', async (req, res) => {
  const { pid } = req.query
  const openid = req.headers.openid
  const ss = new studentService()
  const { content } = await ss.getStudyProjectRecord({ openid: openid, pid: pid })
  const items = content.map(item => {
    return {
      bid: item.bid, start_time: item.start_time, study_time: item.study_time,
      temp_start_time: item.temp_start_time, temp_end_time: item.temp_end_time
    }
  })
  res.json({ code: 200, content: items })
})

// 6.根据openid和pid更新一条课程学习关系表的记录
router.post('/updateStudyProjectRecord', async (req, res) => {
  const { temp_start_time, temp_end_time, study_time, pid } = req.body
  const openid = req.headers.openid
  const ss = new studentService()
  const update_item = { temp_start_time: handleDate(temp_start_time), temp_end_time: handleDate(temp_end_time), study_time: study_time, openid: openid, pid: pid }
  const result = await ss.updateStudyProjectRecord(update_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200 })
  } else {
    res.json({ code: 200, msg: '更新失败'})
  }
})

// 7.根据openid获取已学习课程的列表
router.get('/getStudyProjectList', async (req, res) => {
  const openid = req.headers.openid
  const ss = new studentService()
  const { content } = await ss.getStudyProjectList({ openid: openid })
  const items = content.map(item => {
    return {
      id: item.id,bid: item.bid, temp_end_time: handleDate(item.temp_end_time), 
      publishedName: item.publishedName, name: item.name,
      coverImg: item.coverImg, study_time: SecondsToMinutes(item.study_time)
    }
  })
  res.json({ code: 200, content: items })
})

// 根据id删除课程学习记录表中的数据
router.get('/deleteStudyProject', async (req, res) => {
  const { id } = req.query
  const ss = new studentService()
  const result = await ss.deleteStudyProject({ id: id })
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '已删除' })
  } else {
    res.json({ code: 200, msg: '更新失败'})
  }
})
// 获取正在学习课程的学生数量
router.get('/getStudentNumFromStudyProject', async (req, res) => {
  const ss = new studentService()
  const { content } = await ss.getStudentNumFromStudyProject()
  res.json({ code: 200, num: content })
})

// 获取今日战果数据
router.get('/getTodayStudyProject', async (req, res) => {
  const openid = req.headers.openid
  const ss = new studentService()
  const { content } = await ss.getTodayStudyProject({ openid: openid })
  const items = content.map(item => {
    return {
      name: item.name, sid: item.sid, bgColor: item.bgColor
    }
  })
  res.json({ code: 200, content: items })
})


// 二、学生做题的相关路由
// 1.添加一条记录
router.post('/setExerciseRecord', async (req, res) => {
  const { bid, start_time, end_time, exercise_time, temp_start_time, temp_end_time, pid } = req.body
  const openid = req.headers.openid
  const es = new exerciseService()
  const insert_item = { 
    bid: Number.parseInt(bid), openid: openid, start_time: handleDate(start_time), end_time: handleDate(end_time), 
    exercise_time: exercise_time, temp_start_time: handleDate(temp_start_time), 
    temp_end_time: handleDate(temp_end_time), pid: Number.parseInt(pid)
  }
  const result = await es.setExerciseRecord(insert_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200 })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})

// 2.获取一条记录
router.get('/getExerciseRecord', async (req, res) => {
  const { pid } = req.query
  const openid = req.headers.openid
  const es = new exerciseService()
  const { content } = await es.getExerciseRecord({ openid: openid, pid: pid })
  const items = content.map(item => {
    return {
      bid: item.bid, start_time: item.start_time, exercise_time: item.exercise_time,
      temp_start_time: item.temp_start_time, temp_end_time: item.temp_end_time
    }
  })
  res.json({ code: 200, content: items })
})

// 3.更新一条记录
router.post('/updateExerciseRecord', async (req, res) => {
  const { temp_start_time, temp_end_time, exercise_time, pid } = req.body
  const openid = req.headers.openid
  const es = new exerciseService()
  const update_item = { temp_start_time: handleDate(temp_start_time), temp_end_time: handleDate(temp_end_time), exercise_time: exercise_time, openid: openid, pid: pid }
  const result = await es.updateExerciseRecord(update_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200 })
  } else {
    res.json({ code: 200, msg: '更新失败'})
  }
})


// 4.获取今日做题数据
router.get('/getTodayExerciseList', async (req, res) => {
  const openid = req.headers.openid
  const es = new exerciseService()
  const { content } = await es.getTodayExerciseList({ openid: openid })
  const items = content.map(item => {
    return {
      name: item.name, sid: item.sid, bgColor: item.bgColor
    }
  })
  res.json({ code: 200, content: items })
})

// 5.获取做题的学生数量
router.get('/getStudentNumFromExerciseProject', async (req, res) => {
  const es = new exerciseService()
  const { content } = await es.getStudentNumFromExerciseProject()
  res.json({ code: 200, num: content })
})

// 6. 删除学习记录
router.get('/deleteStudyRecord', async (req, res) => {
  const { id } = req.query
  const es = new exerciseService()
  const result = await es.deleteStudyRecord({ id: id })
  if (result.affectedRows > 0) {
    res.json({ code: 200, msg: '已删除' })
  } else {
    res.json({ code: 200, msg: '更新失败'})
  }
})

module.exports = router;
