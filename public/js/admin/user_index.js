var pageNum = 1;
var pageSize = 10;
var pages = 1;
var total = 0;

function fnGetList () {
    var ajaxData = {};
    var url = "/api/user/list";
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
            var type = '';
            list.forEach((item,index) => {
                type = !!item.isAdmin?'是':'否';
                str += "<tr>";
                str += "<td>"+item._id+"</td>";
                str += "<td>"+item.username+"</td>";
                str += "<td>"+item.password+"</td>";
                str += "<td>"+type+"</td>";
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