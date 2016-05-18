/*
 *zry
 *2015-11-21
 * 注册
 *
 ******/
define(function(require, exports, module) {
    /**
     * [Register 注册]
     */
    function Register() {
        var username, realname, password, password2, email, inputIntro;
        $('.btn-register').click(function() {
            //e.preventDefault();
            username = $.trim($('.username').val());
            realname = $.trim($('.realname').val());
            password = $.trim($('.password').val());
            password2 = $.trim($('.password2').val());
            var identity = $('input[name="idenRadio"]:checked').attr('id') == 'stuRadio' ? '学生' : '老师';
            console.log(identity);
            email = $.trim($('.email').val());
            inputIntro = $.trim($('.inputIntro').val());

            console.log(username.gblen());
            if (username.gblen() < 6) {
                alertDialogShow("推荐用户名大于6位");
                return;
            } else if (username.gblen() > 20) {
                alertDialogShow("用户名应该小于20位");
            }
            if (!username || !password) {
                alertDialogShow("带 * 的为必填项！");
                return;
            }
            if (password !== password2) {
                alertDialogShow("【确认密码】和【密码】输入不一致");
                return;
            }
            //存入数据库中
            var params = {
                Fields: ['username', 'realname', 'password', 'identity', 'email', 'introduce'],
                Data: [
                    [username, realname, password, identity, email, inputIntro]
                ]
            };
            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    console.log(data);
                },
                'processFailed': function() {
                    alertDialogShow("对不起，注册失败，可能是用户名重复，建议换个用户名！");
                    console.log("register.js文件下数据库操作失败！");
                    return;
                }
            });
            sqlServices.processAscyn("ADD", "gecp2", "register_users", params);

            /*注册成功，登录*/
            $('#myModal').modal('show');

        }); //注册click
        //注册成功===>登录
        $('.reg-login').click(function() {
            window.location.href = "login.html";
        });
        /*// 重置
        $('.btn-reset').click(function() {
            // $('#resetModal').on('show.bs.modal', function (event) {}
            $('#resetModal').modal('show');
        });
        //确定重置
        $('.confirmReset').click(function() {
            username = "";
            $('#resetModal').modal('hide');
            $('.username').val('');
            $('.realname').val('');
            $('.password').val('');
            $('.password2').val('');
            $('.email').val('');
            $('.inputIntro').val('');

        });*/
    }
    /**
     * [gblen 获得字符串长度]
     * @return {[type]} [字符串长度]
     */
    String.prototype.gblen = function() {
        var len = 0;
        for (var i = 0; i < this.length; i++) {
            if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
                len += 2;
            } else {
                len++;
            }
        }
        return len;
    };
    /**
     * [alertDialogShow alert]
     * @param  {[string]} value [alert的内容]
     */
    function alertDialogShow(value) {
        var alertDialog = require('../../../common/subpages/alertDialog.html');
        $('body').append(alertDialog);
        $('#alertModal').modal('show');
        $('#alertModal .modal-body').text(value);
    }
    module.exports = Register;
}); //$(document).ready(sfunction()
