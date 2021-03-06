const mongoose = require('mongoose');

const app = require('./app');
const config = require('../config/server');

global.mdb = new Map(); // 作为内存数据库使用
global.mdb.set('sealList', new Set()); // 封禁用户列表
global.mdb.set('newUserList', new Set()); // 新注册用户列表

mongoose.Promise = Promise;

mongoose.set('useCreateIndex', true);
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true }, async err => {
  if (err) {
    console.error('connect database error!');
    console.error(err);
    return process.exit(1);
  }

  app.listen(config.port, async () => {
    console.log(`>>> server listen on http://localhost:${config.port}`);
  });
});
