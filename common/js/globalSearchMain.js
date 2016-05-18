/**
 * [全局搜索入口]
 */
define(function(require) {
    var navHeader = require('./navheader');
    navHeader.init();//导航栏
    
    var globalSearch = require('./globalSearch');
    globalSearch.init();
});
