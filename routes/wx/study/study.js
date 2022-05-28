const express = require('express');
const router = express.Router();
const wechatProjectService = require('../../../models/service/wechatProjectService')
const { handleProject } = require('../../../utils/handleProject')
const { handleChapter } = require('../../../utils/handleChapter')
// 课程学习和练习题的相关路由
router.get('/getTopAndSecondProjec', async (req, res, next) => {
  const wps = new wechatProjectService()
  const { content } = await wps.getTopAndSecondProject()
  const { hot_content } = await wps.getTop6Hot()
  const items = content.map((item) => {
    return {
      sid: item.sid, name: item.name, pname: item.pname, bgColor: item.bgColor, clickNum: item.clickNum
    }
  })
  const result = handleProject(items)
  const hot_items = hot_content.map(item => {
    return {
      sid: item.sid, name: item.name, clickNum: item.clickNum
    }
  })
  res.json({ code: 200, content: result, hot_content: hot_items })
});

// 根据课程名称搜索
router.get('/getSecondProjectByName', async (req, res) => {
  const { name } = req.query
  const wps = new wechatProjectService()
  const { content } = await wps.getSecondProjectByName({ name: name })
  const { hot_content } = await wps.getTop6Hot()
  const items = content.map((item) => {
    return {
      sid: item.sid, name: item.name, pname: item.pname, bgColor: item.bgColor, clickNum: item.clickNum
    }
  })
  const result = handleProject(items)
  const hot_items = hot_content.map(item => {
    return {
      sid: item.sid, name: item.name, clickNum: item.clickNum
    }
  })
  res.json({ code: 200, content: result, hot_content: hot_items })
})

// 点击某个课程后跳转到课本类型列表
router.get('/getBookTypeList', async (req, res) => {
  const { sid } = req.query
  const wps = new wechatProjectService()
  const { content } = await wps.getBookTypeList(Number.parseInt(sid))
  const items = content.map(item => {
    return { btid: item.btid, name: item.name, num: item.num}
  })
  res.json({ code: 200, content: items })
})

router.get('/getBookList', async (req, res) => {
  const { btid } = req.query
  const wps = new wechatProjectService()
  const { content } = await wps.getBookList(Number.parseInt(btid))
  const items = content.map(item => {
    return {
      bid: item.bid, name: item.name, author: item.author,
      publishedName: item.publishedName, ISBN: item.ISBN, clickNum: item.clickNum, src: item.coverImg
    }
  })
  res.json({ code: 200, content: items })
})

router.get('/getBookInfoBybid', async (req, res) => {
  const { bid } = req.query
  const wps = new wechatProjectService()
  const { content } = await wps.getBookInfoBybid(Number.parseInt(bid))
  const items = content.map(item => {
    return {
      bid: item.bid, name: item.name, author: item.author,
      publishedName: item.publishedName, ISBN: item.ISBN, clickNum: item.clickNum, src: item.coverImg
    }
  })
  res.json({ code: 200, content: items[0] })
})

// 根据bid获取其下所有1级和2级章节的内容
router.get('/getBookChapterList', async (req, res) => {
  const { bid } = req.query
  const wps = new wechatProjectService()
  const { content } = await wps.getBookList()
  const result = handleChapter(content).filter((item, index) => Number.parseInt(item.id) === Number.parseInt(bid))
  res.json({ code: 200, content: result[0] })
})

router.get('/getChapterConentList', async (req, res) => {
  const { bid, type } = req.query
  const wps = new wechatProjectService()
  const { content } = await wps.getChapterConentList(Number.parseInt(bid), Number.parseInt(type))
  const result = content.map(item => {
    return {
      ccid: item.ccid, url: item.url
    }
  })
  res.json({ code: 200, content: result })
})

module.exports = router;
