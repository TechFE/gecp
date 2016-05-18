/**
 * 评论部分分模块
 */
define(function(require, exports, module) {
    window.GECP = {};
    window.GECP.fd = {};
    var cookie = require('../../../common/js/cookie');
    var username = cookie.getCookie('username'); //用户名
    var config = require('../../../common/js/prjConfig.js');
    var assessModule = {
        /**
         * [init 评论模块初始化]
         * @param  {[type]} elePos     [位置]
         * @param  {[type]} tableName [评论的表名]
         * @param  {[type]} tableFields        [表名 对象]
         */
        init: function(elePos, tableName, tableFields) {
            this.initLayout(elePos);
            this.initEvents(tableName, tableFields);
        },
        initLayout: function(elePos) {
            var assessModue = require('../subs/assess.html');
            require('../css/assess.css');
            $(elePos).append(assessModue);

            var personImgUrl = config.subHref() + "/modules/res/img/person.png";
            var star_sle = config.subHref() + "/modules/res/img/star_sle.png";
            var star_un = config.subHref() + "/modules/res/img/star_un.png";
            $('.pimg img').attr('src', personImgUrl);
            // $('.comments-divs .cicle-img').eq(0).attr('background', 'url(../img/person1.png)');
            /*评分*/
            $('.rating-star div').click(function(event) {
                //点击      
                var ind = $(this).index() + 1 || 0;
                console.log("得分是：" + ind);
                GECP.fd.rating = ind;
                $(this).css('background', 'url(' + star_sle + ')');
                // $(this).lt(ind).css('background','url("img/star_sle.png")');
                $(this).prevAll().css('background', 'url(' + star_sle + ')');
                $(this).nextAll().css('background', 'url(' + star_un + ')');

            });
        },
        initEvents: function(tableName, tableFields) {
            // 点击进行评论
            $('.assess-submit').click(function(event) {
                assessModule.events._submit(tableName, tableFields);
            });
            assessModule.events.commentsLists(tableName, tableFields, createFyDiv);
        },
        events: {
            _submit: function(tableName, tableFields) {
                var commentsText = $('.assess-message').val(); //评论页中的内容
                var frate = window.GECP.fd.rating || 0;
                var fdate = new Date().toLocaleDateString();

                if (commentsText == "") {
                    alertDialogShow("评论内容为空**");
                    return;
                }
                /*id文件id  写进数据库   JSON*/
                var Params = {
                    'Fields': [tableFields.fId, tableFields.person, tableFields.content, tableFields.rate, tableFields.date],
                    'Data': [
                        [parseInt(tableFields.fidValue), username, commentsText, frate, fdate]
                    ]
                };
                var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                    'processCompleted': function() {
                        var confirmDialog = require('../../../common/subpages/confirmDialog.html');
                        $('body').append(confirmDialog);
                        $('#confirmModal').modal('show');
                        $('.modal-body').text("评论成功！");
                        $('.mymodal-confirm').on('click', function(event) {
                            // $('.assess-message').val('');
                            window.location.reload();
                        });
                    },
                    'processFailed': function() {
                        console.log("fileDetial.js文件下数据库操作失败！");
                    }
                });
                sqlServices.processAscyn("ADD", "gecp2", tableName, Params);
            },
            commentsList: function(tableName, tableFields, pageNum) {
                //当前页所有评论
                var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                    'processCompleted': function(data) {
                        // console.log(data);
                        DBData2CommentsList(tableFields,data);
                    },
                    'processFailed': function() {
                        console.log("queryDB.js文件下数据库操作失败！");
                    }
                });
                var lyrOrSQL = {
                    'lyr': tableName,
                    'fields': tableFields.person+","+tableFields.content+","+tableFields.date,
                    'filter': tableFields.fId + '=' + parseInt(tableFields.fidValue) + ' limit 5 offset ' + (pageNum * 5)
                };
                sqlServices.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);

                // fComments.queryDB2GetCommentsData(DBData2CommentsList, pageNum);
            },
            commentsLists: function(tableName, tableFields, createFyDiv) {
                //所有评论
                var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                    'processCompleted': function(data) {
                        createFyDiv(tableName, tableFields, data.length); //创建分页
                    },
                    'processFailed': function() {
                        console.log("queryDB.js文件下数据库操作失败！");
                    }
                });
                var lyrOrSQL = {
                    'lyr': tableName,
                    'fields': tableFields.id,
                    'filter': tableFields.fId + '=' + parseInt(tableFields.fidValue)
                };
                sqlServices.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
            },
        }
    };

    function DBData2CommentsList(tableFields,data) {
        // console.log(data);
        var len = data.length;
        // window.GECP.fd.assessPages = Math.ceil(len / 5);
        // $('.assess-nums').html(len);
        $('.comments-divs').html('');
        if (data) {
            var zanImgUrl = config.subHref() + "/modules/res/img/zan.png";
            person =  tableFields.person;
            var personImgUrl1 = config.subHref() + "/modules/res/img/person1.png";
            for (var i = 0; i < len; i++) {
            	var person = data[i].ccPerson ||data[i].fcPerson ||'匿名';
            	var content = data[i].ccContent ||data[i].fcContent;
            	var date = data[i].ccDate ||data[i].fcDate;
                var html = "<div class='one-comments'>" +
                    "<div class='cicle-img'></div>" +
                    "<div class='comments-person-content'>" +
                    "<div class='comments-person'>" + person + ":</div>" +
                    "<div class='comments-content'>" + content + "</div>" +
                    "<div class='comments-date'>" + date + "</div>" +
                    "<div class='comments-zan'><img class='zan-img' src='" + zanImgUrl + "'></img></div>" +
                    "</div>" +
                    "</div>";
                $('.comments-divs').append(html);
                if(i===0){
                    $('.cicle-img').addClass('another-person');
                }
            }

        } else {
            $('.comments-divs').append("<br><br><br><br><p style='color:#ccc'>暂时没有评论！</p>");
            return;
        }
    }


    function createFyDiv(tableName, tableFields, datalen) {
        $('.assess-nums').html(datalen);
        //分页实现
        datalen = datalen || 1;
        maxPage = Math.ceil(datalen / 5);
        console.log(maxPage);
        $.jqPaginator('#pagination1', {
            totalPages: maxPage,
            visiblePages: 10,
            currentPage: 1,
            onPageChange: function(num, type) {
                // $('#p1').text(type + '：' + num);
                console.log(type + '：' + num);
                if (type == "init") {
                    num = 1;
                }
                assessModule.events.commentsList(tableName, tableFields, num - 1);
            }
        });
        $('#pagination1').jqPaginator('option', {
            currentPage: 1,
            //pageSize:15,
            visiblePages: 7,
            first: '<li class="first"><a href="javascript:;">首页</a></li>',
            prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
            next: '<li class="next"><a href="javascript:;">下一页</a></li>',
            page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
            last: '<li class="last"><a href="javascript:;">末页</a></li>'
        });
    }
    /**
     * [alertDialogShow alert]
     * @param  {[string]} value [alert的内容]
     */
    function alertDialogShow(value) {
        var alertDialog = require('../../../common/subpages/alertDialog.html');
        $('body').append(alertDialog);
        $('#alertModal').modal('show');
        $('.modal-body').text(value);
    }
    module.exports = assessModule;
});
