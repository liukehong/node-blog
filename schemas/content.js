var mongoose = require('mongoose');

// 内容的表结构
module.exports = new mongoose.Schema({
    // 关联字段 - 内容分类的id
    category: {
        // 类型
        type:mongoose.Schema.Types.ObjectId,
        // 引用的模型
        ref: 'Category'
    },
    // 关联字段你 - 用户id
    user: {
        // 类型
        type:mongoose.Schema.Types.ObjectId,
        // 引用的模型
        ref: 'User'
    },
    // 添加时间
    addTime: {
        type: Date,
        default: Date.now
    },
    //阅读量
    views: {
        type: Number,
        default: 0
    },
    // 内容标题
    contentName: String,
    // 内容简介
    description: {
        type: String,
        default: ''
    },
    // 内容
    content: {
        type: String,
        default: ''
    },
    // 评论
    comments: {
        type: Array,
        default: []
    }
});
