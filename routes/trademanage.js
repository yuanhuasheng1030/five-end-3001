var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
var lodash = require("lodash");
client.url("127.0.0.1:8080");

router.get('/table', async function (req, res) {
    let id = req.query.id;
    let data = await client.get('/shops', );
    data = lodash.filter(data, function (o) {
        return o.user.$id == id
    })
    res.send(data);
});

router.get('/delete', async function (req, res) {
    let index = req.query.index;
    let data = await client.get('/shops/' + req.query.id, );
    data.shopGoods.splice(index, 1)
    data = await client.put("/shops/" + req.query.id, {
        shopGoods: data.shopGoods
    });
    res.send(data);
});
router.get('/table/shops', async function (req, res) {
    let id = req.query.id;
    let type = req.query.type;
    let value = req.query.value;
    let page = req.query.page;
    let rows = req.query.rows;
    let data = await client.get('/shops/' + id);
    let datas = {};
    let num = data.shopGoods.length
    if (type) {
        data = data.shopGoods;
        data = lodash.filter(data, function (o) {
            return o.productCategory == type
        });
        datas.ary = lodash.chunk(data, rows)[page - 1];
        datas.num = num;
        data=datas
        res.send(data);
    } else {
        datas.ary = lodash.chunk(data.shopGoods, rows)[page - 1];
        datas.num = num;
        datas.page={page,rows};
        data = datas
        res.send(data);
    }

});
//添加
router.post('/add', async function (req, res) {
    let body = req.body;
    let data = await client.get("/shops/" + body.id);
    data.shopGoods = data.shopGoods || [];
    data.shopGoods.push(body);
    data = await client.put("/shops/" + body.id, {
        shopGoods: data.shopGoods
    });
    res.send(data);
});
router.get('/alter', async function (req, res) {
    let body = req.query;
    let data = await client.get("/shops/" + body.id);
    data.shopGoods[body.index] = body
    data = await client.put("/shops/" + body.id, {
        shopGoods: data.shopGoods
    });
    res.send(data);
});
//供应商查询
router.get('/gys', async function (req, res) {
    let data = await client.get('/suppliers');
    res.send(data);
});
//修改个样商品
router.get('/good', async function (req, res) {
    let re = req.query
    let id = re.id;
    let index = re.index;
    let data = await client.get('/shops/' + id);
    data = data.shopGoods[index]
    data.index = index;

    res.send(data);
});

module.exports = router;