define(function(require, exports, module) {
    var cookie = require('../../../common/js/cookie');
    var username = cookie.getCookie('username');
    var queryDB = require('../../res/js/queryDB');
    var dbTools = require('./dbOpr');
    var usrresManager = require('./usrresManager'); //管理
    function usrres() {

        $('.usrres-top div').filter('.usrres-top-menu').click(function(event) {
            $('.usrres-top div').removeClass('usrres-top-click');
            $('.usrres-top div').css('color', '#cccccc');
            $(this).addClass('usrres-top-click');
            $(this).css('color', '#337ab7');
        });

        $('.usr-page-main').on('click', '.usrres-collect', function(event) {
            // console.log('收藏的资源');
            dbTools.usrCollectFile(createResDiv);
            $('.usr-main-right .pagination').css('display', 'none');
            $('.top-manager-btn').css('display', 'none');
            $('.usrres-onediv input').css('display', 'none');
            $('.usrres-divs').css('min-height', '800px');
        });
        $('.usr-page-main').on('click', '.usrres-title', function(event) {
            $('.usr-main-right .pagination').css('display', 'block');
            $('.top-manager-btn').css('display', 'block');
            $('.usrres-onediv input').css('display', 'block');
            queryUsrDB.queryUsrDB2Datas(fyDiv); //查询资源并且分页
            usrresManager.init();
        });
        $('.usrres-top .usrres-title').click(); //默认 我的资源


        // queryUsrDB.queryUsrDB2Datas(fyDiv); //查询资源并且分页
        // usrresManager.init();
    }


    var queryUsrDB = {
        /**
         * 根据用户名去查询数据库
         * @return {[data]}                            [返回数据]
         */
        queryUsrDB2Datas: function(callback) {
            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    if (data) {
                        callback(Math.ceil(data.length / 10));
                    } else {
                        callback(1);
                    }
                },
                'processFailed': function() {
                    console.log("usrres.js文件下数据库操作失败！");
                }
            });
            //processAscyn: function(ActionType,map,lyrOrSQL,Params)
            var lyrOrSQL = {
                'lyr': 'uploadFile2',
                'fields': 'fid',
                'filter': 'uldname="' + username + '"'
            };
            sqlServices.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
            /**********数据库End**********************/
        },
        /*按页进行查询*/
        queryUsrDB2PageDatas: function(pageNum) {
            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    createResDiv(data);
                },
                'processFailed': function() {
                    console.log("usrres.js文件下数据库操作失败！");
                }
            });
            //processAscyn: function(ActionType,map,lyrOrSQL,Params)
            var lyrOrSQL = {
                'lyr': '(uploadFile2 join cDesign on uploadFile2.cdCode = cDesign.cdCode) as a left join cMoudle on a.cmCode=cMoudle.cmCode',
                'fields': 'fid,fPicFileName,ftype,subjectName,uldname,a.cdCode,cdName,a.cmCode,cmName,clCode,saCode,ssnj,ssks,wjlx,date,filename,fileRename,bzxx,fcomments',
                'filter': 'uldname="' + username + '"limit 10 offset ' + (pageNum * 10)
            };
            sqlServices.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
            /**********数据库End**********************/
        }
    };
    /**
     * [callback 分页回掉函数]
     * @param  {[type]}   data    [数据]
     * @param  {[type]}   maxPage [页数]
     */
    function fyDiv(maxPage) {
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
                queryUsrDB.queryUsrDB2PageDatas(num - 1); //按页进行获取数据
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
    }
    var cdNameArray = [],
        cmNameArray = [];
    /**
     * [createResDiv 获取数据库中的数据并写入]
     * @param  {[type]} data [数据库返回的数据]
     */
    function createResDiv(data) {
        // console.log(data);
        $('.usrres-divs').empty();
        var totalHtml = "",
            messagesTopHtml = "",
            html = "";
        for (var i = 0, len = data.length; i < len; i++) {
            var datai = data[i];
            if (datai) {
                var fileTitle = "";
                var fileRealName = datai.filename || datai.fileName||'';
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
                    fileImgHtml = "<div class='usrres-img'><img src='../res/img/nr/" + (i + 1) + ".png' class='cont-img' alt='封面'/></div>";
                }
                var wjlx = datai.wjlx == '0' ? "   " : datai.wjlx;
                var ssnj = datai.ssnj == '0' ? "   " : datai.ssnj;
                var ssks = datai.ssks == '0' ? "   " : datai.ssks;
                var date = datai.date == '0' ? "   " : datai.date;
                var cdName = datai.cdName ? datai.cdName : " ";
                var cmName = datai.cmName ? datai.cmName : " ";

                html = '<div class="usrres-onediv">' +
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

    /**
     * [getPicFile 得到资源封面]
     * @return {[type]} [description]
     */
    function getPicFileURL(picName) {
        if (username && picName) {
            return encodeURI(gEcnu.config.geoserver + 'fileserver?req=getfile&fn=upload/' + 'user' + '/picFile/' + picName);
        }
    }

    module.exports = usrres;
});
