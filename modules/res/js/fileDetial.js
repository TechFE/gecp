/*文件下载页，评论页
    by zry
    2016-3-1
*/
// $(document).ready(function() {
define(function(require, exports, module) {
    /**********************************************************************/
    window.GECP = {};
    window.GECP.fd = {};
    var cookie = require('../../../common/js/cookie');
    var username = cookie.getCookie('username'); //用户名
    var config = require('../../../common/js/prjConfig');
    var collctDB = require('./collectByDBOpr');
    var cdName = sessionStorage.getItem('cdName');
    var cmName = sessionStorage.getItem('cmName');
    var fid = sessionStorage.getItem('fid');
    var userId = localStorage.getItem('userId');
    var isCollectFile = sessionStorage.getItem('isCollectFile');
    var userBeahivourId = sessionStorage.getItem('userBeahivourId');
    var _downloadFile = require('./downloadFile');

    // function fileDetial() {

    // }
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
        init: function() {
            this.fileDetialName();
            var picName = sessionStorage.getItem('fPicFileName');
            if (picName && username) {
                var picFileURL = gEcnu.config.geoserver + 'fileserver?req=getfile&fn=upload/' + 'user' + '/picFile/' + picName;
                $('.file-type-img-src').css({
                    'width': '240px',
                });
                $('.file-type-img-src').attr("src", picFileURL);
            } else {
                this.fileTypeImage(sessionStorage.getItem('fileName'));
            }
        },
        fileDetialName: function() {
            var fileRename = sessionStorage.getItem('fileRename'),
                downloadFileName = sessionStorage.getItem('fileName'),
                uldNameDetail = sessionStorage.getItem('uldName'),
                uldDateDetail = sessionStorage.getItem('uldDate'),
                // kcbzDataDetail = sessionStorage.getItem('kcbz'),

                ssnjDataDetail = sessionStorage.getItem('ssnj'),
                ssksDataDetail = sessionStorage.getItem('ssks'),
                wjlxDataDetail = sessionStorage.getItem('wjlx'),
                ftype = sessionStorage.getItem('ftype'),
                subjectName = sessionStorage.getItem('subjectName'),
                webSiteUrl = sessionStorage.getItem('webSiteUrl'),
                bzxxDataDetail = sessionStorage.getItem('bzxx');
            if (fileRename && fileRename != 'null') {
                downloadFileName = fileRename;
            }
            uldNameDetail = uldNameDetail ? uldNameDetail : '匿名';
            ssnjDataDetail = ssnjDataDetail && ssnjDataDetail != "0" ? ssnjDataDetail : "无";
            ssksDataDetail = ssksDataDetail && ssksDataDetail != "0" ? ssksDataDetail : "无";
            wjlxDataDetail = wjlxDataDetail && wjlxDataDetail != "0" ? wjlxDataDetail : "无";
            bzxxDataDetail = bzxxDataDetail && bzxxDataDetail != "0" ? bzxxDataDetail : "无";
            GECP.fd.downloadFileName = downloadFileName;
            GECP.fd.subjectName = subjectName;
            GECP.fd.ftype = ftype;
            var uBehaviourHtml = '';
            if(wjlxDataDetail==='网站服务'){
                uBehaviourHtml = '<div class="collect">收藏</div>' +
                '<div class="to-website-div"> <a class="to-website" target="_blank" href="'+webSiteUrl+'"> 进入网站</a></div>';
                // '<div class="download-file-btn">分享 </div>' ;
            }else{
               uBehaviourHtml= '<div class="collect">收藏</div>' +
                '<div class="download-file-btn">下载 </div>' +
                '<div class="preview"> <a class="file-pre" target="_blank"> 预览</a></div>';
            }
            var html = ' <div class="file-detial">' +
                '<div>课程标准&nbsp&nbsp&nbsp&nbsp<span class="detial-kcbz"></span></div>' +
                '<div>所属年级&nbsp&nbsp&nbsp&nbsp<span class="detial-ssnj"></span></div>' +
                '<div>所属科室&nbsp&nbsp&nbsp&nbsp<span class="detial-ssks"></span></div>' +
                '<div>文件类型&nbsp&nbsp&nbsp&nbsp<span class="detial-wjlx"></span></div>' +
                '<div>备注信息&nbsp&nbsp&nbsp&nbsp<span class="detial-bzxx"></span></div>' +
                '<div>定位信息&nbsp&nbsp&nbsp&nbsp<a class="detial-loc">无</a></div>' +
                '</div>' +
                '</div>' +
                '<div class="user-behaviour">' +
                 uBehaviourHtml+
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
        subjectFileList: function() {
            var sfl = window.GECP.fd.downloadFileName;
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
        if (!username) {
            parent.location.assign(config.subHref() + "/modules/login/login.html");
        }

        /*初始化 返回 资源详情页资源介绍部分*/
        var fileName = sessionStorage.getItem('fileName').slice(0, 35);
        fileDetialSource.init(); //封面和详情
        $('.return-area').append('<a class="return-res">资源</a> > <a>' + cdName + '</a> > <a>' + cmName + '</a> > <a class="return-filename">' + fileName + '</a>'); //返回
        $('.return-area').find('a:lt(3)').on("click", function(event) {
            /* Act on the event */
            window.location.href = "res.html";
        });
        $('.main-file-messages').on('click', '.user-behaviour div:first', function(event) {
            console.log('收藏');
            if ($(this).hasClass('collect-clk')) {
                collctDB.removeCollect(userBeahivourId);
                $(this).addClass('collect');
                $(this).removeClass('collect-clk');
            } else {
                collctDB.addCollect(userId, username, fid);
                $(this).addClass('collect-clk');
                $(this).removeClass('collect');
            }
        });
        var whereArgs = 'userId=' + userId + ' and userCollectFileId =' + fid;
        collctDB.queryCollect(whereArgs); //看看是否被收藏了
        if (isCollectFile == "1") { //如果被收藏了
            $('.user-behaviour div:first').addClass('collect-clk');
            // $('.collect-clk').text('已收藏');
            // $('.user-behaviour div:first').removeClass('collect');
        }
        /**
         *分类别处理 是专题还是一般文件
         */
        var fileRename = sessionStorage.getItem('fileRename');
        if (window.GECP.fd.ftype == "2") { //如果是专题的话
            // fileDetialSource.subjectFileList(); //专题文件列表
            $('.file-detail-title').addClass('subject-logo');
            $('.return-filename').html(window.GECP.fd.subjectName);
            // $('.file-type-img-src').attr("src", "img/type/subject.png");
            $('.subject-list-btn').css('display', 'block');
            /* [点击 文件列表]*/
            $('.subject-list-btn').on('click', function(event) {
                if ($(this).hasClass('subject-list-btn')) {
                    $(this).addClass('subject-list-btnclk');
                    $(this).removeClass('subject-list-btn');
                    fileDetialSource.subjectFileList();
                } else {
                    $(this).addClass('subject-list-btn');
                    $(this).removeClass('subject-list-btnclk');
                    fileDetialSource.fileDetialName();
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
                downloadbyType(sessionStorage.getItem('fileName'), fileRename);
                addData2UbDownload();
            });
            $('.preview .file-pre').attr('href', 'previewPage.html');
        }
        /**
         * [addData2UbDownload 下载时候 添加数据到数据库]
         */
        function addData2UbDownload() {
            var dbTool = require('./dbOpr');
            dbTool.addData2UbDownload(userId, username, fid);
        }

    });
    /********************************************************************************/
    // module.exports = fileDetial;
});
