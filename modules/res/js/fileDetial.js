/*文件下载页，评论页
    by zry
    2016-3-1
*/
define(function(require, exports, module) {
    /**********************************************************************/
    var cookie = require('../../../common/js/cookie');
    var username = cookie.getCookie('username'); //用户名
    var userId = localStorage.getItem('userId');
    var config = require('../../../common/js/prjConfig');
    var collctDB = require('./collectByDBOpr');
    var queryDB = require('./queryDB');
    var _downloadFile = require('./downloadFile');

    var isCollectFile = sessionStorage.getItem('isCollectFile');
    var userBeahivourId = sessionStorage.getItem('userBeahivourId');

    // var fid = sessionStorage.getItem('fid');
    // var cdName = sessionStorage.getItem('cdName');
    // var cmName = sessionStorage.getItem('cmName');
    var searchVals = location.search.split('&');
    var fid = searchVals[0].slice(5);
    console.log(fid);
    if (searchVals[2]) {
        var action = searchVals[2].slice(7);
    }

    /**
     * [downloadbyType 跟据文件类型选择方法进行下载]
     * @param  {[type]} fileAllName [文件名全称]
     */
    var downloadbyType = function(fileAllName, fileRename) {
        var fileType = fileAllName.slice(-3);
        if (fileType == "txt" || fileType == "tml" || fileType == "css" || fileType == ".js") {
            _downloadFile.downloadFileByBinary(fileAllName, fileRename);
        } else {
            _downloadFile.downloadFileByURL(fileAllName, fileRename);
        }
    };


    /*文件详情和文件类型图标填充*/
    var fileDetialSource = {
        init: function(data0) {
            this.fileDetialName(data0);
            var picName = data0.fPicFileName;
            if (picName) {
                var picFileURL = gEcnu.config.geoserver + 'fileserver?req=getfile&fn=upload/' + 'user' + '/picFile/' + picName;
                $('.file-type-img-src').css({
                    'width': '240px',
                });
                $('.file-type-img-src').attr("src", picFileURL);
            } else {
                this.fileTypeImage(data0.filename); //没有封面
            }
        },
        fileDetialName: function(data0) {
            var cdName, cmName, downloadFileName, fileRename,
                uldNameDetail,
                uldDateDetail,
                ssnjDataDetail,
                ssksDataDetail,
                wjlxDataDetail,
                ftype,
                subjectName,
                geoInfo,
                webSiteUrl,
                bzxxDataDetail;
            cdName = data0.cdName;
            cmName = data0.cmName;
            downloadFileName = data0.filename;
            fileRename = data0.fileRename;
            uldNameDetail = data0.uldname;
            uldDateDetail = data0.date;
            uldDateDetail = data0.date;
            ssnjDataDetail = data0.ssnj;
            ssksDataDetail = data0.ssks;
            wjlxDataDetail = data0.wjlx;
            ftype = data0.ftype;
            subjectName = data0.subjectName;
            geoInfo = data0.geoInfo;
            webSiteUrl = data0.webSiteUrl;
            bzxxDataDetail = data0.bzxx;

            if (fileRename && fileRename != 'null') {
                downloadFileName = fileRename;
            }
            uldNameDetail = uldNameDetail ? uldNameDetail : '匿名';
            ssnjDataDetail = ssnjDataDetail && ssnjDataDetail != "0" ? ssnjDataDetail : "无";
            ssksDataDetail = ssksDataDetail && ssksDataDetail != "0" ? ssksDataDetail : "无";
            wjlxDataDetail = wjlxDataDetail && wjlxDataDetail != "0" ? wjlxDataDetail : "无";
            bzxxDataDetail = bzxxDataDetail && bzxxDataDetail != "0" ? bzxxDataDetail : "无";
            var uBehaviourHtml = '';
            if (wjlxDataDetail === '网站服务') {
                uBehaviourHtml = '<div class="collect">收藏</div>' +
                    '<div class="to-website-div"> <a class="to-website" target="_blank" href="' + webSiteUrl + '"> 进入网站</a></div>' +
                    '<div class="user-behaviour-website-share ub-share">分享</div>';
                // '<div class="download-file-btn">分享 </div>' ;
            } else {
                uBehaviourHtml = '<div class="collect">收藏</div>' +
                    '<div class="download-file-btn">下载 </div>' +
                    '<div class="preview"> <a class="file-pre" target="_blank"> 预览</a></div>' +
                    '<div class="user-behaviour-share ub-share">分享</div>';
            }
            var html = ' <div class="file-detial">' +
                '<div>课程标准&nbsp&nbsp&nbsp&nbsp<span class="detial-kcbz"></span></div>' +
                '<div>所属年级&nbsp&nbsp&nbsp&nbsp<span class="detial-ssnj"></span></div>' +
                '<div>所属科室&nbsp&nbsp&nbsp&nbsp<span class="detial-ssks"></span></div>' +
                '<div>文件类型&nbsp&nbsp&nbsp&nbsp<span class="detial-wjlx"></span></div>' +
                '<div>备注信息&nbsp&nbsp&nbsp&nbsp<span class="detial-bzxx"></span></div>' +
                '<div>定位信息&nbsp&nbsp&nbsp&nbsp<a class="detial-loc"></a></div>' +
                '</div>' +
                '</div>' +
                '<div class="user-behaviour">' +
                uBehaviourHtml +
                '</div>';

            $('.main-file-messages').html(html);

            if (ftype == "2") {
                $('.file-detail-title').html(subjectName);
                $('.download-file-btn').css({
                    'color': '#ccc',
                    'cursor': 'default',
                    'border': 'none'
                });
                $('.preview .file-pre').css({
                    'color': '#ccc',
                    'cursor': 'default',
                    'border': 'none'
                });
            } else {
                var lastIndexOfDot = downloadFileName.lastIndexOf('.');
                if (lastIndexOfDot > 0) {
                    downloadFileName = downloadFileName.slice(0, lastIndexOfDot);
                    downloadFileName = downloadFileName ? downloadFileName : '文件名为空';
                } else {
                    downloadFileName = downloadFileName ? downloadFileName : '文件名为空';
                }
                $('.file-detail-title').html(downloadFileName);
            }
            $('.detial-uldname').html(uldNameDetail);
            $('.detial-ulddate').html(uldDateDetail);
            $('.detial-kcbz').html(cdName + ' - ' + cmName);
            $('.detial-ssnj').html(ssnjDataDetail);
            $('.detial-ssks').html(ssksDataDetail);
            $('.detial-wjlx').html(wjlxDataDetail);
            $('.detial-bzxx').html(bzxxDataDetail);
            $('.detial-loc').html(geoInfo);
        },
        /**
         * [fileTypeImage 文件类型图片插图]
         * @param  {[string]} downloadFileName [下载文件的名]
         * 
         */
        fileTypeImage: function(downloadFileName) {
            var fileType = downloadFileName.slice(-3);
            switch (fileType) {
                case "png":
                case "jpg":
                case "gif":
                    $('.file-type-img-src').attr("src", "img/type/pic.png");
                    break;
                case ".7z":
                    $('.file-type-img-src').attr("src", "img/type/7z.png");
                    break;
                case "doc":
                case "ocx":
                    $('.file-type-img-src').attr("src", "img/type/docx.png");
                    break;
                case "xls":
                case "lsx":
                    $('.file-type-img-src').attr("src", "img/type/excel.png");
                    break;
                case "pdf":
                    $('.file-type-img-src').attr("src", "img/type/pdf.png");
                    break;
                case "ppt":
                case "ptx":
                    $('.file-type-img-src').attr("src", "img/type/PPT.png");
                    break;
                case "rar":
                    $('.file-type-img-src').attr("src", "img/type/rar.png");
                    break;
                case "mp3":
                    $('.file-type-img-src').attr("src", "img/type/MP3.png");
                    break;
                case "txt":
                    $('.file-type-img-src').attr("src", "img/type/txt.png");
                    break;
                case "mp4":
                case "mov":
                case "avi":
                case "mvb":
                case "3gp":
                    $('.file-type-img-src').attr("src", "img/type/VIDEO.png");
                    break;
                case "zip":
                    $('.file-type-img-src').attr("src", "img/type/zip.png");
                    break;
                default:
                    //var node = document.getElementById('file-type-img-src');
                    // node.parentNode.romoveChild(node);

            }
        },
        /**
         * [subjectFileList 专题文件的列表]
         * @return {[type]} [description]
         */
        subjectFileList: function(downloadFileName) {
            var sfl = downloadFileName;
            // var sflArray = sfl.split(/\.\w*;/gi);
            var sflArray = sfl.split(";");
            var flHtml = "<div class='sub-lists-div'><ul class='file-lists'>";
            for (var i = 0; i < sflArray.length; i++) {
                flHtml += "<li><a class='file-list'>" + sflArray[i] + "</a>";
                flHtml += "<img class='sublist-dld-logo' src='img/downl.png'></li>";
            }
            flHtml += "</ul></div>";
            $('.main-file-messages').html(flHtml);
        }
    };

    /****************************************************************************************/
    $(function() {
        if (!action && !username) { //action不为share时候不是分享的就不用跳进登陆页
            location.assign(config.subHref() + "/modules/login/login.html");
        }

        var queryFilter = 'fid=' + fid;
        queryDB.queryDB2Page(queryFilter, -1, getFileDetail);
        /**
         * [getFileDetail 回掉函数]
         * @param  {[type]} data [查询数据库返回数据]
         */
        function getFileDetail(data) { //var getFileDetail = function(data) {}这个写法注意顺序
            console.log(data);
            var cdName = data[0].cdName || '',
                cmName = data[0].cmName || '',
                downloadFileName = data[0].filename,
                fileRename = data[0].fileRename,
                ftype = data[0].ftype,
                subjectName = data[0].subjectName;

            /*初始化 返回 资源详情页资源介绍部分*/
            var searchFileName;
            if (fileRename && fileRename !== 'null') {
                searchFileName = fileRename;
            } else {
                searchFileName = downloadFileName;
            }
            searchFileName = searchFileName.slice(0, 40);
            fileDetialSource.init(data[0]); //封面和详情
            cdName = cdName === "null" ? '其它' : cdName;
            cmName = cmName === "null" ? '其它' : cmName;
            console.log(cmName);
            $('.return-area').append('<a class="return-res">资源</a> > <a>' + cdName + '</a> > <a>' + cmName + '</a> > <a class="return-filename">' + searchFileName + '</a>'); //返回
            $('.return-area').find('a:lt(3)').on("click", function(event) {
                window.location.href = "res.html";
            });
            /**
             *分类别处理 是专题还是一般文件
             */
            if (ftype == "2") { //如果是专题的话
                $('.file-detail-title').addClass('subject-logo');
                $('.return-filename').html(subjectName);
                // $('.file-type-img-src').attr("src", "img/type/subject.png");
                $('.subject-list-btn').css('display', 'block');
                /* [点击 文件列表]*/
                $('.subject-list-btn').on('click', function(event) {
                    if ($(this).hasClass('subject-list-btn')) {
                        $(this).addClass('subject-list-btnclk');
                        $(this).removeClass('subject-list-btn');
                        fileDetialSource.subjectFileList(downloadFileName);
                    } else {
                        $(this).addClass('subject-list-btn');
                        $(this).removeClass('subject-list-btnclk');
                        fileDetialSource.fileDetialName(data[0]);
                    }
                });

                $('.main-file-messages').on('click', '.file-list', function(event) {
                    downloadbyType($(this).text(), fileRename);
                    addData2UbDownload();
                });
                $('.main-file-messages').on('click', '.sublist-dld-logo', function(event) {
                    downloadbyType($(this).prev('.file-list').text(), fileRename);
                    addData2UbDownload();
                });

            } else { //非专题
                $('.download-file-btn').on('click', function(event) {
                    downloadbyType(downloadFileName, fileRename);
                    addData2UbDownload();
                });
                $('.preview .file-pre').attr('href', 'previewPage.html?fid=' + fid + '&downloadFileName=' + downloadFileName);
            }

            collectEvents();
        } /*回掉函数结束*/



        var collectEvents = function() {
            $('.main-file-messages').on('click', '.user-behaviour div:first', function(event) {
                console.log('收藏');
                if ($(this).hasClass('collect-clk')) {
                    sessionStorage.setItem('isCollectFile', '0');
                    collctDB.removeCollect(userBeahivourId);
                    $(this).addClass('collect');
                    $(this).removeClass('collect-clk');
                } else {
                    sessionStorage.setItem('isCollectFile', '1');
                    collctDB.addCollect(userId, username, fid);
                    $(this).addClass('collect-clk');
                    $(this).removeClass('collect');
                }
            });
            if (isCollectFile == "1") { //如果被收藏了
                $('.user-behaviour div:first').addClass('collect-clk');
            }
        };

        $('.main-file-messages').on('click', '.detial-loc', function(event) {
            var geoLoc = $.trim($(this).text());
            console.log(geoLoc);
            /*使用百度地图解析地址*/

            $('.bgModal').fadeIn('slow', function() {
                $(this).css('display', 'block');
            });
            $('.geo-info-modal').slideUp('slow', function() {
                $(this).css('display', 'block');
            });

            var BDMapHtml = require('../subs/BDMapLoc.html');
            $('.geo-info-modal').html(BDMapHtml);
            require('../css/BDMapLoc.css');
            //百度地图处理逻辑代码
            var myBDMap = require('./BDMapLoc');
            var map = myBDMap.initLayout();
            myBDMap.geocoderLocName(map, geoLoc);

            $('.geo-info-modal').on('click', '.close-bdmap', function(event) {
                $('.bgModal').fadeOut('slow', function() {
                    $(this).css('display', 'none');
                });
                $('.geo-info-modal').slideUp('slow', function() {
                    $(this).css('display', 'none');
                });
            });
        });

        /*插件实现复制到粘贴板*/
        $(".main-file-messages")
            .on("copy", ".ub-share", function( /* ClipboardEvent */ e) {
                var shareUrl = location.href;
                if (!/\&action=share$/.test(shareUrl)) {
                    shareUrl += "&action=share";
                }
                e.clipboardData.clearData();
                e.clipboardData.setData("text/plain", shareUrl);
                alertDialogShow('地址已经复制到粘贴板了，现在可以去分享啦！');
                e.preventDefault();
            });
        /**
         * [addData2UbDownload 下载时候 添加数据到数据库]
         */
        function addData2UbDownload() {
            var dbTool = require('./dbOpr');
            dbTool.addData2UbDownload(userId, username, fid);
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

    });
    /********************************************************************************/
    // module.exports = fileDetial;
});
