/*注册页面跳转 登录验证*/

/*登录验证*/
define(function(require, exports, module) {
    var cookie = require('../../../common/js/cookie');
    $('.login-in').click(function() {
        var username = $.trim($('.login-username').val());
        if (username == "" || username == null) {
            return;
        }

        var pwd = $.trim($('.login-password').val());

        //从数据库中取数据
        /*var sqlServices= new gEcnu.WebSQLServices.SQLServices();
        var lyrOrSQL={
            lyr:'register_users',
            fileds:'password',
            filter:"username='"+username+"'"
        };
        var getPwd=sqlServices.processAscyn("SQLQUERY","gecp2",lyrOrSQL);
        console.log(getPwd);*/
        var lyrOrSQL = {
            'lyr': 'register_users',
            'fields': 'uid,password,identity',
            'filter': "username='" + username + "'"
        };

        var sqlservice = new gEcnu.WebSQLServices.SQLServices({
            'processCompleted': function(data) {
                //console.log(data[0].password); //回调函数里返回数据
                // data[0]
                var user_pwd = data[0].password;
                var userId = data[0].uid;
                var identity = data[0].identity;
                localStorage.setItem('userId',userId);
                localStorage.setItem('identity',identity);
                if (pwd == user_pwd) {
                    cookie.setCookie('username', username, 7);
                    window.location.href = "../../index.html";
                } else {
                    alertDialogShow("用户名或者密码不正确！");
                }
            },
            'processFailed': {}
        });
        sqlservice.processAscyn(gEcnu.ActType.SQLQUERY, "gecp2", lyrOrSQL);



    });
    /**
     * [alertDialogShow alert]
     * @param  {[string]} value [alert的内容]
     */
    function alertDialogShow(value) {
        var alertDialog = require('../../../common/subpages/alertDialog.html');
        $('body').append(alertDialog);
        $('#alertModal').modal('show');
        $('.modal-body').text(value);
    }


});
