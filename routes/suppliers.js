var express = require('express');
var router = express.Router();
// const db = require("ykt-mongo");
const client = require("ykt-http-client");
client.url("localhost:8080");
//渲染和查询
router.get("/suppliers",async function(req,res){
    //设置允许跨域
    // res.setHeader("Access-Control-Allow-Origin","*"); 
    // res.setHeader("Access-Control-Allow-Methods","GET,POST");
    let {type,value,page,rows} = req.query;
    let searchObj = {};
    if(type){
        searchObj[type] = value;
    }
    console.log(searchObj);
    let data = await client.get("/suppliers",{page,rows,...searchObj});
    console.log(data,00);
    res.send(data);
    // db.collection("students").findByPage(parseInt(page),parseInt(rows),searchObj,function(data){
    //     res.send("callback("+JSON.stringify(data)+")");
    // });
});




// router.post('/suppliers', async function (req, res) {
//     let re = req.body;
//     let type = re.type;
//     let value = re.value;
//     console.log(re,999999999999999)
//     let page = re.page;
//     let rows = re.rows;

    //page和rows是字符串，要转换成数字
    // console.log(types, text);
    // if (re.type) {
    //     let obj={}
    //     obj[type]=value
        //json对象里面的键名如果是变量要加中括号，值不用加中括号
        // 正则表达式中使用变量。一定要使用eval将组合的字符串进行转换，例如：eval("/" +text +"/")
        // db.collection("students").findByPage(parseInt(page), parseInt(rows), { [types]: eval(`/${text}/`) }, function (data) {
        //     res.send(data);
        // });
        // let data = await client.get("/suppliers", {page,rows,...obj});
        // res.send(data);
        // console.log(data,222222222222222)

    // } else {
    //     let data = await client.get("/suppliers",{page,rows});
    //     res.send(data);
    //     console.log(data,11111111111111);
        // db.collection("students").findByPage(parseInt(page), parseInt(rows), function (data) {
        //     res.send(data);
        // });
    // }
    // let student = [{ name: "张三", gender: "女", age: 18 }, { name: "李四", gender: "男", age: 28 }, { name: "赵云", gender: "男", age: 20 }, { name: "张飞", gender: "女", age: 18 }]
    // res.send(student);
// });
//添加
router.post('/', async function (req, res) {
    let body = req.body;
    let data = await client.post("/suppliers", body);
    res.send('succ');
    // db.collection("students").insert(body, function () {
    //     res.send('succ');
    // });
});
//删除
router.delete('/:id', async function (req, res) {
    let id = req.params.id;
    await client.delete("/suppliers/" + id);
    res.send('succ');
    // db.collection("students").remove({ _id: db.ObjectID(id) }, function () {
    //     res.send('succ');
    // });
});
//修改
router.post('/change', async function (req, res) {
    let id = req.body.id;

    let data = await client.get("/suppliers/" + id);
    res.send(data);
    // db.collection("students").find({ _id: db.ObjectID(id) }, function (data) {
    //     res.send(data);
    //     // console.log(data);
    // });
});
//确认修改
router.put('/:id',async function(req,res){
    let id = req.params.id;
    let {name,phone,addr,isChecked} = req.body;
    await client.put("/suppliers/"+id,{name,phone,addr,isChecked});
    res.send("suc");
});
router.get('/', async function (req, res) {
    let data = await client.get("/suppliers");
    res.send(data);
});

router.get('/:id',async function(req,res){
    let id = req.params.id;
    let data = await client.get('/suppliers/'+id);
    res.send(data);
    // db.collection("students").find({_id:db.ObjectID(id)},function(data){
    //     res.send(data[0]);
    // });
})

module.exports = router;