/*
 *  2015-11-9 zry
 *  选择 筛选
 *
 **/
/*
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         佛祖保佑       永无BUG
*/
// $(document).ready(function(){
define(function(require, exports, module) {
    /**
     * [search 查询]
     * @return {[String]} [where条件]
     */

    $(function() {

        var whereArgs = "";
        var whereArgsBysearchText = "";
        var queryDB = require('./queryDB');
        var content = require('./content');

        /**
         * [searchStyle 搜索时候的样式变化]
         */
        function searchStyle() {
            $('#searDiv ul li').hover(function() {
                if ($(this).hasClass('disable-color')) {
                    return;
                }
                $(this).addClass('seahover');

            }, function() {
                $(this).removeClass('seahover');
            });


            $('#searDiv ul li:nth-child(1)').addClass('selected');
            //点击第1行分类标准 第二行会跟随变化
            $('#search-class1 li').on('click', function(event) {
                // $('#search-class2 li').addClass('initial-color');
                $('#search-class2 li').removeClass('disable-color');
                $('#search-class2 li').removeClass('selected');
                seaClickEvent(); //off之后可以恢复
                var text = $.trim($(this).text()).replace(/\s+/g, ""); //删去空格
                switch (text) {
                    case "全部":
                        $('#search-class2 li').removeClass('selected');
                        // $('#search-class2 li:first').addClass('selected');
                        $('#search-class2 li:first').click();
                        break;
                    case "必修": //2-3
                        $('#search-class2 li:first').addClass('selected');
                        $('#search-class2').find('li:gt(2)').addClass('disable-color');
                        $('#search-class2').find('li:gt(2)').off('click.aaa');
                        break;
                    case "选修1": //4-6
                        $('#search-class2 li:first').addClass('selected');
                        $('#search-class2 li').slice(1, 3).addClass('disable-color');
                        $('#search-class2 li').slice(1, 3).off('click.aaa');
                        $('#search-class2 li').slice(6, 16).addClass('disable-color');
                        $('#search-class2 li').slice(6, 16).off('click.aaa');
                        break;
                    case "选修2": //7-15
                        $('#search-class2 li:first').addClass('selected');
                        $('#search-class2 li').slice(1, 6).addClass('disable-color');
                        $('#search-class2 li').slice(1, 6).off('click.aaa');
                        $('#search-class2 li').slice(15, 16).addClass('disable-color');
                        $('#search-class2 li').slice(15, 16).off('click.aaa');
                        break;
                    case "其它":
                        $('#search-class2 li').slice(1, 15).addClass('disable-color');
                        $('#search-class2 li').slice(1, 15).off('click.aaa');
                        break;
                }
            });
        }

        /**
         * [seaClickEvent 点击选择事件]
         * @return {[type]} [description]
         */
        // function seaClickEvent() {
        var seaClickEvent = function() {
            $('#searDiv ul').find('li').on('click.aaa', function(event) {
                var self = $(this);
                var others = self.parent().children(); //所在行其他
                others.removeClass('selected');
                self.addClass('selected');
                var topic = self.attr('data-title');
                console.log(topic);
                var topicParentName = self.parent().eq(0).attr('data-title');
                console.log(topicParentName);
                //点击查询
                clk2getWhereArg(topicParentName, topic);
                document.querySelector('.contentDiv').innerHTML = "";
                //点击搜索之后  重新遍历数据库
                queryDB.queryDB2Page(whereArgs.slice(0, -4), 0);
                console.log(whereArgs.slice(0, -4));
                queryDB.queryDBDatasNum('fyDiv', whereArgs.slice(0, -4), 'bySearch', content.fyDiv);
                sessionStorage.setItem('currentPageNum', 1); //保存刷新之前的当前页码 重置为1
                $('#pagination1').jqPaginator('option', {
                    currentPage: 1,
                }); //每次点击查询回到第一页

                // 点击查询之后 返回了data数据，使用该data数据进行分页
            });

        };

        /**
         * 排序
         */
        function sortResData() {
            sessionStorage.setItem('sortItem', ''); //刷新的时候置空
            $('.sortdivs div').on('click', function(event) {
                console.log($.trim($(this).text()));
                $(this).parent().children().removeClass('sortdivs-clk');
                $(this).addClass('sortdivs-clk');
                var content = require('./content');

                //应该重新全部生成新的div页
                switch ($.trim($(this).text())) {
                    case '时间':
                        var spanIcon = $(this).find('.glyphicon');
                        if (spanIcon.hasClass('glyphicon-arrow-down')) {
                            $(this).find('.glyphicon').removeClass('glyphicon-arrow-down');
                            $(this).find('.glyphicon').addClass('glyphicon-arrow-up');
                            sessionStorage.setItem('sortItem', 'timeDown');
                        } else if (spanIcon.hasClass('glyphicon-arrow-up')) {
                            $(this).find('.glyphicon').removeClass('glyphicon-arrow-up');
                            $(this).find('.glyphicon').addClass('glyphicon-arrow-down');
                            sessionStorage.setItem('sortItem', 'timeUp');
                        }
                        // sessionStorage.setItem('currentPageNum',1);
                        content.initLayout(whereArgs.slice(0, -4));

                        break;
                    case '评分':
                        sessionStorage.setItem('sortItem', 'fate');
                        content.initLayout(whereArgs.slice(0, -4));
                        break;
                    case '下载量':
                        content.initLayout(whereArgs.slice(0, -4));
                        sessionStorage.setItem('sortItem', 'downloads');
                        break;
                }
            });
        }


        /**
         * 局部搜索
         */
        function resSearchByText() {
            $('.searDiv li').on('click', function(event) {
                whereArgsBysearchText = '';
            });

            $('.res-search-icon').on('click', function(event) {

                var searchText = $.trim($('.res-search-text').val());
                console.log(searchText);
                //根据输入的内容就行搜索
                //资源名字
                whereArgsBysearchText = " filename like '%" + searchText + "%' or fileRename like '%" + searchText + "%' or subjectName like '%" + searchText + "%'";

                var searchTextWhere = whereArgs + whereArgsBysearchText;
                content.initLayout(searchTextWhere);

            });
        }
        /**
         * [clk2search 点击查询]
         * @return {[string]} [where语句]
         */
        function clk2getWhereArg(topicParentName, topic) {

            switch (topicParentName) {
                case "cdCode":
                    /*var ind=whereArgs.indexOf("kcbz");
                    console.log(ind);*/
                    // whereArgs.replace(/^kcbz='.*'\sand$/g,"");
                    whereArgs = whereArgs.replace(/cdCode=\'[A-Z]+[1-2]?\' and/g, "").trim();
                    whereArgs += " cdCode='" + topic + "' and ";
                    //点击全部的时候
                    whereArgs = whereArgs.replace(/cdCode=\'qb\' and/g, "").trim();
                    break;
                case "cmCode":
                    whereArgs = whereArgs.replace(/cmCode=\'[A-Z]+\' and/g, "").trim();
                    whereArgs += " cmCode='" + topic + "' and ";
                    whereArgs = whereArgs.replace(/cmCode=\'qb\' and/g, "").trim();

                    break;
                case "wjgs":
                    whereArgs = whereArgs.replace(/wjlx=\'[\u4e00-\u9fa5]+\' and/g, "").trim();
                    whereArgs += " wjlx='" + topic + "' and ";
                    whereArgs = whereArgs.replace(/wjlx=\'qb\' and/g, "").trim();
                    break;
                case "ssks":
                    whereArgs = whereArgs.replace(/ssks=\'[\u4e00-\u9fa5]+\' and/g, "").trim();
                    whereArgs += " ssks='" + topic + "' and ";
                    whereArgs = whereArgs.replace(/ssks=\'qb\' and/g, "").trim();
                    break;
            }

            return whereArgs;
        }

        /*调用*/
        searchStyle(); //搜索时候的样式变化
        seaClickEvent(); //处理点击事件
        sortResData();
        resSearchByText();

    });
    // module.exports = search;
});
