const Router = require('koa-router');
const crawlerController = require('../controller/crawler');

const router = new Router();

const crawler = router
  .get('/crawler/getChinaPopulation', crawlerController.getChinaPopulation);

module.exports = crawler;
