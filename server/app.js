const path = require('path');
const Koa = require('koa');
const cors = require('@koa/cors');
const koaStatic = require('koa-static');
const body = require('koa-body');
const koaLogger = require('koa-logger');
const koaJwt = require('koa-jwt');

const config = require('../config/server');
const routers = require('./router/index');

const app = new Koa();

//
// app.use(koaJwt({secret: config.jwtSecret}).unless({
//   path: [/^\/api\/user\/login/]
// }));

// 跨域
app.use(cors());

// 配置控制台日志中间件
app.use(koaLogger());

// 配置ctx.body解析中间件
app.use(body());

// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname, '../public')));

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

module.exports = app;
