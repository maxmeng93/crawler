const Router = require('koa-router');
const userController = require('../controller/user');

const router = new Router();

const user = router
  .get('/user', userController.getUser)
  .post('/user', userController.addUser)
  .put('/user', userController.updateUser)
  .delete('/user/:username', userController.deleteUser);

module.exports = user;
