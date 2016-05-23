define(function(require) {
    var navheader = require("../../../common/js/navheader");
    navheader.init();

    /*评价模块*/
    var assessModue = require('./assessModule');
    var searchVals = location.search.split('&');
    var fid = searchVals[0].slice(5);
    var tableFields = {};
    tableFields.fidValue = fid;
    tableFields.id = "fcId";//表中对应的字段名
    tableFields.fId = "uldFileId";
    tableFields.person = "fcPerson";
    tableFields.content = "fcContent";
    tableFields.rate = "fcRate";
    tableFields.date = "fcDate";
    /**
     * [init 评论模块初始化]
     * @param  {[type]} elePos     [位置]
     * @param  {[type]} tableName [评论的表名]
     * @param  {[type]} tableFields        [表的字段名]
     */
    assessModue.init('#assess-module', 'fComments', tableFields);
    //资源 栏目高亮
    $('.index a').css('color', '#9d9d9d');
    $('.ind-res').css('color', '#fff');
    $('.index a').hover(function() {
        $(this).css('color', '#fff');
    }, function() {
        $(this).css('color', '#9d9d9d');
    });

    var FileDetial = require('./fileDetial');  //这样fileDetial.js文件下的$(function(){})就可以执行了
    // var fileDetial = new FileDetial(); //逻辑
});
