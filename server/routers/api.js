/**
 * restful api 子路由
 */

const router = require('koa-router')();
const userController = require('./../controllers/user-info');
const crawlerController = require('./../controllers/crawler');

const routers = router
  .get('/user/getUserInfo', userController.getUserInfo)
  .get('/crawler/getChinaPopulation', crawlerController.getChinaPopulation)

module.exports = routers
