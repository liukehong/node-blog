

/* 登录注册的切换 */
// 去注册
$(".toRegBtn").click(function(){
    fnInit(1);
});
// 去登录
$(".toEnterBtn").click(function(){
    fnInit(2);
});
// 退出
$(".outBtn").click(function(){
    fnInit(3);
})
// 初始化右侧操作框
function fnInit(t) {
    var type = t;
    var $loginBox = $(".loginBox");
    var $otherBox = $(".otherBox");
    var $regBox = $(".regBox");
    var $welcomText1 = $(".welcomText1");
    var $welcomText2 = $(".welcomText2");
    // 注册
    if(type == 1){
        $loginBox.addClass("hide");
        $otherBox.addClass("hide");
        $regBox.removeClass("hide");
        return false;
    }
    // 登录
    if(type == 2){
        $regBox.addClass("hide");
        $otherBox.addClass("hide");
        $loginBox.removeClass("hide");
        return false;
    }
    // 退出
    if(type == 3){
        $loginBox.removeClass("hide");
        $otherBox.addClass("hide");
        $regBox.addClass("hide");
        window.localStorage.removeItem("userInfo");
        return false;
    }
    // 信息
    if(type == 4) {
        $loginBox.addClass("hide");
        $otherBox.removeClass("hide");
        $regBox.addClass("hide");
        var isAdmin = JSON.parse(window.localStorage.getItem('userInfo')).isAdmin;
        if(!!isAdmin){
            $welcomText1.addClass("hide");
            $welcomText2.removeClass("hide");
        }else{
            $welcomText2.addClass("hide");
            $welcomText1.removeClass("hide");
        }


        window.location.reload();


        return false;
    }
    if(window.localStorage.getItem('userInfo')){
        $loginBox.addClass("hide");
        $regBox.addClass("hide");
        $otherBox.removeClass("hide");
        var isAdmin = JSON.parse(window.localStorage.getItem('userInfo')).isAdmin;
        if(!!isAdmin){
            $welcomText1.addClass("hide");
            $welcomText2.removeClass("hide");
        }else{
            $welcomText2.addClass("hide");
            $welcomText1.removeClass("hide");
        }
        $(".userName").html(JSON.parse(window.localStorage.getItem('userInfo')).username);
        return false;
    }
}
fnInit();
/* 注册 */
$(".regBtn").click(function(){
    var ajaxData = {};
    var url = "/api/user/add";
    ajaxData = {
        username: $(".regBox .regName").val(),
        password: $(".regBox .regPass").val(),
    }
    $.ajax({
        url: url,
        type: 'post',
        data: ajaxData,
        dataType: 'json',
        success: function(res){
            if(res.code == 200){
                alert(res.message);
            }else{
                alert(res.message);
            }
        }
    })
})
/* 登录 */
$(".enterBtn").click(function(){
    var ajaxData = {};
    var url = "/api/user/login";
    ajaxData = {
        username: $(".loginBox .enterName").val(),
        password: $(".loginBox .enterPass").val()
    }
    $.ajax({
        url: url,
        type: 'post',
        data: ajaxData,
        dataType: 'json',
        success: function(res){
            if(res.code == 200){
                alert(res.message);
                $(".userName").html(res.data.username);
                window.localStorage.setItem("userInfo",JSON.stringify(res.data));
                fnInit(4);
            }else{
                alert(res.message);
            }
        }
    })
})

/* 获取分类 */
function fnGetCategorylist () {
    var pageSize = 100;
    var pageNum = 1;
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
            if(categoryId == 'null'){
                str += "<div data-id='' class='nav-item fl active'>首页</div>";
            }else if(!!!categoryId){
                str += "<div data-id='' class='nav-item fl active'>首页</div>";
            }else{
                str += "<div data-id='' class='nav-item fl'>首页</div>";
            }
            list.forEach((item,index) => {
                if(item._id == categoryId){
                    str += "<div data-id='"+item._id+"' class='nav-item fl active'>"+item.categoryName+"</div>"
                }else{
                    str += "<div data-id='"+item._id+"' class='nav-item fl'>"+item.categoryName+"</div>"
                }
            })

            $(".wrap-nav").html(str);
        }
    })
}
fnGetCategorylist();

// 分类的点击事件
var categoryId = null;


(function typeData () {
    var _href = window.location.href;
    $(".nav-item").removeClass('active');
    // 首页的情况
    if(_href.indexOf('?') == -1){
        $(".nav-item").eq(0).addClass('active');
    }else{
        // 非首页
        var hrefList = _href.split("?")[1];
        if(hrefList.indexOf('&') == -1){
            // 只有一项
            if(hrefList.split("=")[0] == 'categoryId'){
                categoryId = hrefList.split("=")[1];
            }else{
            }
        }else{
            hrefList = hrefList.split('&');
            hrefList.forEach((item,index) => {
                if(item.split("=")[0] == 'categoryId'){
                    categoryId = item.split("=")[1];
                }else{
                }
            })
        }
    }
})();


$(".wrap-nav").on('click','.nav-item',function(){
    /* if($(this).hasClass('active')){
        return false;
    } */
    categoryId = $(this).attr("data-id");
    if(!!!categoryId){
        window.location.href = '/';
    }else{
        window.location.href = '/?categoryId='+ categoryId;
    }
})

var pageNum_content = 1;
var pageSize_content = 5;
var pages = 1;
var total = 0;
// 获取内容
function fnGetContent (categoryId) {
    var pageSize = pageSize_content;
    var pageNum = pageNum_content;
    var ajaxData = {};
    var url = "/api/content/list";
    ajaxData = {
        pageSize: pageSize,
        pageNum: pageNum
    }
    if(!!categoryId){
        ajaxData.categoryId = categoryId;
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
                var date2 = new Date(item.addTime);
                var addTime = date2.toLocaleString();
                str += "<div class='aItem clear'";
                str += "<h2 class='aItem-title1'>"+item.contentName+"</h2>";
                str += "<div class='aItem-introduce'>";
                str += "<span>作者:</span>";
                str += "<span class='active'>"+item.user.username+"</span>";
                str += "<span>-</span>";
                str += "<span>时间:</span>";
                str += "<span class='active'>"+addTime+"</span>";
                str += "<span>-</span>";
                str += "<span>阅读:</span>";
                str += "<span class='active'>"+item.views+"</span>";
                str += "<span>-</span>";
                str += "<span>评论:</span>";
                str += "<span class='active'>"+item.comments.length+"</span>";
                str += "</div>";
                str += "<h3 class='aItem-title2'>"+item.description+"</h3>";
                str += "<div data-id='"+item._id+"' class='aItem-read-btn'><a href='/content?_id="+item._id+'&categoryId='+categoryId+"'>阅读全文</a></div>";
                str += "</div>";
            })
            $(".aItem-wrap").html(str);
            var p = '';
            if(pages>0){
                p = pageNum_content+'/'+pages;
                $(".pagesBox").html(p);
                $('.noDataBox').addClass('hide');
                $(".page-wrap").removeClass('hide');
            }else{
                $(".page-wrap").addClass('hide');
                $('.noDataBox').removeClass('hide');
            }
            
        }
    })
}
fnGetContent(categoryId);

// 上一页
$(".preveBtn").click(function(){
    if(pageNum_content == 1){
        return false;
    }
    pageNum_content = pageNum_content - 1;
    fnGetContent(categoryId);
})

// 下一页
$(".nextBtn").click(function(){
    if(pageNum_content == pages){
        return false;
    }
    pageNum_content = pageNum_content + 1;
    fnGetContent(categoryId);
})

