const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/disk', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

router.get('/signUp', (req, res) => {
  res.sendFile(path.join(__dirname,'../src/signup_page.html'));
})

module.exports = router;