const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const path = require('path');
const static = require('koa-static');

const app = new Koa();

// 解析 POST 请求参数
app.use(koaBody());

// 静态资源
const staticPath = './static';
app.use(static(
  path.join(__dirname, staticPath)
));

// 子路由1
let home = new Router();
home.get('/', async ctx => {
  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `;
  ctx.body = html;
});

// 子路由2
let page = new Router();
page.get('/404', async ctx => {
  let url = ctx.url
  // 从上下文的request对象中获取
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

  // 从上下文中直接获取
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring

  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring
  }
  // ctx.body = '404 page!';
}).get('/helloworld', async ctx => {
  ctx.body = 'hello world page!';
});

// 装载所有子路由
let router = new Router();
router.use('/', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 中间件
// const loggerAsync  = require('./middleware/logger-async');
// app.use(loggerAsync());

app.use(async ctx => {
  let url = ctx.request.url;
  ctx.body = url;
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`The server is starting at http://localhost:${PORT}`);
});
