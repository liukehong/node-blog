var _id = null; // 分类id
var _href = window.location.href;
_id = _href.split("?")[1].split("=")[1];


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

            fnGetInfo();
        }
    })
})();
function fnGetInfo () {
    var ajaxData = {};
    var url = "/api/content/info";
    ajaxData = {
        _id: _id
    }
    $.ajax({
        url: url,
        type: 'post',
        data: ajaxData,
        dataType: 'json',
        success: function(res){
            if(res.code == 200){
                $(".contentName").val(res.data.contentName);
                $(".category").val(res.data.category._id);
                $(".description").val(res.data.description);
                $(".content").val(res.data.content);

            }
        }
    })
}


$(".fnEditContent").click(function(){
    var ajaxData = {};
    var url = "/api/content/edit";
    ajaxData = {
        _id: _id,
        contentName: $(".contentName").val(),
        category: $(".category").val(),
        description: $(".description").val(),
        content: $(".content").val(),
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

    return false;
})


$(".fnGoBack").click(function(){
    window.location.href = '/admin/content'
    return false;
});
