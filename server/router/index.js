const Router = require('koa-router');
const user = require('./user');
const crawler = require('./crawler');

let router = new Router({
  prefix: '/api'
});

router.use(user.routes(), user.allowedMethods());
router.use(crawler.routes(), crawler.allowedMethods());

module.exports = router;
