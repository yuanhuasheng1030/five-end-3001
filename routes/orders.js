var express = require('express');
var router = express.Router();
const client = require('ykt-http-client');
client.url("127.0.0.1:8080");
//获取所有订单
router.get('/', async function (req, res) {
    let data = await client.get('/orders', {
        submitType: 'findJoin',
        ref: ["petsKeepers", "shops", "goods", "services"]
    });
    let monthDataAxisData = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    let monthDataSeriesData = [];
    let typeDataAxisData = ["商品", "服务"];
    let typeDataSeriesData = [];
    let sum;
    let goodsTotalMoney = 0;
    let servicesTotalMoney = 0;
    for (let i = 1; i <= 12; i++) {
        sum = 0;
        data.forEach(element => {
            if (parseInt(element.serviceTime.split("-")[1]) == i) {
                sum += (element.goodsTotalMoney + element.serviceMoney)
            }
            if(i==12){
                goodsTotalMoney += element.goodsTotalMoney;
                servicesTotalMoney += element.serviceMoney;
            }
        });
        monthDataSeriesData.push(sum);
    }
    typeDataSeriesData.push(goodsTotalMoney, servicesTotalMoney);
    res.send({
        monthDataAxisData,
        monthDataSeriesData,
        typeDataAxisData,
        typeDataSeriesData
    });
})
module.exports = router;