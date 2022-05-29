const express = require('express');
const router = express.Router();
const studentService = require('../../../models/service/studentService')
const { handleDate } = require('../../../utils/handleDate')

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
router.get('/studyProjectRecord', async (req, res) => {
  const { bid, start_time, end_time, study_time } = req.query
  const openid = req.headers.openid
  const ss = new studentService()
  const insert_item = { bid: bid, openid: openid, create_time: handleDate(new Date()), start_time: start_time, end_time: end_time, study_time: study_time }
  const result = await ss.studyProjectRecord(insert_item)
  if (result.affectedRows > 0) {
    res.json({ code: 200 })
  } else {
    res.json({ code: 200, msg: '添加失败'})
  }
})

module.exports = router;
