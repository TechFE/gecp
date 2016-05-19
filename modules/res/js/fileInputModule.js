/**
 * [文件上传 显示列表 可以新增 列表中可以删除]
 */
define(function(require, exports, module) {
    var uploadFile = {
        init: function() {
            // this.inputEvents();
        },
        /**
         * [inputBaseEvents file input的一些基本事件]
         * @param  {[string]} ftype [1-单文件 2-多文件]
         * @return  {[fileList]} fileLists []
         */
        inputBaseEvents: function(ftype) {
            var fileLists = [];
            var fileInput = document.getElementById('upfile');
            var files = fileInput.files; //filelist
            console.log(ftype);
            // var args = Array.prototype.slice.call(arguments);
            $('.upfile').on('change', function(event) {

                files = fileInput.files; //应该重新获取
                console.log(files);
                if (ftype === '2') {
                    files = Array.prototype.slice.call(files); //全部转化为数组
                    fileLists = fileLists.concat(files);

                    console.log(fileLists);
                }
                /*应该保存该fileList，可以继续添加*/

                if (files.length !== 0) {
                    var html = '';
                    for (var i = 0,len = files.length; i < len; i++) {
                        html += "<p>" + files[i].name + "&nbsp&nbsp<span class='glyphicon glyphicon-remove'></span></p>";
                    }
                    if (ftype === '1') {
                        $('.upfile-list-mes').html(html);
                    } else {
                        $('.upfile-list-mes').append(html);
                    }
                }
                $("#upstatus").html("&nbsp&nbsp文件已准备好！点击确定上传");
            });

            $('.upfile-list-mes .glyphicon-remove').eq(0).hover(function(event) {
                // var e = event||window.event;
                // console.log(e.clientX);
                // console.log(e.clientY);
                // console.log('1');
                $(this).css({
                    'cursor': 'pointer',
                    'color': 'blue'
                });
            }, function() {
                $(this).css({
                    'cursor': 'default',
                    'color': '#337AB7'
                });
            });

            /*点击叉号可以删除要上传的文件*/
            $('.upfile-list-mes').on('click', '.glyphicon-remove', function(event) {
                console.log($(this).parent().index());
                var ind = $(this).parent().index();
                $(this).parent().css('display', 'none');

                fileLists.splice(ind, 1);
                console.log(fileLists);
            });
            return fileLists;
        },
        up2FileServer: function(fileLists,fieldsObj) {
            var filename = "";
            console.log(fileLists);
            console.log(fieldsObj.wjlx);
            if (fieldsObj.wjlx !== '网站服务') { //网站服务不用上传文件了
                if (fileLists.length === 0) {
                    alertDialogShow('请选择要上传的附件！');
                    return;
                } else {
                    for (var i = 0; i < fileLists.length - 1; i++) {
                        filename += fileLists[i].name + ";";
                    }
                    filename += fileLists[fileLists.length - 1].name;
                    //console.log(filename);
                    $('#upstatus').text("正在上传，请稍后......");
                }

                var filePath = 'user'; //上传服务器的文件夹

                var gUploadFile = new gEcnu.Upload(fileLists, filePath);
                gUploadFile.processAscyn(function() {
                    $('#upstatus').text("上传成功!");
                }, function() {
                    $('#upstatus').text("上传失败!");
                });
            } else {
                filename = webSiteName;
            }

            return filename;
        },

    };


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

    module.exports = uploadFile;
});
