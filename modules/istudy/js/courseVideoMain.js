/**
 * 课程视频模块入口
 */
define(function(require) {
    var navheader = require("../../../common/js/navheader");
    var prjUtil = require("../../../common/js/prjUtil");

    navheader.init();
    $('.navbar-nav li a').css('color', '#9d9d9d');
    $('.navbar-nav li:nth(2) a').css('color', '#fff');

    var courseVideo =  require('./courseVideo');
    courseVideo.init();
});
