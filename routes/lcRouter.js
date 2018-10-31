var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
var lodash = require("lodash");
const multiparty = require('multiparty');
const path = require('path');
client.url("127.0.0.1:8080");

// router.get("/",async function(req,res){
//     //设置允许跨域
//     // res.setHeader("Access-Control-Allow-Origin","*"); 
//     // res.setHeader("Access-Control-Allow-Methods","GET,POST");
 
//     console.log("44",req.query);
    
//     // let {type,value,page,rows} = req.query;
//     // let searchObj = {};
//     // if(type){
//     //     searchObj[type] = value;
//     // }
//     // ,{page,rows,submitType:'findJoin',ref:"classes",...searchObj}
//     let data = await client.get("/orders");
//     console.log(data,"22");
      
//     res.send(data);    
// });

//增加门店
router.post('/',async function(req,res){
    
    let body = req.body;
    body.user= {
        $ref:"users",
        $id:body.id
        
    }
    // console.log("13",body);
    
    await client.post("/shops",body);
    res.send("suc");
});

router.post('/upload', function (req, res) {
    let form = new multiparty.Form({ uploadDir: './public/upload' })
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send(err)
        } else {
            console.log('1',files.file[0].path);
            
            res.send(path.basename(files.file[0].path));

        }
    })
})

router.get("/rooms/:id", async function (req, res) {
    let id = req.params.id;
    let shops = await client.get("/shops/" + id);
    res.send(shops);
})

//显示主界面数据
router.get("/", async function (req, res) {
    let {
        // searchData,
        orderStatus,
        page,
        rows
    } = req.query;
    // if (searchData) {
    //     res.send(searchData);
    //     return;
    // }
    // console.log("11");

    console.log( page,rows,orderStatus,"1111");
    
    let data = await client.get('/orders', {
        orderStatus,
        page,rows,
        submitType: 'findJoin',
        ref: ["shops","goods","services","petsKeepers"],
        // ...searchData
    });
    // console.log(data,"22");
    res.send(data);
})
router.get("/lcpay", async function (req, res) {
    let {
        // searchData,
        orderStatus,
        page,
        rows
    } = req.query;
    // if (searchData) {
    //     res.send(searchData);
    //     return;
    // }
    // console.log("11");

    console.log(orderStatus,"1111");
    
    let data = await client.get('/orders', {
        orderStatus,
        page,rows,
        submitType: 'findJoin',
        ref: ["shops","goods","services","petsKeepers"],
        // ...searchData
    });


    res.send(data);
})
//删除
router.delete('/:id',async function(req,res){
    let id = req.params.id; 
   
     
    await client.delete('/orders/'+id);
    // let data = await client.get('/orders', {
        
    //     submitType: 'findJoin',
    //     ref: ["shops","goods","services","petsKeepers"],
    //     // ...searchData
    // });
    // res.send(data);
    res.send("suc");
});

router.get('/classesTotal',async function(req,res){
    let studentData = await client.get("/students",{submitType:'findJoin',ref:"classes"});    
    let classesData = await client.get("/classes");
    // console.log("classesData",studentData);
    let axisData = [];
    let seriesData = [];
    classesData.forEach(function(ele){
        let count = 0;
        for(let stu of studentData){
            if(stu.classes._id == ele._id){
                count ++;
            }
        }
        axisData.push(ele.name);
        seriesData.push(count);
    });
   
    //统计每个班级的人数
    res.send({axisData,seriesData});
});
//统计各个年龄段的人数
router.get('/ageTotal',async function(req,res){
    let data = await client.get("/students");
    let axisData = ["18岁以下","18到30岁","30岁以上"];
    let seriesData = [{name:"18岁以下",value:0},{name:"18到30岁",value:0},{name:"30岁以上",value:0}];
    data.forEach(function(ele){
        if(ele.age < 18){
            seriesData[0].value++;
        }
        else if(ele.age >= 18 && ele.age <= 30){
            seriesData[1].value++;
        }else{
            seriesData[2].value++;
        }
    });
    res.send({axisData,seriesData});
});
module.exports = router;