/*
 * zry 2015-11-05
 * 生成文件列表div 点击进入详情页,-->下载
 *
 */
define(function(require, exports, module) {
    // $(document).ready(function() {
    var queryDB = require('./queryDB');
    var cookie = require('../../../common/js/cookie');
    var username = cookie.getCookie('username');
    var resContent = {
        initLayout: function(queryFilter) {
            // queryDB.queryDB2Page('', 0); //默认加载文件列表  内容的初始化--fyDiv函数中已经初始化一次
            queryDB.queryDBDatasNum('fyDiv', queryFilter, '', this.fyDiv); //分页  因为需要获取总页数
            //this.fyDiv 回掉函数,不能加()

        },
        createResBigContent: function(data) {
            // //分页取数据   data
            console.log(data);
            if (data.length == 0) {
                $('.contentDiv').html('<br><br><p style="color:#ccc">对不起，没有搜索到资源！</p>');
                return;
            }

            $('.contentDiv').empty(); //清除所有再去添加
            var html, contHtml = '',
                fileName = '',
                fileImgHtml = '',
                uldname;
            for (var i = 0; i < data.length; i++) {
                var datai = data[i];
                if (datai.ftype == '1') {
                    var fileRename = datai.fileRename;
                    if (fileRename && fileRename != 'null') {
                        fileName = fileRename;
                    } else {
                        fileName = datai.filename;
                    }
                    var lastIndexOfDot = fileName.lastIndexOf('.');
                    if (lastIndexOfDot > 0) {
                        fileName = fileName.slice(0, lastIndexOfDot);
                        fileName = fileName ? fileName : '文件名为空';
                    } else {
                        fileName = fileName ? fileName : '文件名为空';
                    }
                } else if (datai.ftype == '2') {
                    fileName = '【专题】' + datai.subjectName;
                    fileName = fileName == "【专题】" || fileName ? fileName : '专题名为空';
                }
                if (datai.fPicFileName) { //如果有封面
                    var picFileURL = getPicFileURL(datai.fPicFileName);
                    fileImgHtml = "<div><img src='" + decodeURI(picFileURL) + "' class='cont-img' alt='封面'/></div>";
                } else {
                    //空
                    fileImgHtml = "<div><img src='img/nr/" + (i + 1) + ".png' class='cont-img' alt='封面'/></div>";
                }
                var pfjUtil = require('../../../common/js/prjUtil');
                pfjUtil.getCharLen();
                uldname = datai.uldname || '';
                var len = uldname.gblen();
                if (len >= 12) {
                    uldname = uldname.slice(0, 12) + '...';
                }
                var fcRate = datai.fcRate && datai.fcRate !== 'null' ? datai.fcRate : 0;
                var fAvgRate;
                if (datai.rateNums === 0) {
                    fAvgRate = 0;
                } else {
                    fAvgRate = (parseInt(fcRate) / parseInt(datai.rateNums)).toFixed(2);
                }

                var downloadNums = parseInt(datai.downloadNums);
                html = "<li class='content-one' data-fid='" + datai.fid + "'>" +
                    fileImgHtml +
                    "<h5 class='cont-title'>" + fileName + "</h5>" +
                    "<span class='glyphicon glyphicon-star'></span>&nbsp" + fAvgRate +
                    "&nbsp&nbsp<span class='glyphicon glyphicon-save'></span>&nbsp" + downloadNums +
                    "<hr>" +
                    "<span class='cont-name'><span class='glyphicon glyphicon-user'></span>&nbsp" + uldname + "</span>" +
                    "<span class='cont-date'><span class='glyphicon glyphicon-time'></span>&nbsp" + datai.date + "</span>" +
                    "</li>";
                contHtml = contHtml + html;
                // fragDocument.appendChild(html);
            }
            contHtml = "<ul>" + contHtml + "</ul>";
            $('.contentDiv').append(contHtml);
        },
        createResSmallContent: function(data) {
            // console.log(data);
            if (data.length == 0) {
                $('.contentDiv').html('<br><br><p style="color:#ccc">对不起，没有搜索到资源！</p>');
                return;
            }
            $('.contentDiv').empty(); //清除所有再去添加
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

                    /* if (datai.fPicFileName) { //如果有封面
                         var picFileURL = getPicFileURL(datai.fPicFileName);
                         fileImgHtml = "<div class='usrres-img'><img src='" + decodeURI(picFileURL) + "' class='cont-img' alt='封面'/></div>";
                     } else {
                         //空
                         fileImgHtml = "<div class='usrres-img'><img src='../res/img/nr/" + (i + 1) + ".png' class='cont-img' alt='封面'/></div>";
                     }*/
                    var wjlx = datai.wjlx == '0' ? "   " : datai.wjlx;
                    var ssnj = datai.ssnj == '0' ? "   " : datai.ssnj;
                    var ssks = datai.ssks == '0' ? "   " : datai.ssks;
                    var date = datai.date == '0' ? "   " : datai.date;
                    var cdName = datai.cdName ? datai.cdName : " ";
                    var cmName = datai.cmName ? datai.cmName : " ";

                    html = '<div class="usrres-onediv" data-fid="' + datai.fid + '">' +
                        // fileImgHtml +
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
            $('.contentDiv').append(totalHtml);

        },
        fyDiv: function(maxPage, queryFilter, isBySearch) {
            /*****分页功能**********************/
            var currentPageNum = parseInt(sessionStorage.getItem('currentPageNum')) || 1;

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
                        sessionStorage.setItem('currentPageNum', parseInt(num)); //保存刷新之前的当前页码
                    }
                    var currentPageNum = parseInt(sessionStorage.getItem('currentPageNum')) || 1;
                    if (currentPageNum != 1 && type == "init") {
                        num = currentPageNum; //即使刷新，进入为最后一次所在页码
                    }
                    if (isBySearch == 'bySearch' && type == "init") { //如果是点击搜索就不要在这里重复初始化了
                        return;
                    }
                    queryDB.queryDB2Page(queryFilter, num - 1); //num -1 作为分页数-->where的limit  第一次num - 1【0】初始化第一页
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
            /*****分页功能End**********************/
        },
        changeLookStyle: function() {
            var lookStyle = sessionStorage.getItem('lookStyle');
            if (lookStyle == "small") {
                $('.big-look-style').css('color', '#333');
                $('.small-look-style').css('color', '#337AB7');
            } else {
                $('.small-look-style').css('color', '#333');
                $('.big-look-style').css('color', '#337AB7');
            }
            $('.look-style').on('click', '.small-look-style', function(event) {
                sessionStorage.setItem('lookStyle', 'small');
                $('.big-look-style').css('color', '#333');
                $('.small-look-style').css('color', '#337AB7');
                location.reload();
            });
            $('.look-style').on('click', '.big-look-style', function(event) {
                sessionStorage.setItem('lookStyle', 'big');
                $('.small-look-style').css('color', '#333');
                $('.big-look-style').css('color', '#337AB7');
                location.reload();
            });
        }
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
    module.exports = resContent;

    $(function() {
        // var cookie = require('../../../common/js/cookie');
        // var username = cookie.getCookie('username');
        var config = require('../../../common/js/prjConfig');
        if (username == "") {
            parent.location.assign(config.subHref() + "/modules/login/login.html");
        }

        $('#contentDiv').on('click', '.content-one', function(event) {
            var fid = $(this).attr('data-fid');
            queryDB.queryByTb_Fields('uploadFile2', 'fid', fid, setData);
        });
        $('#contentDiv').on('click', '.usrres-onediv', function(event) {
            var fid = $(this).attr('data-fid');
            queryDB.queryByTb_Fields('uploadFile2', 'fid', fid, setData);
        });


        /**
         * [setData setDataGetName回掉函数]
         * @param {[type]} data [查询数据库返回的数据]
         */
        function setData(data) {
            sessionStorage.setItem('fileName', data[0].FILENAME);
            sessionStorage.setItem('fileRename', data[0].FILERENAME);
            sessionStorage.setItem('uldName', data[0].ULDNAME);
            sessionStorage.setItem('uldDate', data[0].DATE);
            sessionStorage.setItem('ssnj', data[0].SSNJ);
            sessionStorage.setItem('ssks', data[0].SSKS);
            sessionStorage.setItem('wjlx', data[0].WJLX);
            sessionStorage.setItem('bzxx', data[0].BZXX);
            sessionStorage.setItem('fcomments', data[0].FCOMMENTS);
            sessionStorage.setItem('fid', data[0].FID);
            sessionStorage.setItem('ftype', data[0].FTYPE);
            sessionStorage.setItem('subjectName', data[0].SUBJECTNAME);
            sessionStorage.setItem('fPicFileName', data[0].FPICFILENAME);
            sessionStorage.setItem('webSiteUrl', data[0].WEBSITEURL);
            var cdCode = data[0].CDCODE;
            queryDB.queryByTb_Fields('cDesign', 'cdCode', cdCode, setDataGetName);
            var cmCode = data[0].CMCODE;
            queryDB.queryByTb_Fields('cMoudle', 'cmCode', cmCode, setDataGetName);
            var clCode = data[0].CLCODE;
            queryDB.queryByTb_Fields('coreLiteracy', 'clCode', clCode, setDataGetName);
            var saCode = data[0].SACODE;
            queryDB.queryByTb_Fields('schoolAch', 'saCode', saCode, setDataGetName);
        }

        function setDataGetName(data) {
            if (data[0].CDNAME) {
                sessionStorage.setItem('cdName', data[0].CDNAME);
            } else if (data[0].CMNAME) {
                sessionStorage.setItem('cmName', data[0].CMNAME);
            } else if (data[0].CLNAME) {
                sessionStorage.setItem('clName', data[0].CLNAME);
            } else if (data[0].SANAME)
                sessionStorage.setItem('saName', data[0].SANAME);
            //全部执行结束
            parent.location.assign(config.subHref() + "/modules/res/fileDetial.html");
        }
    });

});
