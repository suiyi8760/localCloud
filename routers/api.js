const express = require('express');
const router = express.Router();

// 处理用户登录注册等相关路由
router.use('/user', require('./user'))

module.exports = router;