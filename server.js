const express = require('express');
const app = express();
// 读取配置文件
const config = require('config-lite')(__dirname);

// 导入session模块
const session = require('express-session');
// 用于保存session到数据库中防止服务器关闭后丢失保存在服务器内存中的状态
const MongoStore = require('connect-mongo')(session);

// const path = require('path');
// 引入formidable
const formidable = require('express-formidable');
// 路由汇入
const routers = require('./routers');

// 配置静态目录
app.use(express.static('./src'));

// 配置session
app.use(session({
  resave:config.session.resave,
  saveUninitialized:config.session.saveUninitialized,
  secret:config.session.secret,
  cookie:config.session.cookie,
  // session存储位置
  store:new MongoStore({url:config.db})
}));

// 配置formidable上传文件
app.use(formidable({
  encoding:'utf-8',
  uploadDir:'./upload',
  keepExtensions:true
}))

// 路由处理
routers(app);



app.listen(1000);