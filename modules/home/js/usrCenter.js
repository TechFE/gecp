define(function(require, exports, module) {
    /**
     * [UsrCenter 跳转到用户中心]
     */
    function usrCenter() {
        var config = require("../../../common/js/prjConfig");
        subHref = config.subHref();
        var cookie = require('../../../common/js/cookie');
        // //图片地址做成绝对路径
        // var usrpage_bluePic = subHref +"/modules/usrpage/img/usrpage_blue.png";
        // var usrres_bluePic = subHref +"/modules/usrpage/img/usrres_blue.png";
        // var usrcourse_bluePic = subHref +"/modules/usrpage/img/usrcourse_blue.png";
        // var usrpagePic = subHref +"/modules/usrpage/img/usrpage.png";
        // var usrresPic = subHref +"/modules/usrpage/img/usrres.png";
        // var usrcoursePic = subHref +"/modules/usrpage/img/usrcourse.png";
        // $('.usr-page img').attr('src', usrpagePic);
        // $('.usr-res img').attr('src', usrresPic);
        // $('.usr-course img').attr('src', usrcoursePic);

        $('#mainframe').hover(function() {
            $('.g-usr-card').css('display', 'none');
        });
        //与上面不一样，注意
        $('.mainframe').hover(function() {
            $('.g-usr-card').css('display', 'none');
        });
        // $('.g-usr-card > div').hover(function() {
        //     if ($(this).hasClass('usr-page')) {
        //         $(this).find('img').attr('src', usrpage_bluePic);
        //     } else if ($(this).hasClass('usr-res')) {
        //         $(this).find('img').attr('src', usrres_bluePic);
        //     } else if ($(this).hasClass('usr-course')) {
        //         $(this).find('img').attr('src', usrcourse_bluePic);
        //     }
        // }, function() {
        //     if ($(this).hasClass('usr-page')) {
        //         $(this).find('img').attr('src', usrpagePic);
        //     } else if ($(this).hasClass('usr-res')) {
        //         $(this).find('img').attr('src', usrresPic);
        //     } else if ($(this).hasClass('usr-course')) {
        //         $(this).find('img').attr('src', usrcoursePic);
        //     }
        // });
        /*点击时候进入*/

        $('.g-usr-card >div >div').on('click', function(event) {
            switch ($.trim($(this).text())) {
                case '我的主页':
                    sessionStorage.setItem('usrCenterMenu', '我的主页');
                    window.location.href = subHref + "/modules/usrpage/usrpage.html";
                    break;
                case '我的资源':
                    sessionStorage.setItem('usrCenterMenu', '我的资源');
                    window.location.href = subHref + "/modules/usrpage/usrpage.html";
                    break;
                case '我的课程':
                    sessionStorage.setItem('usrCenterMenu', '我的课程');
                    window.location.href = subHref + "/modules/usrpage/usrpage.html";
                    break;
                case '退出':
                    cookie.setCookie('username', '', -1); //删除cookie
                    //刷新
                    window.location.reload(true); //刷新
                    break;
            }
        });
    }

    module.exports = usrCenter;
});
