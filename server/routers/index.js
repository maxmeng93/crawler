const Router = require('koa-router');
const api = require('./api');

let router = new Router({
  prefix: '/api'
});

router.use(api.routes(), api.allowedMethods());

module.exports = router;
