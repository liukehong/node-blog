var globalData = {
    userInfo: null
}


function fnInit () {
    // 判断是否是管理员登录进来的
    globalData.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    if(!!globalData.userInfo){
        if(!!globalData.userInfo.isAdmin){
            $(".admin-user-name").html(globalData.userInfo.username);
        }else{
            alert('只有管理员才能登录后台管理系统！');
            window.location.href = "/";
        }

    }else{
        alert('请先登录！');
        window.location.href = "/";
    }
}
fnInit();

