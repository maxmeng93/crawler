const User = require('../models/user');

module.exports = {
  // 注册新用户
  async signup(ctx) {
    const body = ctx.request.body;
    ctx.body = body;
  },

  // 获取用户信息
  async getUserInfo(ctx) {
    console.log(ctx.request.query);
    const { query } = ctx.request;
    let us = await User.find();
    console.log(us);
    ctx.body = query;
  }
}
