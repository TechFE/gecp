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
    var PreviewPage = require("./previewPage");
    var previewPage = new PreviewPage();

});
