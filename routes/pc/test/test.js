const express = require('express');
const router = express.Router();
const { getWeather } = require('../../../utils/weather')

router.get('/getWeather', async (req, res) => {
  const { weather } = await getWeather()
  res.json({ code: 200, data: weather })
})

module.exports = router