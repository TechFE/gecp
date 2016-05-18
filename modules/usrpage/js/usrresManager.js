/**
 * [下载，删除，重命名]
 */
define(function(require, exports, module) {

    /*下载、删除、重命名 移至专题*/
    var dbTools = require('./dbOpr');
    var fileManager = {
        init: function() {
            this.mgDownload();
            this.mgDelete();
            this.mgRename();
        },
        // 下载
        mgDownload: function() {
            $('.mg-download').on('click', function(event) {
                var len = $('.usrres-onediv input:checked').length;
                if (len < 1) {
                    $('#usrTipModal .modal-body').text('请选中要下载的文件');
                    $('#usrTipModal').modal('show');
                }
                $('.usrres-onediv input:checked').parent().each(function(index, el) {
                    var title = $(this).find('.filename-hidden').eq(0).text();
                    var reFileName = $(this).find('.messages-top').eq(0).text();
                    var fType = $(this).find('.mes-ftype').eq(0).text();
                    if (fType == '2') {
                        $('#usrTipModal .modal-body').text('对不起！专题文件不能批量下载');
                        $('#usrTipModal').modal('show');
                        return;
                    }
                    var _downloadFile = require('../../res/js/downloadFile');
                    _downloadFile.downloadFileByURL(title, reFileName); //res/js/downloadFile.js
                });

            });
        },
        mgDelete: function() {
            /*删除*/
            $('.mg-delete').on('click', function(event) {
                var len = $('.usrres-onediv input:checked').length;
                if (len < 1) {
                    $('#usrTipModal .modal-body').text('请选中要修改的文件');
                    $('#usrTipModal').modal('show');
                    return;
                }
                $('#usrAlertModal .modal-body').text('是否要删除选中的内容【本操作不可撤销】！');
                $('#usrAlertModal').modal('show');
                $('.mymodal-confirm').click(function(event) {
                    $('#usrAlertModal').modal('hide');
                    var fids = [];
                    $('.usrres-onediv input:checked').parent().each(function(index, el) {
                        // var title = $(this).find('.messages-top').eq(0).text();
                        var fid = $(this).find('.mes-fid').eq(0).text();
                        //警告后是否从数据库中删除
                        console.log(fid);
                        fids.push(parseInt(fid));
                    });
                    //console.log(fids);
                    if (fids.length !== 0) {
                        dbTools.deleteFromDB(fids);
                    } else {
                        $('#usrTipModal .modal-body').text('删除失败！');
                        $('#usrTipModal').modal('show');
                    }
                });

            });
        },
        /*重命名*/
        mgRename: function() {
            $('.mg-rename').on('click', function(event) {
                var len = $('.usrres-onediv input:checked').length;
                if (len > 1) {
                    $('#usrTipModal .modal-body').text('只能单个更改名字！');
                    $('#usrTipModal').modal('show');
                } else if (len === 0) {
                    $('#usrTipModal .modal-body').text('请选中要修改的文件');
                    $('#usrTipModal').modal('show');
                } else if (len === 1) {
                    $('#usrUpdateModal').modal('show');
                    $('.usrres-onediv input:checked').parent().each(function(index, el) {
                        var title = $(this).find('.messages-top').eq(0).text();
                        var fid = $(this).find('.mes-fid').eq(0).text();
                        var fType = $(this).find('.mes-ftype').eq(0).text();
                        $('#usrUpdateModal #recipient-name').val(title);

                        $('#usrUpdateModal').on('click', '.usrUpdateModal-confirm', function(event) {
                            $('#usrUpdateModal').modal('hide');
                            var newTitle = $('#usrUpdateModal #message-name').val();
                            if (fType == '2') {
                                dbTools.updateTitle(fid, newTitle,'subjectName');
                            }
                            dbTools.updateTitle(fid, newTitle,'fileRename');
                            window.location.reload(true); //刷新
                        });
                    });
                }

            });
        }
    };

    module.exports = fileManager;
});
