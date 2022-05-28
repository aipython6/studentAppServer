const express = require('express');
const router = express.Router();
const linkService = require('../../../models/service/settings/wechat/linkService')
const imageService = require('../../../models/service/settings/wechat/imageService')
const noticeService = require('../../../models/service/settings/wechat/noticeService')

router.get('/getAllLinks', async (req, res, next) => {
  const { page, size } = req.query
  const ls = new linkService()
  const { content, total } = await ls.allLinksByclickNum({ page: Number.parseInt(page), size: Number.parseInt(size) })
  const items = content.map(item => {
    return {
      id: item.lid, name: item.name, region: item.pname, url: item.link,
      type: item.type, clickNum: item.clickNum,img: item.coverImg
    }
  })
  res.json({ code: 200, content: items, total: total })
});

router.get('/allLinksByName', async (req, res, next) => {
  const { page, size, name } = req.query
  const ls = new linkService()
  const { content, total } = await ls.allLinksByName({ page: page, size: size, name: name })
  const items = content.map(item => {
    return {
      id: item.lid, name: item.name, region: item.pname, url: item.link,
      type: item.type, clickNum: item.clickNum,img: item.coverImg
    }
  })
  res.json({ code: 200, content: items, total: total })
})

router.get('/allRegionWebsite', async (req, res, next) => {
  const ls = new linkService()
  const { content } = await ls.allLinksByProvince()
  const items = content.map(item => {
    return {
      id: item.pid, name: item.pname, num: item.num
    }
  })
  res.json({ code: 200, content: items  })
})

router.get('/getImages', async (req, res, next) => {
  const { type } = req.query
  const is = new imageService()
  const { content } = await is.getImages({ type: Number.parseInt(type) })
  const items = content.map(item => {
    return {
      image: item.url, title: item.content
    }
  })
  res.json({ code: 200, content: items  })
})

router.get('/getNotice', async (req, res, next) => {
  const { type } = req.query
  const ns = new noticeService()
  const { content } = await ns.getNotice({ type: Number.parseInt(type) })
  const items = content.map(item => {
    return {
      content: item.content
    }
  })
  res.json({ code: 200, content: items[0].content  })
})

module.exports = router;
