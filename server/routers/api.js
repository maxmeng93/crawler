/**
 * restful api 子路由
 */

const router = require('koa-router')();
const userController = require('../controllers/user');
const crawlerController = require('./../controllers/crawler');

const routers = router
  .get('/user/getUserInfo', userController.getUserInfo)
  .post('/user/signup', userController.signup)
  .get('/crawler/getChinaPopulation', crawlerController.getChinaPopulation)

module.exports = routers
