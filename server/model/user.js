const crypto = require('crypto');

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
  username: {
    type: String,
    unique: true,
    required: true
  },
  // password: String,
  email: {
    type: String,
    lowercase: true,
    unique: true
  },
  phone: {
    type: Number,
    unique: true
  },
  hashedPassword: String,
  avatar: String,
  authorization: String,
  status: {
    type: Number,
    default: 0
  },
  // salt: String,
  // role: {
	// 	type : String ,
	// 	default : 'user'
	// },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  },
  lastLoginTime: {
    type: Date,
    default: Date.now
  }
});

/**
 * virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// UserSchema
//   .virtual('userInfo')
//   .get(function() {
//     return {
//       username: this.username,
//       role: this.role,
//       email: this.email,
//       avatar: this.avatar,
//       phone: this.phone
//     }
//   });

// UserSchema
//   .virtual('token')
//   .get(function() {
//     return {
//       '_id': this._id,
//       'role': this.role
//     }
//   });

/**
 * methods
 */
UserSchema.methods = {
  // 检查用户权限
  hasRole(role) {
    var selfRoles = this.role;
    return (selfRoles.indexOf('admin') !== -1 || selfRoles.indexOf(role) !== 1);
  },
  //验证用户密码
	authenticate(plainText) {
	  return this.encryptPassword(plainText) === this.hashedPassword;
	},
	//生成盐
	makeSalt() {
	  return crypto.randomBytes(16).toString('base64');
	},
	//生成密码
	encryptPassword(password) {
	  if (!password || !this.salt) return '';
	  var salt = Buffer.from(this.salt, 'base64');
	  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64');
	}
};

UserSchema.pre('save', (next) => {
  UserSchema.updateTime = new Date();
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
