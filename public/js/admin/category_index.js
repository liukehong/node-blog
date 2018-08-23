var pageNum = 1;
var pageSize = 10;
var pages = 1;
var total = 0;

function fnGetList () {
    var ajaxData = {};
    var url = "/api/category/list";
    ajaxData = {
        pageSize: pageSize,
        pageNum: pageNum
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
                pages = +res.data.pages;
                total = +res.data.total;
            }
            var str = '';
            list.forEach((item,index) => {
                str += "<tr>";
                str += "<td>"+item._id+"</td>";
                str += "<td>"+item.categoryName+"</td>";
                str += "<td>";
                str += "<a href='/admin/category/edit?id="+item._id+"' style='padding-right: 10px;'>修改</a>|"
                str += "<a class='deleteBtn' data-id='"+item._id+"' style='padding-left: 10px; cursor:pointer;'>删除</a>"
                str += "</td>";
                str += "</tr>";
            })

            $(".tableList").html(str);
            $(".pageTotal").html(total);
            $(".pageSize").html(pageSize);
            $(".pages").html(pages);
            $(".pageNum").html(pageNum);
        }
    })
}
fnGetList();


// 删除分类
var deleteId = null;
$(".isDelete").click(function(){
    var url = "/api/category/delete?_id="+deleteId;
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        success: function(res){
            $("#deleteModal").modal("hide");
            if(res.code == 200){
                alert(res.message);
                fnGetList();
            }else{
                alert(res.message)
            }
        }
    })
})

$(".tableList").on('click','.deleteBtn',function(){
    deleteId = $(this).attr("data-id");
    $("#deleteModal").modal("show");
})

// 上一页
$(".preveBtn").click(function(){
    if(pageNum == 1){
        return false;
    }
    pageNum = pageNum - 1;
    fnGetList();
})

// 下一页
$(".nextBtn").click(function(){
    if(pageNum == pages){
        return false;
    }
    pageNum = pageNum + 1;
    fnGetList();
})