// 获取分类列表
(function fnGetCategoryList () {
    var ajaxData = {};
    var url = "/api/category/list";
    ajaxData = {
        pageSize: 100,
        pageNum: 1
    }
    $.ajax({
        url: url,
        type: 'post',
        data: ajaxData,
        dataType: 'json',
        success: function(res){
            var list = [];
            if(res.code == 200){
                list = res.data.list;
            }
            var str = '';
            list.forEach((item,index) => {
                str += "<option value='"+item._id+"'>"+item.categoryName+"</option>";
            })

            $(".category").html(str);
        }
    })
})();

// 添加内容
$(".fnAddContent").click(function(){
    var ajaxData = {};
    var url = "/api/content/add";
    ajaxData = {
        category: $(".category").val(),
        contentName: $(".contentName").val(),
        description: $(".description").val(),
        content: $(".content").val(),
        user: globalData.userInfo._id,
    }
    $.ajax({
        url: url,
        type: 'post',
        data: ajaxData,
        dataType: 'json',
        success: function(res){
            if(res.code == 200){
                alert(res.message);
                window.location.href = '/admin/content';
            }else{
                alert(res.message);
            }
        }
    })
});