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
    var dbTool = require('./dbOpr');

    var isCollectFile = sessionStorage.getItem('isCollectFile');
    var userBeahivourId = sessionStorage.getItem('userBeahivourId');

    // var fid = sessionStorage.getItem('fid');
    // var cdName = sessionStorage.getItem('cdName');
    // var cmName = sessionStorage.getItem('cmName');
    var searchVals = location.search.split('&');
    var fid = searchVals[0].slice(5);
    var action;
    if (searchVals[2]) {
        action = searchVals[2].slice(7);
    }
    console.log(action);
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


            var html;
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
            // if (action === 'edit') {

            // } else {
            html = ' <div class="file-detial">' +
                '<div>课程设计&nbsp&nbsp&nbsp&nbsp<span class="detial-cdName"></span></div>' +
                '<div>课程模块&nbsp&nbsp&nbsp&nbsp<span class="detial-cmName"></span></div>' +
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
            // }


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
            $('.detial-cdName').html(cdName);
            $('.detial-cmName').html(cmName);
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
        if (action !== 'share' && !username) { //action不为share时候不是分享的就不用跳进登陆页
            location.assign(config.subHref() + "/modules/login/login.html");
        }

        var queryFilter = 'fid=' + fid;
        queryDB.queryDB2Page(queryFilter, -1, getFileDetail);
        /**
         * 根据fid进行查询
         * [getFileDetail 回掉函数]
         * @param  {[type]} data [查询数据库返回数据]
         */
        function getFileDetail(data) { //var getFileDetail = function(data) {}这个写法注意顺序
            console.log(data);
            var data0 =data[0];
            var cdName = data0.cdName || '',
                cmName = data0.cmName || '',
                downloadFileName = data0.filename,
                fileRename = data0.fileRename,
                ftype = data0.ftype,
                subjectName = data0.subjectName;

            /*初始化 返回 资源详情页资源介绍部分*/
            var searchFileName;
            if (fileRename && fileRename !== 'null') {
                searchFileName = fileRename;
            } else {
                searchFileName = downloadFileName;
            }
            searchFileName = searchFileName.slice(0, 40);
            fileDetialSource.init(data0); //封面和详情
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
                        fileDetialSource.fileDetialName(data0);
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
            if (action === 'edit') {
                editEvents(data0); //编辑
            }
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

        var editEvents = function(data0) {

            /*修改action = edit*/

            $('.edit-btns').fadeIn('slow', function() {
                $(this).css('display', 'block');
            });
            //修改
            $('.edit-btns').one('click', '.res-edit-btn', function(event) {
                var fileTitle = $('.file-detail-title').text();
                $('.file-detail-title').html('<input type="text" class="file-detail-title-edit">');
                $('.file-detail-title-edit').val(fileTitle);

                var detialCdName = $('.detial-cdName').text();
                var cdHtml = '<select name="cdcode" class="detial-cdName-edit">' +
                    '<option value="0">--课程设计--</option>' +
                    '<option value="BX">必修</option>' +
                    '<option value="XX1">选修1</option>' +
                    '<option value="XX2">选修2</option>' +
                    '<option value="CDQT">其它</option>' +
                    '</select>';

                $('.detial-cdName').html(cdHtml);
                // console.log(detialCdName);
                var ind = 0;
                $('.detial-cdName-edit option').each(function(index, el) {
                    if ($(this).text() === detialCdName) {
                        ind = index;
                    }
                });

                $('.detial-cdName-edit option').eq(ind).attr('selected', 'true');
                // $(".detial-cdName-edit").val(detialCdName); 
                var detialCmName = $('.detial-cmName').text();
                var cmHtml = '<select name="cmcode" class="detial-cmName-edit">' +
                    '<option value="0">--课程模块--</option>' +
                    '<option value="ZRDL">自然地理</option>' +
                    '<option value="RWDL">人文地理</option>' +
                    '<option value="DQKX">地球科学基础</option>' +
                    '<option value="QYFZ">区域发展</option>' +
                    '<option value="ZHGA">资源环境与国家安全</option>' +
                    '<option value="HYDL">海洋地理</option>' +
                    '<option value="LYDL">旅游地理</option>' +
                    '<option value="ZRZF">自然灾害与防治</option>' +
                    '<option value="TWJC">天文学基础</option>' +
                    '<option value="CXQG">城乡与区域规划</option>' +
                    '<option value="HJBH">环境保护</option>' +
                    '<option value="ZZDL">政治地理</option>' +
                    '<option value="DXJY">地理信息技术应用</option>' +
                    '<option value="YWKC">地理野外考察</option>' +
                    '<option value="CMQT">其它</option>' +
                    '</select>';
                $('.detial-cmName').html(cmHtml);
                var ind1 = 0;
                $('.detial-cmName-edit option').each(function(index, el) {
                    if ($(this).text() === detialCmName) {
                        ind1 = index;
                    }
                });
                $('.detial-cmName-edit option').eq(ind1).attr('selected', 'true');

                var detialSsnj = $('.detial-ssnj').text();
                var ssnjHtml = '<select name="ssnj" class="detial-ssnj-edit">' +
                    '<option value="0">--所属年级--</option>' +
                    '<option value="七年级">七年级</option>' +
                    '<option value="八年级">八年级</option>' +
                    '<option value="九年级">九年级</option>' +
                    '<option value="高一">高一</option>' +
                    '<option value="高二">高二</option>' +
                    '<option value="高三">高三</option>' +
                    '</select>';
                $('.detial-ssnj').html(ssnjHtml);
                var ind2 = 0;
                $('.detial-ssnj option').each(function(index, el) {
                    if ($(this).text() === detialSsnj) {
                        ind2 = index;
                    }
                });
                $('detial-ssnj-edit option').eq(ind2).attr('selected', 'true');

                var detialSsks = $('.detial-ssks').text();
                var ssksHtml = '<select name="ssks" class="detial-ssks-edit">' +
                    '<option value="0">--所属科室--</option>' +
                    '<option value="陈列室">陈列室</option>' +
                    '<option value="观察室">观察室</option>' +
                    '<option value="放映室">放映室</option>' +
                    '<option value="拓展室">拓展室</option>' +
                    '<option value="其它">其它</option>' +
                    '</select>';
                $('.detial-ssks').html(ssksHtml);
                var ind3 = 0;
                $('.detial-ssnj option').each(function(index, el) {
                    if ($(this).text() === detialSsks) {
                        ind3 = index;
                    }
                });
                $('detial-ssks-edit option').eq(ind3).attr('selected', 'true');

                var detialWjlx = $('.detial-wjlx').text();
                var wjlxHtml = '<select name="wjlx" class="detial-wjlx-edit">' +
                    '<option value="0">--资源类型--</option>' +
                    '<option value="图片">图片</option>' +
                    '<option value="文档">文档</option>' +
                    '<option value="语音">语音</option>' +
                    '<option value="视频">视频</option>' +
                    '<option value="网站服务" class="website">网站服务</option>' +
                    '<option value="其它">其它</option>' +
                    '</select>';
                $('.detial-wjlx').html(wjlxHtml);
                var ind4 = 0;
                $('.detial-wjlx option').each(function(index, el) {
                    if ($(this).text() === detialWjlx) {
                        ind4 = index;
                    }
                });
                $('detial-wjlx-edit option').eq(ind4).attr('selected', 'true');


                var detialBzxx = $('.detial-bzxx').text();
                $('.detial-bzxx').html('<input type="text" class="detial-bzxx-edit">');
                $('.detial-bzxx-edit').val(detialBzxx);

                var detialLoc = $('.detial-loc').text();
                $('.detial-loc').html('<input type="text" class="detial-loc-edit">');
                $('.detial-loc-edit').val(detialLoc);
            });

            $('.edit-btns').on('click', '.res-edit-qd-btn', function(event) {
                var fileTitleEdit = $('.file-detail-title-edit').val(),
                    cdCodeEdit = $('.detial-cdName-edit').val(),
                    cmCodeEdit = $('.detial-cmName-edit').val(),
                    ssnjEdit = $('.detial-ssnj-edit').val(),
                    ssksEdit = $('.detial-ssks-edit').val(),
                    wjlxEdit = $('.detial-wjlx-edit').val(),
                    bzxxEdit = $('.detial-bzxx-edit').val(),
                    locEdit = $('.detial-loc-edit').val();
                var obj = {};
                obj.fid = fid;
                obj.fileTitleEdit = fileTitleEdit;
                obj.cdCodeEdit = cdCodeEdit;
                obj.cmCodeEdit = cmCodeEdit;
                obj.ssnjEdit = ssnjEdit;
                obj.ssksEdit = ssksEdit;
                obj.wjlxEdit = wjlxEdit;
                obj.bzxxEdit = bzxxEdit;
                obj.locEdit = locEdit;
                dbTool.updateUploadFile2(obj);
            });

            $('.edit-btns').one('click', '.res-delete-btn', function(event) {
                var confirmDialog = require('../../../common/subpages/confirmDialog.html');
                $('body').append(confirmDialog);
                $('#confirmModal').modal('show');
                $('.modal-body').text("是否删除本资源所有的信息！！本操作不可恢复！！");
                $('.mymodal-confirm').on('click', function(event) {
                    $('#confirmModal').modal('hide');
                    dbTool.delRecordById("fid", fid);
                });
            });

            $('.edit-btns').one('click', '.res-addfile-btn', function(event) {
                console.log(data0);
                if(data0.ftype=='1'){

                }else if(data0.ftype =='2'){

                    addFile();
                }
            });

            /**
             * [addFile 新增文件到资源中]
             */
            function addFile(){
                //input 界面
                var fileInputHtml = '<input type="file" class="addfile-input">';
                $('.edit-btns').append(fileInputHtml);
                // $('.addfile-input').fadeIn('slow', function() {
                // });
            }


        };
        /**
         * [弹出定位信息]
         */
        $('.main-file-messages').on('click', '.detial-loc', function(event) {
            var geoLoc = $.trim($(this).text());
            console.log(geoLoc);
            /*使用百度地图解析地址*/

            if (geoLoc && geoLoc !== 'null') {
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
            }

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
