var express = require('express');
var router = express.Router();
var Category = require('../../models/Category');

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
 * 查询分类列表
 */
router.post('/list',function(req,res,next){
    var pageSize = +req.body.pageSize||10;
    var pageNum = +req.body.pageNum||1;
    var limit = pageSize;
    var skip = pageSize*(pageNum-1);
    var pages = 0;
    /* 
     * 查询分类总数
     */
    Category.count().then((total) => {
        // 计算总页数
        pages = Math.ceil(total/pageSize)
        /* 
         * 1：升序
         * -1：降序
         */
        Category.find().sort({_id:-1}).limit(limit).skip(skip).then((list)=>{
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
 * 新增分类
*/
router.post('/add',function(req,res,next){
    var categoryName = req.body.categoryName;
    Category.findOne({
        categoryName: categoryName
    }).then(function(categoryInfo){
        if(categoryInfo){
            // 数据库中有该记录
            responseData.code = 201;
            responseData.message = '分类名称已经存在！';
            res.json(responseData);
            return;
        }
        // 保存分类的信息到数据库
        var category = new Category({
            categoryName: categoryName
        })
        return category.save();
    }).then(function(newCategoryInfo){
        responseData.code = 200;
        responseData.message = '新增成功';
        res.json(responseData);
    })
})

/* 
 * 删除分类
*/
router.get('/delete',function(req,res,next){
    var _id = req.query._id || '';
    Category.remove({
        _id: _id
    }).then(function(){
        responseData.code = 200;
        responseData.message = '删除成功';
        res.json(responseData);
    })
})
/* 
 * 通过id查询分类
*/
router.post('/info',function(req,res,next){
    var _id = req.body._id;
    Category.findOne({
        _id: _id
    }).then(function(categoryInfo){
        responseData.code = 200;
        responseData.message = '成功';
        responseData.data = categoryInfo;
        res.json(responseData);
    })
})

/* 
 * 编辑分类
*/
router.post('/edit',function(req,res,next){
    var _id = req.body._id;
    var categoryName = req.body.categoryName;
    Category.findOne({
        _id: _id
    }).then(function(categoryInfo){
        if(!!!categoryInfo){
            responseData.code = 201;
            responseData.message = '要修改的分类信息不存在！';
            res.json(responseData);
            return Promise.reject();
        }else{
            // 当用户没有做任何修改提交的时候
            if(categoryName == categoryInfo.categoryName){
                responseData.code = 200;
                responseData.message = '修改成功';
                res.json(responseData);
                return Promise.reject();
            }else{
                // 要修改的分类名称是不是已经在数据库中存在
                return Category.findOne({
                    _id: {$ne:_id},
                    categoryName: categoryName
                })
            }
        }
    }).then(function(sameCategory){
        if(!!sameCategory){
            responseData.code = 201;
            responseData.message = '数据库中已经存在同名的分类';
            res.json(responseData);
            return Promise.reject();
        }else{
            return Category.update({
                _id: _id
            },{
                categoryName: categoryName
            })
        }
    }).then(function(data){
        responseData.code = 200;
        responseData.message = '修改成功';
        res.json(responseData);
    })

})
module.exports = router;