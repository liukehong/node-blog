var _id = null; // 分类id
var _href = window.location.href;
_id = _href.split("?")[1].split("=")[1];

(function fnGetInfo () {
    var ajaxData = {};
    var url = "/api/category/info";
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
                $(".categoryName").val(res.data.categoryName);
            }
        }
    })
})();


$(".fnEditCategory").click(function(){
    var ajaxData = {};
    var url = "/api/category/edit";
    ajaxData = {
        _id: _id,
        categoryName: $(".categoryName").val()
    }
    $.ajax({
        url: url,
        type: 'post',
        data: ajaxData,
        dataType: 'json',
        success: function(res){
            if(res.code == 200){
                alert(res.message);
                window.location.href = '/admin/category';
            }else{
                alert(res.message);
            }
        }
    })

    return false;
})


$(".fnGoBack").click(function(){
    window.location.href = '/admin/category'
    return false;
});
