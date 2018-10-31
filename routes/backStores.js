var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");
router.post('/', async function (req, res) {
    let page=req.body.page;
    let rows=req.body.rows;
    let data = await client.get('/shops', { "status": "0",page,rows });
    console.log(data, 3333)
    res.send(data); 
})
router.post('/pass', async function (req, res) {
    let page=req.body.page;
    let rows=req.body.rows;
    let data = await client.get('/shops', { "status": "1",page,rows });
    console.log(data, 3333)
    res.send(data); 
})
router.post('/nopass', async function (req, res) {
    let page=req.body.page;
    let rows=req.body.rows;
    let data = await client.get('/shops', { "status": "2",page,rows });
    console.log(data, 3333)
    res.send(data); 
})
router.post('/check', async function (req, res) {
    let id =req.body.id;
    let data = await client.put('/shops/'+id, { "status": "1" });
    console.log(data, 3333)
    res.send('succ');
  
})
router.post('/nocheck', async function (req, res) {
    let id =req.body.id;
    let data = await client.put('/shops/'+id, { "status": "2" });
    console.log(data, 3333)
    res.send('succ');
  
})

module.exports = router;