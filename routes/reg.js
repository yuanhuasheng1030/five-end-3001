var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

//注册
router.get('/rg', async function (req, res) {
    let phoneNum = req.query.phone;
    // console.log(phoneNum);
    let data = await client.get('/users', { userphone: phoneNum });
    // console.log(data);
    if (data.length > 0) {
        res.send({ status: 1 }); //该号码已注册
      } else {
        res.send({ status: 0 }); // 未注册
      }
});

//存入输入的手机号码
router.post('/put', async function (req, res) {
    let body = req.body;
      await client.post("/users", { username: body.username,userphone:body.phone, password: body.password, privilege:"0", status :"0"});
      res.send("success");
  })
module.exports = router;