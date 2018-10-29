var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");
router.post('/', async function (req, res) {
    let phone = req.body.phone;
    let pwd = req.body.pwd;
    console.log(11,phone,pwd)
 
    let data = await client.get('/users', { phone, pwd });
    console.log(data,3333)
    if (data.length) {
    //   req.session.user = { phone, password };
      res.send({ status: 0 });
    } else {
      res.send({ status: 1 });
    }
})
    module.exports = router;