var express = require('express');
var router = express.Router();

// 前台首页
router.get('/',function(req,res,next){
    res.render('main/index',{
        userInfo: req.userInfo
    });
})

// 内容详情页
router.get('/content',function(req,res,next){
    res.render('main/content');
})

module.exports = router;