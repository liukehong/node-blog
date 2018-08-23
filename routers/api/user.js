var express = require('express');
var router = express.Router();
var User = require('../../models/User');

// 统一返回格式
var responseData;

router.use(function(req,res,next){
    responseData = {
        code: 0,
        message: ''
    }
    next();
})

/* 
 * 查询用户列表
 */

 // pageSize  10 条    pageNum 0
 // 1页  limit：pageSize  skip：pageSize*pageNum  1-10条  
 // 2页  limit：pageSize  skip：pageSize*pageNum  11-20条
router.post('/list',function(req,res,next){
    /* 
     * limit(Number)：限制获取的数据条数
     * 
     * skip(2)：忽略数据的条数，忽略前两条数据，从第三条开始
     * 
     * 每页显示2条
     * 1：1-2 skip:0
     * 2：3-4 skip:2
     */
    var pageSize = +req.body.pageSize||10;
    var pageNum = +req.body.pageNum||1;
    var limit = pageSize;
    var skip = pageSize*(pageNum-1);
    var pages = 0;



    /* 
     * 查询用户总数
     */
    User.count().then((total) => {

        // 计算总页数
        pages = Math.ceil(total/pageSize)


        User.find().sort({_id:-1}).limit(limit).skip(skip).then((users)=>{
            responseData.code = 200;
            responseData.message = '成功';
            responseData.data = {};
            responseData.data.list = users;
            responseData.data.total = total;
            responseData.data.pages = pages;
            res.json(responseData);
        })
    })

    
})

/* 
 * 用户登录
*/
router.post('/login',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    // 查询数据库中相同用户名和密码得记录是否存在，如果存在则登录成功
    User.findOne({
        username: username,
        password: password
    }).then(function(userInfo){
        if(!userInfo){
            responseData.code = 201;
            responseData.message = '用户名或密码错误！';
            res.json(responseData);
            return;
        }
        responseData.code =200;
        responseData.message = '登录成功';
        responseData.data = {
            _id:userInfo._id,
            username: username,
            isAdmin: userInfo.isAdmin
        }
        req.cookies.set('userInfo',JSON.stringify({
            _id: userInfo._id,
            username: username,
            isAdmin: userInfo.isAdmin
        }))
        res.json(responseData);
        return;
    })
})

/* 
 * 新增用户
*/
router.post('/add',function(req,res,next){
    // res.send('新增用户');
    var username = req.body.username;
    var password = req.body.password;
    
    // 用户名是否已经注册了，如果数据库中已经存在和我们要注册的用户名同名的数据，表示该用户名已经被注册了
    User.findOne({
        username: username
    }).then(function( userInfo ){
        if(userInfo){
            // 数据库中有该记录
            responseData.code = 201;
            responseData.message = '该用户已经注册！';
            res.json(responseData);
            return;
        }
        // 保存用户注册的信息到数据库
        var user = new User({
            username: username,
            password: password
        });
        return user.save();
    }).then(function(newUserInfo){
        responseData.code = 200;
        responseData.message = '注册成功';
        res.json(responseData);
    });
    // res.json(responseData);
})
router.get('/delete',function(req,res,next){
    res.send('删除用户');
})
router.get('/edit',function(req,res,next){
    res.send('编辑用户');
})
router.get('/infoById',function(req,res,next){
    res.send('通过id查询用户');
})
module.exports = router;