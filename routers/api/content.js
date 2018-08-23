var express = require('express');
var router = express.Router();
var Content = require('../../models/Content');

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
 * 查询内容列表
 */
router.post('/list',function(req,res,next){
    var pageSize = +req.body.pageSize||10;
    var pageNum = +req.body.pageNum||1;
    var limit = pageSize;
    var skip = pageSize*(pageNum-1);
    var pages = 0;

    

    var where = {};
    if(!!req.body.categoryId){
        where.category = req.body.categoryId
    }
    /* 
     * 查询分类总数
     */
    Content.where(where).count().then((total) => {
        // 计算总页数
        pages = Math.ceil(total/pageSize);
        /* 
         * 1：升序
         * -1：降序
         * populate的参数对应的是schema里边的关联字段名称
         */
        Content.where(where).find().sort({_id:-1}).limit(limit).skip(skip).populate(['category','user']).then((list)=>{
            responseData.code = 200;
            responseData.message = '成功';
            responseData.data = {};
            responseData.data.list = list;
            responseData.data.total = total;
            responseData.data.pages = pages;
            res.json(responseData);
        })
    })
})

/* 
 * 新增内容
*/
router.post('/add',function(req,res,next){
    new Content({
        category: req.body.category,
        contentName: req.body.contentName,
        description: req.body.description,
        content: req.body.content,
        user: req.body.user        
    }).save().then(function(data){
        responseData.code = 200;
        responseData.message = '保存成功';
        res.json(responseData);
    })
})

/* 
 * 删除分类
*/
router.get('/delete',function(req,res,next){
    var _id = req.query._id || '';
    Content.remove({
        _id: _id
    }).then(function(){
        responseData.code = 200;
        responseData.message = '删除成功';
        res.json(responseData);
    })
})
/* 
 * 通过id查询内容
*/
router.post('/info',function(req,res,next){
    var _id = req.body._id;
    Content.findOne({
        _id: _id
    }).populate(['category','user']).then(function(contentInfo){
        responseData.code = 200;
        responseData.message = '成功';
        responseData.data = contentInfo;
        res.json(responseData);
    })
})

/* 
 * 编辑内容
*/
router.post('/edit',function(req,res,next){
    var _id = req.body._id;
    var contentName = req.body.contentName;
    
    var editObj = {};
    for(var key in req.body){
        editObj[key] = req.body[key];
    }
    Content.findOne({
        _id: _id
    }).then(function(contentInfo){
        if(!!!contentInfo){
            responseData.code = 201;
            responseData.message = '要修改的内容信息不存在！';
            res.json(responseData);
            return Promise.reject();
        }else{
            return Content.update(
                {_id: _id},
                editObj
            )
        }
    }).then(function(data){
        responseData.code = 200;
        responseData.message = '修改成功';
        res.json(responseData);
    })

})

/* 
 * 新增评论
 */
router.post('/addComment',function(req,res,next){
    var contentId = req.body.contentId||'';
    var postData = {
        userName: req.body.userName,
        postTime: new Date(),
        content: req.body.content
    }

    // 查询内容
    Content.findOne({
        _id: contentId
    }).then(function(data){
        data.comments.push(postData);
        return data.save()
    }).then(function(newData){
        responseData.message = '评论成功';
        responseData.code = 200;
        responseData.data = newData;
        res.json(responseData);
    })
})




module.exports = router;