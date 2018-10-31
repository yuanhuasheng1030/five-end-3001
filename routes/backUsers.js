var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");
// router.post('/', async function (req, res) {
//     let page=req.body.page;
//     let rows=req.body.rows;
//     let data = await client.get('/users', { page,rows,"status":"1"});
//     console.log(data, 3333)
//     res.send(data); 
// })
router.post('/', async function (req, res) {
    let re = req.body;
    let type = re.type;
    let value = re.value;
    let page = re.page;
    let rows = re.rows;
    if (re.type) {
        let obj={}
        obj[type]=value
        let data = await client.get("/users", {page,rows,"status":"1",...obj});
        res.send(data);
    } else {
        let data = await client.get("/users",{page,rows,"status":"1"});
        res.send(data);

        // db.collection("students").findByPage(parseInt(page), parseInt(rows), function (data) {
        //     res.send(data);
        // });
    }
    // let student = [{ name: "张三", gender: "女", age: 18 }, { name: "李四", gender: "男", age: 28 }, { name: "赵云", gender: "男", age: 20 }, { name: "张飞", gender: "女", age: 18 }]
    // res.send(student);
});
router.post('/noCheck', async function (req, res) {
    let page=req.body.page;
    let rows=req.body.rows;
    let data = await client.get('/users', { page,rows,"status":"0"});
    console.log(data, 3333)
    res.send(data); 
})
router.post('/Checknopass', async function (req, res) {
    let page=req.body.page;
    let rows=req.body.rows;
    let data = await client.get('/users', { page,rows,"status":"2"});
    console.log(data, 3333)
    res.send(data); 
})
router.post('/confirm', async function (req, res) {
    let body=req.body;
    let username=body.username;
    let id = body.id;
    let password = body.password;
    let privilege = body.privilege
    let data = await client.put("/users/" + id, {username,password,privilege});
    res.send(data);
});
router.post('/add', async function (req, res) {
    
    let body = req.body;
    console.log(body,"body")
    body.status="1";
    let data = await client.post("/users",body);
    console.log(data,123456789)
    res.send('succ');
});
router.delete('/:id', async function (req, res) {
    let id = req.params.id;
    await client.delete("/users/" + id);
    res.send('succ');
    // db.collection("students").remove({ _id: db.ObjectID(id) }, function () {
    //     res.send('succ');
    // });
});
router.post('/pass', async function (req, res) {
    let id =req.body.id;
    let data = await client.put('/users/'+id, { "status": "1" });
    console.log(data, 3333)
    res.send('succ');
  
})
router.post('/nopass', async function (req, res) {
    let id =req.body.id;
    let data = await client.put('/users/'+id, { "status": "2" });
    console.log(data, 3333)
    res.send('succ');
  
})
module.exports = router;
