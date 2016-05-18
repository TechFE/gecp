define(function(require) {
    var navheader = require("../../../common/js/navheader");
    navheader.init();
    //资源 栏目高亮
    $('.index a').css('color', '#9d9d9d');
    $('.ind-res').css('color', '#fff');
    $('.index a').hover(function() {
        $(this).css('color', '#fff');
    }, function() {
        /* Stuff to do when the mouse leaves the element */
        $(this).css('color', '#9d9d9d');
    });

    $(function() {
        // $('#resMmain').on('click', '.file', function(event) {
        var uldFile = require('./uldFile'); //uldFile.js    
        uldFile.init(); //初始化上传文件 上传专题按钮
        // });
        var content = require('./content'); //content.js自动生成资源列表    
        content.initLayout();
        content.changeLookStyle(); /*浏览方式*/
        var Search = require('./search'); //搜索
        // var search = new Search();
        

    });
});
