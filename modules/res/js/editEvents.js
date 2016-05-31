/**
 * 用户修改文件
 *
 */
define(function(require, exports, module) {
    var dbTool = require('./dbOpr');
    var prjUtil = require('../../../common/js/prjUtil');

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
            $('.detial-ssnj-edit option').each(function(index, el) {
                if ($(this).text() === detialSsnj) {
                    ind2 = index;
                    console.log(ind2);
                }
            });
            $('.detial-ssnj-edit option').eq(ind2).attr('selected', 'true');

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
            $('.detial-ssks-edit option').each(function(index, el) {
                if ($(this).text() === detialSsks) {
                    ind3 = index;
                }
            });
            $('.detial-ssks-edit option').eq(ind3).attr('selected', 'true');

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
            $('.detial-wjlx-edit option').eq(ind4).attr('selected', 'true');


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
            obj.fid = data0.fid;
            obj.ftype = data0.ftype;
            obj.cdCodeEdit = cdCodeEdit;
            obj.cmCodeEdit = cmCodeEdit;
            obj.ssnjEdit = ssnjEdit;
            obj.ssksEdit = ssksEdit;
            obj.wjlxEdit = wjlxEdit;
            obj.bzxxEdit = bzxxEdit;
            obj.locEdit = locEdit;
            if (data0.ftype === '1') {
                obj.fileTitleEdit = fileTitleEdit;
            } else if (data0.ftype === '2') {
                obj.sjTitleEdit = fileTitleEdit;
            }

            dbTool.updateUploadFile2(obj);
        });
        /**
         * [删除资源]
         */
        $('.edit-btns').on('click', '.res-delete-btn', function(event) {
            var confirmDialog = require('../../../common/subpages/confirmDialog.html');
            $('body').append(confirmDialog);
            $('#confirmModal').modal('show');
            $('.modal-body').text("是否删除本资源所有的信息！！本操作不可恢复！！");
            $('.mymodal-confirm').on('click', function(event) {
                $('#confirmModal').modal('hide');
                dbTool.delRecordById("fid", data0.fid);
                prjUtil.delFileServer();
            });
        });

        if (data0.ftype == '1') {
            console.log('====');
            $('.res-addfile-btn').css({
                'background-color': '#ccc',
                'border-color': '#ccc'
            });
            $('.res-delfile-btn').css({
                'background-color': '#ccc',
                'border-color': '#ccc'
            });

        }
        $('.edit-btns').on('click', '.res-addfile-btn', function(event) {
            console.log(data0);
            if ($('.res-delfile-btn').hasClass('res-delfile-clk')) {
                $(this).removeClass('res-delfile-clk');
                $('.files-pan-del').fadeOut('slow', function() {
                    $(this).css('display', 'none');
                });
            }
            if ($(this).hasClass('res-addfile')) {
                $(this).addClass('res-addfile-clk');
                $(this).removeClass('res-addfile');
                if (data0.ftype == '1') {

                } else if (data0.ftype == '2') {
                    addFile(data0);
                }

            } else if ($(this).hasClass('res-addfile-clk')) {
                $(this).addClass('res-addfile');
                $(this).removeClass('res-addfile-clk');
                $('.files-pan').fadeOut('slow', function() {
                    $(this).css('display', 'none');
                });
            }

        });
        $('.edit-btns').on('click', '.res-delfile-btn', function(event) {
            if ($('.res-addfile-btn').hasClass('res-addfile-clk')) {
                $(this).removeClass('res-addfile-clk');
                $('.files-pan').fadeOut('slow', function() {
                    $(this).css('display', 'none');
                });
            }
            if ($(this).hasClass('res-delfile')) {
                $(this).addClass('res-delfile-clk');
                $(this).removeClass('res-delfile');
                if (data0.ftype == '1') {

                } else if (data0.ftype == '2') {
                    delFile(data0);
                }

            } else if ($(this).hasClass('res-delfile-clk')) {
                $(this).addClass('res-delfile');
                $(this).removeClass('res-delfile-clk');
                $('.files-pan-del').fadeOut('slow', function() {
                    $(this).css('display', 'none');
                });
            }
        });

        /**
         * [addFile 新增文件到资源中]
         */
        function addFile(data0) {
            //input 界面
            var fileInputHtml = '<div class="files-pan">' +
                '<div class="file-lists"></div>' +
                '<input type="file" multiple class="addfile-input">' +
                '<span class="glyphicon glyphicon-triangle-bottom triangle"></span>' +
                '</div>';
            $('.edit-btns').append(fileInputHtml);
            var filenames = data0.filename;
            if (filenames) {
                var filenameArray = filenames.split(';');
                var filesHtml = '';
                for (var i = 0, len = filenameArray.length; i < len; i++) {
                    var fileListName = filenameArray[i];
                    if(/^\d{17}-/.test(fileListName)){
                        fileListName = fileListName.slice(18);
                    }
                    filesHtml += '<p>' + fileListName + '</p>';
                }
                $('.file-lists').html(filesHtml);
            }

            var fileInput = document.querySelector('.addfile-input');
            var files = fileInput.files;
            var fileLists = [];
            $('.addfile-input').on('change', function(event) {
                prjUtil.alertDialog("正在上传文件，请稍后！");
                var timestamp = prjUtil.getTimestamp() || '';
                files = fileInput.files; //应该重新获取
                // console.log(files);
                if (data0.ftype === '1' || data0.ftype === '2') {
                    files = Array.prototype.slice.call(files); //全部转化为数组
                    fileLists = fileLists.concat(files);
                    // console.log(fileLists);
                }
                /*应该保存该fileList，可以继续添加*/
                if (files.length !== 0) {
                    var html = '';
                    for (var i = 0, len = files.length - 1; i < len; i++) {
                        // addFileNames += files[i].name+';';
                        html += "<p>" + files[i].name + " </p>";
                    }
                    // addFileNames+=files[len].name;
                    html += "<p>" + files[len].name + " </p>";
                    $('.file-lists').append(html);
                }
                var addFileNames = '';
                for (var j = 0, flLen = fileLists.length; j < flLen; j++) {
                    var initialFileName = fileLists[j].name;
                    Object.defineProperty(fileLists[j], 'name', {
                        writable: true
                    });
                    fileLists[j].name = timestamp + '-' + initialFileName;
                    console.log(fileLists[j].name);
                    addFileNames += fileLists[j].name + ";";
                }
                addFileNames = addFileNames.slice(0, -1);
                console.log(addFileNames);
                filePath = 'user'; //上传服务器的文件夹
                var gUploadFile = new gEcnu.Upload(fileLists, filePath);
                gUploadFile.processAscyn(function() {
                    $('#alertModal').modal('hide');
                }, function() {});
                var editedFilename = filenames + ';' + addFileNames;
                var fieldObj = {
                    'field': 'filename',
                    'data': editedFilename
                };
                dbTool.updateUploadFile2ByFid(fieldObj, data0.fid);

            });

        }
        /**
         * [delFile 在资源中删除文件]
         */
        function delFile(data0) {
            //input 界面
            var fileInputHtml = '<div class="files-pan-del">' +
                '<div class="file-lists-del"></div>' +
                // '<input type="file" class="delfile-input">' +
                '<span class="glyphicon glyphicon-triangle-bottom triangle-del"></span>' +
                '</div>';
            $('.edit-btns').append(fileInputHtml);
            var filenames = data0.filename;
            var filenameArray = filenames.split(';');
            if (filenames) {
                var filesHtml = '';
                for (var i = 0, len = filenameArray.length; i < len; i++) {
                    var fileListName = filenameArray[i];
                    if(/^\d{17}-/.test(fileListName)){
                        fileListName = fileListName.slice(18);
                    }
                    filesHtml += '<p>' + fileListName + '    <span class="glyphicon glyphicon-remove delfile-icon"></span></p>';
                }
                $('.file-lists-del').html(filesHtml);

            }
            $('.edit-btns').on('click', '.delfile-icon', function(event) {
                var ind = $(this).parent().index();
                var fileName = filenameArray[ind];
                prjUtil.delFileServer(fileName); //文件同名问题

                $(this).parent().css('display', 'none');

                var filenameArray1 = data0.filename.split(';');
                var remainFilename = filenameArray1.splice(ind, 1);
                var editedFilename = filenameArray1.join(';');
                var fieldObj = {
                    'field': 'filename',
                    'data': editedFilename
                };
                dbTool.updateUploadFile2ByFid(fieldObj, data0.fid);
            });

        }


    };

    module.exports = editEvents;
});
