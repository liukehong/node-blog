var express = require('express');
var router = express.Router();

/* router.use(function(req,res,next){
    if(!req.userInfo.isAdmin){
        // 如果当前用户非管理员
        res.send('对不起，只有管理员才可以进入后台管理');
        return
    }
    next();

}) */

/* 
 * 首页
 */
router.get('/',function(req,res,next){
    res.render('admin/index')
})

/* 
 * 用户管理
 */
router.get('/user',function(req,res,next){
    res.render('admin/user_index');
})

/* 
 * 分类首页
 */
router.get('/category',function(req,res,next){
    res.render('admin/category_index');
})

/* 
 * 分类添加
 */
router.get('/category/add',function(req,res,next){
    res.render('admin/category_add');
})

/* 
 * 分类编辑
 */
router.get('/category/edit',function(req,res,next){
    res.render('admin/category_edit');
})

/* 
 * 内容首页
 */
router.get('/content',function(req,res,next){
    res.render('admin/content_index');
})

/* 
 * 内容添加
 */
router.get('/content/add',function(req,res,next){
    res.render('admin/content_add');
})

/* 
 * 内容编辑
 */
router.get('/content/edit',function(req,res,next){
    res.render('admin/content_edit');
})




module.exports = router;