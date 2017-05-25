/**
 * 路由模块:处理用户登录注册
 */
const express = require('express');
const router = express.Router();
// 导入数据库自定义模块
const mongoConfig = require('../model/mongoConfig');
// 导入md5加密模块
const md5 = require('md5');
const path = require('path');

// 处理登陆请求
router.post('/login', (req, res) => {
  req.fields.password = md5(req.fields.password);

  mongoConfig.userModel.findOne({ 'mailId': req.fields.mailId }, (err, result) => {
    if (!err) {
      if (result) {
        if (req.fields.password == result.password) {
          res.json({ status: 1, msg: "登陆成功" });
        } else {
          res.json({ status: 0, msg: "密码错误" });
        }
      } else {
        res.json({ status: 0, msg: "用户不存在" });
      }
    }
  })

});

// 处理注册请求
router.post('/signUp', (req, res) => {
  mongoConfig.userModel.findOne({ 'mailId': req.fields.mailId }, (err, result) => {
    if (!result) {
      if (req.fields.password == req.fields.repassword) {
        delete req.fields.repassword;
        req.fields.password = md5(req.fields.password);
        const userEntity = new mongoConfig.userModel(req.fields);
        userEntity.save(err => {
          if (!err) {
            res.json({'status':1,'msg':'创建成功'});
          } else {
            res.json({ 'status': 0, 'msg': '创建失败', 'err': err });
          }
        });
      }
    } else {
      res.json({ 'status': 0, 'msg': '邮箱地址已存在'});
    }
  })
})

module.exports = router;