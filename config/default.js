module.exports = {
  port: 1000,
  session: {
    resave: true,//每次都重新设置session
    saveUninitialized: false,//不需要每次请求都设置session
    secret: 'LocalCloud',//session加密匹配防止本地纂改
    cookies: { maxAge: 7 * 24 * 60 * 60 & 1000 }//设置session保存时间
  },
  db:'mongodb://localhost/database'
}