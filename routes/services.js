var express = require('express');
var router = express.Router();
const client = require('ykt-http-client');
client.url("127.0.0.1:8080");
//查询所有服务
router.get("/",async function(req, res){
    let {name, value, page, rows, username, shopName} = req.query;
    let searchObj = {};

    if(!shopName){
        shopName = "xxsdfwe123123213"
    }
    console.log(shopName);
    if(name){
        searchObj[name]= value;
    }
    let data = await client.get('/services',{page,rows, username, shopName, ...searchObj});
    res.send(data);
})
//查询指定服务
router.get("/:id", async function(req, res){
    let id = req.params.id;
    let data = await client.get('/services/'+id);
    res.send(data);
})
//新增服务
router.post("/",async function(req, res){
    let newService = req.body.newService;
    await client.post('/services', newService);
    res.send('suc');
})
//删除服务
router.delete("/:id", async function(req, res){
    let id = req.params.id;
    await client.delete('/services/'+ id);
    res.send('suc');
})
//修改服务
router.put("/:id", async function(req, res){
    let id = req.params.id;
    await client.put('/services/'+id,req.body);
    res.send('suc'); 
})
module.exports = router;