define(function(require, exports, module) {
    var cookie = require('../../../common/js/cookie');
    var username = cookie.getCookie('username');
    var queryDB = require('../../res/js/queryDB');
    var usrresManager = require('./usrresManager'); //管理
    var dbTools = require('./dbOpr');



    var usrResDiv = {
        /**
         * [fyDiv 分页回掉函数]
         * @param  {[type]}   data    [数据]
         * @param  {[type]}   maxPage [页数]
         */
        fyDiv: function(maxPage) {
            console.log(maxPage);
            var self = this;
            console.log(self);
            maxPage = maxPage || 1;
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
                    dbTools.queryUsrDB2PageDatas(num - 1, self.createResDiv); //按页进行获取数据
                }
            });
            $('#pagination1').jqPaginator('option', {
                currentPage: 1,
                //pageSize:15,
                visiblePages: 6,
                first: '<li class="first"><a href="javascript:;">首页</a></li>',
                prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
                next: '<li class="next"><a href="javascript:;">下一页</a></li>',
                page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
                last: '<li class="last"><a href="javascript:;">末页</a></li>'
            });
            /*****分页功能End**********************/
        },
        createResDiv: function(data) {
            $('.usrres-divs').empty();
            var totalHtml = "",
                messagesTopHtml = "",
                html = "";
            for (var i = 0, len = data.length; i < len; i++) {
                var datai = data[i];
                if (datai) {
                    var fileTitle = "";
                    var fileRealName = datai.filename || datai.fileName || '';
                    if (datai.fileRename && datai.fileRename != 'null') {
                        fileTitle = datai.fileRename;
                    } else {
                        fileTitle = fileRealName;
                    }
                    var lastIndexOfDot = fileTitle.lastIndexOf('.');
                    if (lastIndexOfDot > 0) {
                        fileTitle = fileTitle.slice(0, lastIndexOfDot);
                    } else {
                        fileTitle = fileTitle ? fileTitle : '文件名为空';
                    }
                    if (/^\d{17}-/.test(fileTitle)) {
                        fileTitle = fileTitle.slice(18);
                    }
                    if (datai.ftype == 2) {
                        fileTitle = datai.subjectName || fileTitle;
                        messagesTopHtml = '<div class="messages-top subject-logo">' + fileTitle + '</div>';
                    } else {
                        // fileTitle = filename;
                        messagesTopHtml = '<div class="messages-top">' + fileTitle + '</div>' +
                            '<div class="filename-hidden">' + fileRealName + '</div>';
                    }

                    if (datai.fPicFileName) { //如果有封面
                        var picFileURL = getPicFileURL(datai.fPicFileName);
                        fileImgHtml = "<div class='usrres-img'><img src='" + decodeURI(picFileURL) + "' class='cont-img' alt='封面'/></div>";
                    } else {
                        //空
                        fileImgHtml = "<div class='usrres-img'><img src='../res/img/default.png' class='cont-img' alt='封面'/></div>";
                    }
                    var wjlx = datai.wjlx == '0' ? "   " : datai.wjlx;
                    var ssnj = datai.ssnj == '0' ? "   " : datai.ssnj;
                    var ssks = datai.ssks == '0' ? "   " : datai.ssks;
                    var date = datai.date == '0' ? "   " : datai.date;
                    var cdName = datai.cdName ? datai.cdName : " ";
                    var cmName = datai.cmName ? datai.cmName : " ";

                    html = '<div class="usrres-onediv" data-fid=' + datai.fid + '>' +
                        '<input type="checkbox" class="usrres-ckb"></input>' +
                        fileImgHtml +
                        '<div class="usrres-messages">' +
                        messagesTopHtml +
                        '<div class="messages-bottom">' +
                        '<div class="mes-fid">' + datai.fid + '</div>' +
                        '<div class="mes-ftype">' + datai.ftype + '</div>' +
                        '<div class="mes-cdcm">' + cdName + ' - ' + cmName + '&nbsp&nbsp</div>' +
                        '<div class="mes-wjgs">' + wjlx + '&nbsp&nbsp</div>' +
                        '<div class="mes-ssnj">' + ssnj + '&nbsp&nbsp</div>' +
                        '<div class="mes-ssks">' + ssks + '&nbsp&nbsp</div>' +
                        '<span>&nbsp&nbsp日期：</span>' +
                        '<div class="mes-date">' + date + '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    // $('.usrres-divs').append(html);

                    totalHtml = totalHtml + html;

                } else {
                    $('.usrres-divs').html('<br><br><p style="color:#ccc"> 用户没有上传任何资源！</p>');
                }
            }
            //
            $('.usrres-divs').append(totalHtml);
        }
    };


    var collectResDiv = {
        collectFyDiv: function(maxPage) {
            var self = this;
            maxPage = maxPage || 1;
            $.jqPaginator('#pagination2', {
                totalPages: maxPage,
                visiblePages: 10,
                currentPage: 1,
                onPageChange: function(num, type) {
                    // $('#p1').text(type + '：' + num);
                    console.log(type + '：' + num);
                    if (type == "init") {
                        num = 1;
                    }
                    dbTools.usrCollectFile(self.createResCollectDiv, 'getPageDataFlag', num - 1); //按页进行获取数据
                }
            });
            $('#pagination2').jqPaginator('option', {
                currentPage: 1,
                //pageSize:15,
                visiblePages: 6,
                first: '<li class="first"><a href="javascript:;">首页</a></li>',
                prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
                next: '<li class="next"><a href="javascript:;">下一页</a></li>',
                page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
                last: '<li class="last"><a href="javascript:;">末页</a></li>'
            });
            /*****分页功能End**********************/
        },
        createResCollectDiv: function(data) {
            // console.log(data);
            $('.usrres-divs').empty();
            var totalHtml = "",
                messagesTopHtml = "",
                html = "";
            for (var i = 0, len = data.length; i < len; i++) {
                var datai = data[i];
                if (datai) {
                    var fileTitle = "";
                    var fileRealName = datai.filename || datai.fileName || '';
                    if (datai.fileRename && datai.fileRename != 'null') {
                        fileTitle = datai.fileRename;
                    } else {
                        fileTitle = fileRealName;
                    }
                    var lastIndexOfDot = fileTitle.lastIndexOf('.');
                    if (lastIndexOfDot > 0) {
                        fileTitle = fileTitle.slice(0, lastIndexOfDot);
                        fileTitle = fileTitle ? fileTitle : '文件名为空';
                    } else {
                        fileTitle = fileTitle ? fileTitle : '文件名为空';
                    }
                    if (/^\d{17}-/.test(fileTitle)) {
                        fileTitle = fileTitle.slice(18);
                    }
                    if (datai.ftype == 2) {
                        fileTitle = datai.subjectName || fileTitle;
                        messagesTopHtml = '<div class="messages-top subject-logo">' + fileTitle + '</div>';
                    } else {
                        messagesTopHtml = '<div class="messages-top">' + fileTitle + '</div>' +
                            '<div class="filename-hidden">' + fileRealName + '</div>';
                    }

                    if (datai.fPicFileName) { //如果有封面
                        var picFileURL = getPicFileURL(datai.fPicFileName);
                        fileImgHtml = "<div class='usrres-img'><img src='" + decodeURI(picFileURL) + "' class='cont-img' alt='封面'/></div>";
                    } else {
                        //空
                        fileImgHtml = "<div class='usrres-img'><img src='../res/img/nr/" + (i + 1) + ".png' class='cont-img' alt='封面'/></div>";
                    }
                    var wjlx = datai.wjlx == '0' ? "   " : datai.wjlx;
                    var ssnj = datai.ssnj == '0' ? "   " : datai.ssnj;
                    var ssks = datai.ssks == '0' ? "   " : datai.ssks;
                    var date = datai.date == '0' ? "   " : datai.date;
                    var cdName = datai.cdName ? datai.cdName : " ";
                    var cmName = datai.cmName ? datai.cmName : " ";

                    html = '<div class="usrres-onediv-collect" data-fid=' + datai.fid + '>' +
                        // '<input type="checkbox" class="usrres-ckb"></input>' +
                        fileImgHtml +
                        '<div class="usrres-messages">' +
                        messagesTopHtml +
                        '<div class="messages-bottom">' +
                        '<div class="mes-fid">' + datai.fid + '</div>' +
                        '<div class="mes-ftype">' + datai.ftype + '</div>' +
                        '<div class="mes-cdcm">' + cdName + ' - ' + cmName + '&nbsp&nbsp</div>' +
                        '<div class="mes-wjgs">' + wjlx + '&nbsp&nbsp</div>' +
                        '<div class="mes-ssnj">' + ssnj + '&nbsp&nbsp</div>' +
                        '<div class="mes-ssks">' + ssks + '&nbsp&nbsp</div>' +
                        '<span>&nbsp&nbsp日期：</span>' +
                        '<div class="mes-date">' + date + '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    // $('.usrres-divs').append(html);

                    totalHtml = totalHtml + html;

                } else {
                    $('.usrres-divs').html('<br><br><p style="color:#ccc"> 用户没有上传任何资源！</p>');
                }
            }
            //
            $('.usrres-divs').append(totalHtml);
        },
    };

    /**
     * [getPicFile 得到资源封面]
     * @return {[type]} [description]
     */
    function getPicFileURL(picName) {
        if (username && picName) {
            return encodeURI(gEcnu.config.geoserver + 'fileserver?req=getfile&fn=upload/' + 'user' + '/picFile/' + picName);
        }
    }

    // var usrRes = {
    //     usrResDiv:usrResDiv,
    //     collectResDiv:collectResDiv,

    // };//exprots



    $(function() {
        /**
         * 点击进入详情--进行修改
         */
        var editDetail = function() {
            $('.usrres-divs').on('click', '.usrres-onediv', function(event) {
                var fid = $(this).attr('data-fid');
                var config = require('../../../common/js/prjConfig');
                var subHref = config.subHref();
                location.href = subHref + '/modules/res/fileDetial.html?fid=' + fid + '&filename=""&action=edit';
            });
        };
        var toResDetail = function() {
            $('.usrres-divs').on('click', '.usrres-onediv-collect', function(event) {
                var fid = $(this).attr('data-fid');
                var config = require('../../../common/js/prjConfig');
                var subHref = config.subHref();
                location.href = subHref + '/modules/res/fileDetial.html?fid=' + fid /*+ '&filename=""'*/ ;
            });
        };
        $('.usrres-top div').filter('.usrres-top-menu').click(function(event) {
            $('.usrres-top div').removeClass('usrres-top-click');
            $('.usrres-top div').css('color', '#cccccc');
            $(this).addClass('usrres-top-click');
            $(this).css('color', '#337ab7');
        });

        $('.usr-page-main').on('click', '.usrres-collect', function(event) {
            // dbTools.usrCollectFile(collectResDiv.createResCollectDiv);
            dbTools.usrCollectFile(function() {
                collectResDiv.collectFyDiv.apply(collectResDiv, arguments);
            }, 'getAllDataFlag');
            $('.usr-main-right #pagination1').css('display', 'none');
            $('.usr-main-right #pagination2').css('display', 'block');
            toResDetail();
            $('.top-manager-btn').css('display', 'none');
            $('.usrres-onediv .usrres-ckb').css('display', 'none');
        });
        $('.usr-page-main').on('click', '.usrres-title', function(event) {
            $('.usr-main-right #pagination1').css('display', 'block');
            $('.usr-main-right #pagination2').css('display', 'none');
            $('.top-manager-btn').css('display', 'block');
            $('.usrres-onediv input').css('display', 'block');
            editDetail(); //只有在点击【我的资源】才能编辑
            // console.log(usrResDiv.fyDiv.call(usrResDiv,maxPage));
            // dbTools.queryUsrDB2Datas(usrResDiv.fyDiv); //查询资源并且分页
            // dbTools.queryUsrDB2Datas(usrResDiv.fyDiv.apply(usrResDiv,arguments)); //查询资源并且分页
            dbTools.queryUsrDB2Datas(function() {
                usrResDiv.fyDiv.apply(usrResDiv, arguments);
            }); //查询资源并且分页
            usrresManager.init(); //管理
        });
        $('.usrres-top .usrres-title').click(); //默认 我的资源
    });

    // module.exports = usrRes;
});
