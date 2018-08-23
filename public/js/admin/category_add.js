$(".fnAddCategory").click(function(){
    var ajaxData = {};
    var url = "/api/category/add";
    ajaxData = {
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
})