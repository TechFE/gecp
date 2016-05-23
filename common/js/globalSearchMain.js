/**
 * [全局搜索入口]
 */
define(function(require) {
    var navHeader = require('./navheader');
    navHeader.init(); //导航栏


    var globalSearch = require('./globalSearch');
    globalSearch.init();

    //默认为资源 classType = res
    var classType = 'res'; //按照点击的结果面板从SessionStorage中取出数据
    $('.page-global-search').on('click', function(event) {
        inPage2GlobalSearch(classType);
    });
    /*enter键*/
    $('.page-global-search-text').keydown(function(event) {
        if (event.keyCode) {
            if (event.keyCode == 13) {
                inPage2GlobalSearch(classType);
            }
        }
    });

    function inPage2GlobalSearch(classType) {
        var gSearchText = $('.page-global-search-text').val();
        if (gSearchText) {
            var gSearchTextArray = gSearchText.split(' ');
            var gSearchTextCombine = "";
            for (var i = 0, len = gSearchTextArray.length - 1; i < len; i++) {
                gSearchTextCombine += gSearchTextArray[i] + '+';
            }
            gSearchTextCombine = gSearchTextCombine + gSearchTextArray[len];
            // console.log(gSearchText);
            location.href = subHref + '/common/subpages/globalSearch.html?query=' + gSearchTextCombine + '&class='+classType;
        } else {
            location.href = subHref + '/common/subpages/globalSearch.html&class='+classType;
        }
    }
});
