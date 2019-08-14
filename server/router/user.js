const Router = require('koa-router');
const userController = require('../controller/user');

const router = new Router();

const user = router
  .get('/user', userController.getUser)
  .put('/user', userController.updateUser)
  .delete('/user/:username', userController.deleteUser)
  .post('/user/register', userController.addUser)
  .post('/user/login', userController.login);

module.exports = user;
