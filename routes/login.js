var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");


//登录部分
router.post("/lg",async function (req, res) {
  let body = req.body;
//   console.log("测试接收请求数据：",body.phone,body.pwd);
  let data = await client.get('/users', { userphone:body.phone,password:body.pwd});
      console.log(data[0]);
      if (data.length > 0) {
          if(data[0].privilege == "1"){   // console.log("管理员身份")
                req.session.user = data[0]; 
                res.send({ status: 0 });//匹配 平台 管理员成功
            //   console.log(data[0])
             
          }else if(data[0].privilege == "0"){   // console.log("商户身份")
                req.session.user = data[0];
                data[0].status=1
                res.send(data[0]);//匹配 商户成功
               
          }
        
        
      } else {
        res.send({ status: 2 });//匹配失败
      }

})
    module.exports = router;