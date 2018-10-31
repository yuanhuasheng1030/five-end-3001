var express = require('express');
var router = express.Router();
const multiparty = require('multiparty');
const path = require('path');

//获取用户
router.get('/getSession', function (req, res, next) {
  // console.log("测试session",req.session.user)
  res.send(req.session.user || {});
})
//删除用户
router.get('/removeSession', function (req, res) {
  req.session.user = {};
  res.send('设置成功');
});



router.post('/upload', function (req, res) {
  let form = new multiparty.Form({ uploadDir: './public/upload' })
  form.parse(req, function (err, fields, files) {
    console.log(files,2341234)
      if (err) {
          res.send(err)
      } else {
          res.send(path.basename(files.uploadHeader[0].path));
      }
  })
});
module.exports = router;
