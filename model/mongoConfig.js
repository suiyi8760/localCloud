/**
 * 配置数据库
 */

const mongoose = require('mongoose');

const db = mongoose.createConnection('localhost','database');

db.on('error',()=>{
  console.log('数据库连接错误');
})

db.once('open',()=>{
  console.log('数据库连接成功');
})

// 配置数据表结构
const usersSchema = new mongoose.Schema({
  mailId:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  username:{
    type:String
  },
  age:{
    type:Number,
    min:1,
    max:150
  },
  graSrc:{
    type:String
  }
})

// 配置数据模型
const userModel = db.model('user',usersSchema,'users');

// 模块暴露
module.exports.userModel = userModel;