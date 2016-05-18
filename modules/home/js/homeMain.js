define(function(require, exports, module) {
    
    function homeMian() {
        // //上
        // var headerHtml = require('../../../common/subpages/navheader.html');
        // require('../../../common/css/navheader.css');
        // $('#header').append(headerHtml);
        //中
        var homeHtml = require('../home.html');
        require('../css/home.css'); //css
        $('#mainframe').append(homeHtml);
        // //下
        // var footHtml = require('../../../common/subpages/foot.html');
        // require('../../../common/css/foot.css');
        // $('#footer').append(footHtml);
    }
    module.exports = homeMian;
});
