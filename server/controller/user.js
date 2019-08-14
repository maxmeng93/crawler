const jwt = require("jsonwebtoken");
const User = require("../model/user");

const config = require('../../config/server');

module.exports = {
  // 注册新用户
  async addUser(ctx) {
    const { username, password, repassword } = ctx.request.body;
    if (!username) return ctx.body = '用户名不能为空';
    if (!password) return ctx.body = '密码不能为空';
    if (password !== repassword) return ctx.body = '两次输入密码不一致';

    let user = await User.findOne({
      username: username
    }).exec();

    if (!user) {
      user = new User({
        username,
        password
      });
    }

    try {
      user = await user.save();
      console.log(user);
      ctx.body = user;
    } catch (error) {}

    // const userInfo = await User.findOne({ username }).exec();
    // if (userInfo) return ctx.body = '用户名已经被注册了';

    // const newUser = new User({ username, password });
    // await newUser.save();
    // ctx.body = '注册成功';
  },

  // 登录
  async login(ctx) {
    let data = {
      status: 200,
      message: "success",
      data: null
    };

    const { name, password } = ctx.request.body;
    let user = await User.findOne({ name, password });

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
