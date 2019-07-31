// const mongoose = require('mongoose');
// const User = mongoose.model('User');

/**
 * 注册新用户
 */
exports.signup = async (ctx, next) => {
  const phone = ctx.request.body.phone;

}

exports.getUserInfo = async (ctx, next) => {
  let result = {
    name: 'Max',
    age: 26
  };

  ctx.body = result;
}
