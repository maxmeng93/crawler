/**
 * restful api 子路由
 */

const router = require('koa-router')();
const userController = require('../controllers/user');
const crawlerController = require('./../controllers/crawler');

const routers = router
  .get('/user', userController.getUser)
  .post('/user', userController.addUser)
  .put('/user', userController.updateUser)
  .delete('/user/:username', userController.deleteUser)

  .get('/crawler/getChinaPopulation', crawlerController.getChinaPopulation)

module.exports = routers
