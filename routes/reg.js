var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");
//手机号
router.get('/phone', async function (req, res) {
    let phone = req.query.phone;
    console.log(phone)
    let data = await client.get('/users', { phone });
    if (data.length) {
        res.send({ status: 0 });
    } else {
        res.send({ status: 1 });
    }
})

//注册
router.post('/', async function (req, res) {
    let body = req.body;
    console.log(body);
    let data = await client.post("/users", body);
    res.send('succ'); 
  });
module.exports = router;