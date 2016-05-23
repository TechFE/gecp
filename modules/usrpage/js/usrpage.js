 // $(document).ready(function() {
 define(function(require, exports, module) {

     $(function() {
         /*验证是否登录*/
         var cookie = require('../../../common/js/cookie');
         var username = cookie.getCookie('username');
         if (!username) {
             parent.location.assign(location.protocol + "//" + location.host + "/gecp/modules/login/login.html");
         }
         $('.usr-name').text(username + " 用户中心");

         /*左边menu点击*/

         $('.usr-main-left  div').click(function(event) {
             $(this).parent().children().removeClass('div-hover');
             $(this).addClass('div-hover');
             console.log($(this).find('.menu').text());
             switch ($.trim($(this).find('.menu').text())) {
                 case '我的资源':
                     /*右边布局  分三栏*/
                     var usrresHtml = require('../usrres.html');
                     require('../css/usrres.css');
                     $('.usr-main-right').html(usrresHtml);
                     var Usrres = require('./usrres');
                     var usrres = new Usrres();
                     break;
                 case '我的主页':
                     var usrhomepageHtml = require('../usrhomepage.html');
                     require('../css/usrhomepage.css');
                     $('.usr-main-right').html(usrhomepageHtml);
                     var usrhomepage = require('./usrhomepage');
                     break;
             }
         });

         var usrCenterMenu = sessionStorage.getItem('usrCenterMenu');
         console.log(usrCenterMenu);
         switch (sessionStorage.getItem('usrCenterMenu')) {
             case '我的资源':
                 $('.usr-myres').click();
                 break;
             case '我的主页':
                 $('.usr-mypage').click();
                 break;
             case '我的课程':
                 $('.usr-mycourse').click();
                 break;
         }
         //刷新回归
         $('.usr-main-left').on('click', '.menu', function(event) {
             switch ($.trim($(this).text())) {
                 case '我的资源':
                     sessionStorage.setItem('usrCenterMenu','我的资源');
                     break;
                 case '我的主页':
                     sessionStorage.setItem('usrCenterMenu','我的主页');
                     break;
                 case '我的课程':
                     sessionStorage.setItem('usrCenterMenu','我的课程');
                     break;
             }

         });

     });

 });
