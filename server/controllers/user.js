const User = require('../models/user');

module.exports = {
  // 获取用户信息
  async getUser(ctx) {
    const { query } = ctx.request;
    let user = await User.find(query);
    ctx.body = user;
  },

  // 注册新用户
  async addUser(ctx) {
    const body = ctx.request.body;
    let user = await User.findOne({
      username: body.username
    }).exec();

    if (!user) {
      user = new User(body);
    }

    try {
      user = await user.save();
      ctx.body = user;
    } catch (error) {

    }
  },

  // 更新用户信息
  async updateUser(ctx) {

  },

  // 删除用户
  async deleteUser(ctx) {
    const { username } = ctx.params;
    await User.remove({username}).then(res => {
      console.log(res);
      ctx.body = true;
    });
  }
}
