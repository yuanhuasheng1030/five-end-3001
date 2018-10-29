var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
var lodash = require("lodash");
client.url("127.0.0.1:8080");

// router.get('/find', async function (req, res) {
//     let rows = req.query.rows;
//     let page = req.query.page;
//     console.log(rows,page);
//     let data = await client.get('/films',{page,rows});
//     console.log(data);
//     res.send(data);
// });
router.get('/room', async function (req, res) {
    let re = req.query
    let page = re.page;
    let rows = re.rows;
    console.log(1,page,rows);
    
    let data = await client.get('/films',{page,rows});
    res.send(data);
});
router.get('/rooms', async function (req, res) {
    let re = req.query
    let _id = re.id;
    let data = await client.get('/films');
    data=lodash.find(data,{_id});
    res.send(data);
});
router.get('/waitShow', async function (req, res) {
    let re = req.query
    let page = re.page;
    let rows = re.rows;
    console.log(1,page,rows);
    
    let data = await client.get('/coons',{page,rows});
    res.send(data);
});

module.exports = router;