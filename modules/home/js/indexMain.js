//index.html的逻辑父模块
define(function(require) {
    var navheader = require("../../../common/js/navheader");
    navheader.init();
    var HomeMain = require('./homeMain');
    var homeMain = new HomeMain(); //首页界面
});
