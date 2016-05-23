/**
 * 全局搜索
 */
define(function(require, exports, module) {
    var config = require('./prjConfig');
    var globalSearch = {
        init: function() {
            this.initLayout();
            this.clickSearchResultMenu();
            this.queryFilter2GetDB();
            this.resContentOpr();//资源点击进入详情
        },

        initLayout: function() {
            $('.search-result-menu li:first').addClass('search-result-menu-hover');
            $('search-result-mes').text();
        },
        fyDiv: function(maxPage, queryFilter) {
            /*****分页功能**********************/
            var self = this;
            var currentPageNum = parseInt(sessionStorage.getItem('currentResSearchPage')) || 1;

            maxPage = maxPage == 0 ? 1 : maxPage;
            $.jqPaginator('#pagination1', {
                totalPages: maxPage,
                visiblePages: 10,
                currentPage: 1,
                onPageChange: function(num, type) {
                    // $('#p1').text(type + '：' + num);
                    console.log(type + '：' + num);
                    if (type == "init") {
                        num = 1;
                    } else {
                        sessionStorage.setItem('currentResSearchPage', parseInt(num)); //保存刷新之前的当前页码
                    }
                    var currentPageNum = parseInt(sessionStorage.getItem('currentResSearchPage')) || 1;
                    if (currentPageNum != 1 && type == "init") {
                        num = currentPageNum; //即使刷新，进入为最后一次所在页码
                    }

                    // queryDB.queryDB2Page(queryFilter, num - 1); //num -1 作为分页数-->where的limit  第一次num - 1【0】初始化第一页
                    self.searchFromDB(queryFilter, num - 1, '', 'byPage'); //===>分页，根据分页查询数据库，并且动态显示HTML
                }
            });
            $('#pagination1').jqPaginator('option', {
                currentPage: currentPageNum,
                //pageSize:15,
                visiblePages: 6,
                first: '<li class="first"><a href="javascript:;">首页</a></li>',
                prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
                next: '<li class="next"><a href="javascript:;">下一页</a></li>',
                page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
                last: '<li class="last"><a href="javascript:;">末页</a></li>'
            });
        },
        queryFilter2GetDB: function() {
            var searchTxtSplit = location.search.split('&');
            var searchTxt = searchTxtSplit[0].slice(7);
            var searchClass = searchTxtSplit[1].slice(6); //查询的类型
            var searchTxtArray = searchTxt.split('+');
            var queryFilter1 = "",
                searchText, pageSearchText = "";
            for (var i = 0, len = searchTxtArray.length - 1; i < len; i++) {
                searchText = decodeURIComponent(searchTxtArray[i]);
                pageSearchText += searchText + " ";
                queryFilter1 += " filename like '%" + searchText + "%' or fileRename like '%" + searchText + "%' or subjectName like '%" + searchText + "%' or";
            }
            var searchTextLast = decodeURIComponent(searchTxtArray[len]);
            pageSearchText += searchTextLast;
            $('.page-global-search-text').val(pageSearchText);
            queryFilter1 += " filename like '%" + searchTextLast + "%' or fileRename like '%" + searchTextLast + "%' or subjectName like '%" + searchTextLast + "%'";
            if (searchClass === 'res') { //查询的是资源
                this.searchFromDB(queryFilter1, -1, pageSearchText, 'getAllNums'); //===>查找全部数据，并且初始化分页
            }

        },
        clickSearchResultMenu: function() {
            $('.search-result-menu li').on('click', function(event) {
                $(this).parent().children().removeClass('search-result-menu-hover');
                $(this).addClass('search-result-menu-hover');
                console.log($.trim($(this).text()));
                switch ($.trim($(this).text())) {
                    case '资源':
                        sessionStorage.setItem('searchClassType', 'res');
                        break;
                    case '课程':
                        sessionStorage.setItem('searchClassType', 'course');
                        break;
                    case '问答':
                        sessionStorage.setItem('searchClassType', 'question');
                        break;
                }
            });
        },
        searchFromDB: function(queryFilter, pageNum, pageSearchText, action) {
            var self = this;
            var onePageRes = 20;
            queryFilter = queryFilter ? queryFilter : '1=1'; //queryFilter为空的话 1=1

            if ((pageNum + 1)) { //附加limit offset条件
                queryFilter = queryFilter + " limit " + onePageRes + " offset " + pageNum * onePageRes;
            }
            console.log(queryFilter);
            var maxPage;
            var lyrVal = 'ratesDownloads'; //数据库中的视图
            var fieldsVal = 'fid,fPicFileName,ftype,subjectName,uldname,cdCode,cdName,cmCode,cmName,clCode,saCode,ssnj,ssks,wjlx,geoInfo,date,filename,fileRename,bzxx,fcomments,uldFileId,fcRate,rateNums,downloadNums';

            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    console.log(data);
                    if (data) {
                        console.log(action);
                        if (action === 'byPage') {
                            self.createResultContent(data);
                        } else if (action === 'getAllNums') {
                            $('.search-result-mes').text("为您找到有关 " + pageSearchText + " 的数据");
                            self.fyDiv(Math.ceil(data.length / onePageRes), queryFilter); //初始化分页
                        }
                    } else {
                        $('.search-result-mes').text("对不起！没有为您找到有关 " + pageSearchText + " 的数据");
                    }
                },
                'processFailed': function() {
                    console.log("globalSearch.js文件下数据库操作失败！");
                }
            });
            //processAscyn: function(ActionType,map,lyrOrSQL,Params)
            var lyrOrSQL = {
                'lyr': lyrVal,
                'fields': fieldsVal,
                'filter': queryFilter
            };
            sqlServices.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
            /**********数据库End**********************/
        },
        createResultContent: function(data) {
            if (data.length == 0) {
                $('.search-result-div').html('<br><br><p style="color:#ccc">对不起，没有搜索到资源！</p>');
                return;
            }
            $('.search-result-div').empty(); //清除所有再去添加
            var totalHtml = "",
                messagesTopHtml = "",
                html = "";
            for (var i = 0, len = data.length; i < len; i++) {
                var datai = data[i];
                if (datai) {
                    var fileTitle = "";
                    if (datai.fileRename && datai.fileRename != 'null') {
                        fileTitle = datai.fileRename;
                    } else {
                        fileTitle = datai.filename;
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
                            '<div class="filename-hidden">' + datai.filename + '</div>';
                    }

                    var prjUtil = require('./prjUtil');
                    if (datai.fPicFileName) { //如果有封面
                        var picFileURL = prjUtil.getPicFileURL(datai.fPicFileName);
                        fileImgHtml = "<div class='usrres-img'><img src='" + decodeURI(picFileURL) + "' class='cont-img' alt='封面'/></div>";
                    } else {
                        //空
                        var imgNum = i;
                        if (imgNum >= 15) {
                            imgNum = imgNum - 10;
                        }
                        fileImgHtml = "<div class='usrres-img'><img src='../../modules/res/img/nr/" + (imgNum + 1) + ".png' class='cont-img' alt='封面'/></div>";
                    }
                    var wjlx = datai.wjlx == '0' ? "   " : datai.wjlx;
                    var ssnj = datai.ssnj == '0' ? "   " : datai.ssnj;
                    var ssks = datai.ssks == '0' ? "   " : datai.ssks;
                    var date = datai.date == '0' ? "   " : datai.date;
                    var cdName = datai.cdName ? datai.cdName : " ";
                    var cmName = datai.cmName ? datai.cmName : " ";

                    html = '<div class="usrres-onediv" data-fid="' + datai.fid + '">' +
                        fileImgHtml +
                        '<div class="usrres-messages">' +
                        messagesTopHtml +
                        '<div class="messages-bottom">' +
                        '<div class="mes-fid">' + datai.fid + '</div>' +
                        '<div class="mes-ftype">' + datai.ftype + '</div>' +
                        '<div class="mes-cdcm">' + cdName + '&nbsp&nbsp</div>' +
                        '<div class="mes-cdcm">' + cmName + '&nbsp&nbsp</div>' +
                        '<div class="mes-wjgs">' + wjlx + '&nbsp&nbsp</div>' +
                        '<div class="mes-ssnj">' + ssnj + '&nbsp&nbsp</div>' +
                        '<div class="mes-ssks">' + ssks + '&nbsp&nbsp</div>' +
                        // '<span>&nbsp&nbsp上传者：</span>' +
                        '<div class="res-date"><span class="glyphicon glyphicon-time"></span>&nbsp' + date + '</div>' +
                        '<div class="res-uldname"><span class="glyphicon glyphicon-user"></span>&nbsp' + datai.uldname + '&nbsp&nbsp</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    totalHtml = totalHtml + html;

                }
            }
            //
            $('.search-result-div').append(totalHtml);
        },
        /**
         * [resContentOpr 点击条目进入详情]
         */
        resContentOpr: function() {
            $('.search-result-div').on('click', '.usrres-onediv', function(event) {
                var fid = $(this).attr('data-fid');
                console.log(fid);
                var config = require('./prjConfig');
                var subHref = config.subHref();
                 location.href = subHref+'/modules/res/fileDetial.html?fid='+fid+'&filename=""';
            });
        }
    };

    module.exports = globalSearch;
});
