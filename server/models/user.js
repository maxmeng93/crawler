const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 定义一个模式(相当于传统意义的表结构)
 * 每个模式映射mongoDB的一个集合，
 * 它定义（只是定义，不是实现）这个集合里面文档的结构，就是定义这个文档有什么字段，字段类型是什么，字段默认值是什么等。
 * 除了定义结构外，还定义文档的实例方法，静态模型方法，复合索引，中间件等
 * @type {mongoose}
 */
const UserSchema = new Schema({
  createTime: { type: Date, default: Date.now },
  lastLoginTime: { type: Date, default: Date.now },

  username: {
    type: String,
    trim: true,
    unique: true,
    index: true
  },
  password: String,
  avatar: String
});

const User = mongoose.model('User', UserSchema);
module.exports = User;