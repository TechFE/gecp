define(function(require) {
    var navheader = require("../../../common/js/navheader");
    navheader.init();
    $('.index a').css('color', '#9d9d9d');
    $('.index a').hover(function() {
    	$(this).css('color', '#fff');
    }, function() {
    	$(this).css('color', '#9d9d9d');
    });
    var Usrpage = require('./usrpage');//我的主页 整体
});
