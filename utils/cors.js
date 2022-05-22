const express = require('express');
const app = express();
const cors = require('cors');
// 配置跨域
app.use(cors());
class Cors {
  constructor(option) {
    this.option = option
  }
  getCorsOptions() {
    return this.option
  }
}

const cors_instance = new Cors({
  origin: ['http://localhost:9528'],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'authorization', 'username']
});

module.exports = cors_instance