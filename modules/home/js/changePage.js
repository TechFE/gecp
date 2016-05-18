/*
 *zry
 *2015-11-20
 *切换页面
 **/
//indexMain.js的子模块
define(function(require, exports, module) {
    function changePage() {
        // var $ = require('jquery'); //跳转以后jquery在首页的引用就不能用了
        var config = require('../../../common/js/prjConfig');
        $('.navbar-nav li a:first').css('color', '#FFF');

        $('.navbar-nav li a').click(function() {
            $('.navbar-nav li a').css('color', '#9d9d9d');
            $(this).css('color', '#FFF');
            var txt = $(this).text();
            console.log(txt);
            
            if (txt == "首页") {
                window.location.href = config.subHref() + '/index.html';
            } else if (txt == "资源") {
                window.location.href = config.subHref() + '/modules/res/res.html'
            } else if (txt == "社区") {
                $('#mainframe').attr('src', 'shequ/shequ.html');
            } else if (txt == "自主学习") {
                window.location.href = config.subHref() + '/modules/istudy/istudy.html';

            } else if (txt == "管理") {
                window.location.href = config.subHref() + '/modules/usrpage/usrpage.html';

            }
        });

        $('.yxyy-subs li a').click(function(event) {
            $('.yxyy-menu').css('color', '#FFF');
            var subTxt = $(this).text();
            switch (subTxt) {
                case "集体备课":
                    $('#mainframe').attr('src', 'yanxiu/jtbk.html');
                    break;
                case "评课议课":
                    $('#mainframe').attr('src', 'yanxiu/pkyk.html');
                    break;
                case "课题研究":
                    $('#mainframe').attr('src', 'yanxiu/ktyj.html');
                    break;
                case "科研成果":
                    $('#mainframe').attr('src', 'yanxiu/kycg.html');
                    break;
            }
        });
    }
    module.exports = changePage;
});
