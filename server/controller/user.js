const jwt = require("jsonwebtoken");
const User = require("../model/user");

const config = require('../../config/server');

module.exports = {
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
    } catch (error) {}
  },

  // 登录
  async login(ctx) {
    let data = {
      status: 200,
      message: "success",
      data: null
    };

    const { name, password } = ctx.request.body;
    console.log(ctx.request.body);
    let user = await User.findOne({ name, password });

    console.log(user);

    if (!user) {
      data = Object.assign(data, {
        status: 404,
        message: "用户名或密码错误"
      });
    } else {
      const content = { username: user.username };

      const authorization = jwt.sign(content, config.jwtSecret, {
        expiresIn: 60 * 60 * 1 // 1小时过期
      });

      user.authorization = authorization;
      user = await user.save();

      data = Object.assign(data, {
        data: user
      });
    }
    ctx.body = data;
  },

  // 获取用户信息
  async getUser(ctx) {
    let data = {
      status: 200,
      message: "success",
      data: null
    };
    const { query } = ctx.request;
    const authorization = ctx.headers.Authorization;
    try {
      jwt.verify(authorization, config.jwtSecret);
    } catch (error) {
      data = Object.assign(data, {
        status: 401,
        message: 'TOKEN已失效，请重新登录'
      });
    }
    let user = await User.find(query);
    data.data = user;
    ctx.body = data;
  },

  // 更新用户信息
  async updateUser(ctx) {},

  // 删除用户
  async deleteUser(ctx) {
    const { username } = ctx.params;
    await User.remove({ username }).then(res => {
      console.log(res);
      ctx.body = true;
    });
  }
};
