define(function(require, exports, module) {
    /**
     * [loginInOut 登录之后的显示情况]
     */
    function LoginInOut() {
        var cookie = require('../../../common/js/cookie');
        var prjUtil = require('../../../common/js/prjUtil');

        var username = cookie.getCookie('username');
        //console.log(username);
        if (username != null && username != "") {
            // prjUtil. getCharLen();
            // var len = username.gblen();
            // if(len>=12){
            //     username = username.slice(0, 12)+'...';
            // }else {
            // }
            // if(document.body.offsetWidth < 1033){
            //     username="";
            // }

            // $("#index-user").html("<li class='wel-usr'>欢迎你！<a class='usr-top'></a></li>");
            // var html = "<li class='wel-usr'><a class='usr-top'></a></li>"+
            //     "<li id='login-out'>注销</li> ";
            var html = "<span class='glyphicon glyphicon-user user-img'></span><span class='glyphicon glyphicon-menu-down user-detail'></span>";
            $("#index-user").html(html);

            /*欢迎页面的主页hover*/
            $('#index-user span').on('click', function(event) {
                $('.username').text(username);
                $('.g-usr-card').css('display', 'block');

            });
        }

        // // 实现注销
        // $('#index-user').on('click', '.login-out', function(event) {
        //     event.preventDefault();
        //     cookie.setCookie('username', '', -1); //删除cookie
        //     //刷新
        //     window.location.reload(true); //刷新
        // });
    }

    module.exports = LoginInOut; //暴露出来
});
