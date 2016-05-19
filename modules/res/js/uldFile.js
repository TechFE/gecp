// JavaScript Document
/**
 * 文件上传到数据库中
 * 
 */

/***************上传文件 保存到数据库中**********************/

define(function(require, exports, module) {
    // $(document).ready(function() {

    var winSize = {
        cHeight: function(height) {
            return (screen.height - height - 160) / 2;
        },
        cWidth: function(width) {
            return (screen.width - width) / 2;
        }
    };
    var cookie = require('../../../common/js/cookie');
    var prjUtil = require('../../../common/js/prjUtil');
    var uldname = cookie.getCookie('username');
    var flag = 1; //传入数据库是否成功标志 默认失败
    var uploadFile_Subject = {
        init: function() {
            this.uldFileDialogStyle();
            this.uploadFile();
        },
        uldFileDialogStyle: function() {
            var uldFileDetialHtml = require('../subs/uldFileDetial.html');
            $('.uploadDetial').append(uldFileDetialHtml);
            $('.file').on('click', function() {
                $('.uploadbg').css('display', 'block');
                $('.uploadDetial').fadeIn('slow', function() {
                    $(this).css('display', 'block');
                });
                var cW = winSize.cWidth($('.uploadDetial').width());
                var cH = winSize.cHeight($('.uploadDetial').height());
                $('.uploadDetial').css('top', cH);
                $('.uploadDetial').css('left', cW);
            });
            // 关闭按钮
            $('.ulclose').click(function() {
                $('.uploadDetial').fadeOut('slow', function() {
                    $('.uploadbg').css('display', 'none');
                });
                $('.uploadDetial').fadeOut('slow', function() {
                    $('.uploadDetial').css('display', 'none');
                });
            });
            //取消
            $('.uploadDetial').on('click', '#ulCal', function(event) {
                // $('#ulCal').click(function() {
                var confirmDialog = require('../../../common/subpages/confirmDialog.html');
                $('body').append(confirmDialog);
                $('#confirmModal').modal('show');
                $('.modal-body').text("是否确定取消！");
                $('.mymodal-confirm').on('click', function(event) {
                    $('.uploadbg').css('display', 'none');
                    $('.uploadDetial').css('display', 'none');
                    $('#confirmModal').modal('hide');
                });
                /*if (confirm("是否确定取消！")) {
                    $('.uploadbg').css('display', 'none');
                    $('.uploadDetial').css('display', 'none');
                }*/
            });
        },
        uploadFile: function() {
            /***************上传文件或者专题****************************/
            /*首先判断是文件还是专题*/
            var subjectName = '',
                fileLists;
            var ftype = '1'; //1-单文件 2-多文件
            var fileInputModule = require('./fileInputModule'); /*上传文件模块*/

            $('.uld-subject').on('click', function(event) { //专题,多文件
                $('.fillin-sjname').fadeIn('slow', function() {
                    $(this).css('visibility', 'visible');
                });
                $('.uld-fj input').attr('multiple', 'multiple');
                ftype = '2';

            });
            $('.uld-file').on('click', function(event) { //专题
                $('.fillin-sjname').fadeOut('slow', function() {
                    $(this).css('visibility', 'hidden');
                });
                $('.uld-fj input').removeAttr('multiple');
                ftype = '1';
            });

            $('.uploadDetial').on('change', '.fillin-sjname input', function(event) {
                subjectName = $('.fillin-sjname input').val();
            });

            $('.upfile').on('click', function(event) {
                fileLists = fileInputModule.inputBaseEvents(ftype);
            });
            /*上传文件模块*/


            /************************************************************************************/
            //确定===>传入数据库
            $('#ulQd').click(function() {

                var fieldsObj = {};
                fieldsObj.cdCode = $('#upload-cdcode').val();
                fieldsObj.cmCode = $('#upload-cmcode').val();
                fieldsObj.ssnj = $('#upload-ssnj').val();
                fieldsObj.ssks = $('#upload-ssks').val();
                fieldsObj.wjlx = $('#upload-wjlx').val();
                fieldsObj.clCode = $('#upload-sacode').val();
                fieldsObj.saLevel = $('#upload-salevel').val();
                fieldsObj.geoInfo = $('.geo-info').val();
                fieldsObj.webSiteName = $('.website-name').val();
                fieldsObj.webSiteUrl = $('.website-url').val();
                fieldsObj.bzxx = $('#bzxx').val();
                // fieldsObj.date = new Date().toLocaleDateString();
                fieldsObj.date = prjUtil.getStandardDate();
                fieldsObj.sjName = $('.fillin-sjname').val(); //专题名  


                var cdCode = fieldsObj.cdCode,
                    cmCode = fieldsObj.cmCode,
                    ssnj = fieldsObj.ssnj,
                    ssks = fieldsObj.ssks,
                    wjlx = fieldsObj.wjlx,
                    clCode = fieldsObj.clCode,
                    saLevel = fieldsObj.saLevel,
                    bzxx = fieldsObj.bzxx,
                    date = fieldsObj.date,
                    sjName = fieldsObj.sjName;
                geoInfo = fieldsObj.geoInfo;
                webSiteName = fieldsObj.webSiteName;
                webSiteUrl = fieldsObj.webSiteUrl;
                //console.log(cdCode + " " + cmCode + " " + clCode + "  " + saLevel + " " + ssnj + "   " + ssks + "   " + wjlx + "   " + bzxx + "  " + date);
                //判空
                if (cdCode === "0" || cmCode === "0") {
                    alertDialogShow("带 * 的为必填项！");
                    if (cdCode === "0" && cmCode === "0") {
                        $('.sea-class1 span').css('color', 'red');
                        $('.sea-class2 span').css('color', 'red');
                    } else if (cmCode === "0") {
                        $('.sea-class2 span').css('color', 'red');
                    } else if (cdCode === "0") {
                        $('.sea-class1 span').css('color', 'red');
                    }
                    return;
                }
                if (webSiteName || webSiteUrl) {
                    if (wjlx !== '网站服务') {
                        alertDialogShow('您输入了网站服务信息，资源类型应该为【网站服务】！');
                        return;
                    }
                    // $('#upload-wjlx .website').attr('checked', 'checked');
                }

                var filename = fileInputModule.up2FileServer(fileLists, fieldsObj); //上传附件到服务器
                /*上传封面到服务器上*/
                var picFileName = '';
                var uldPicFile = (function() {
                    var picFile = document.getElementById('upfile-pic').files[0];
                    if (picFile) {
                        picFileName = picFile.name ? picFile.name : '';
                        // console.log(picFileName);
                        var reader1 = new FileReader();
                        reader1.readAsDataURL(picFile);

                        reader1.onload = function(e) {
                            var res = e.target.result;
                            flag = flag + 1;
                            uldBase64(picFile.name, res);
                        };

                    }

                })();
                /***********文件上传End*************************/
                /**************字段存入数据库中********************/
                var params = {
                    Fields: ['ftype', 'fPicFileName', 'subjectName', 'uldname', 'cdCode', 'cmCode', 'clCode', 'saCode', 'ssnj', 'ssks', 'wjlx', 'geoInfo', 'webSiteName', 'webSiteUrl', 'bzxx', 'date', 'filename'],
                    Data: [
                        [ftype, picFileName, subjectName, uldname, cdCode, cmCode, clCode, saLevel, ssnj, ssks, wjlx, geoInfo, webSiteName, webSiteUrl, bzxx, date, filename]
                    ]
                };
                var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                    'processCompleted': function() { //执行成功回掉
                        flag = flag + 1;
                        console.log('数据库上传' + flag);

                    },
                    'processFailed': function() {
                        alertDialogShow('资源上传失败！');
                        return;
                    }
                });
                sqlServices.processAscyn("ADD", "gecp2", "uploadFile2", params);
                dbByFlag(flag);
            }); //点击确定按钮   逻辑代码结束
        },

    };
    /**
     * [dbByFlag 根据标志判断数据库是否成功]
     * @param  {[Int]} flag [0 1]
     */
    function dbByFlag(flag) {
        var confirmDialog = require('../../../common/subpages/confirmDialog.html');
        $('body').append(confirmDialog);
        console.log("flag = " + flag);
        if (flag == 1) {
            $('.modal-body').text("上传成功！");
            $('#confirmModal').modal('show');
            $('.mymodal-confirm').on('click', function(event) {
                //成功后就关闭窗口
                $('.uploadDetial').fadeOut('slow', function() {
                    $('.uploadbg').css('display', 'none');
                });
                $('.uploadDetial').fadeOut('slow', function() {
                    $('.uploadDetial').css('display', 'none');
                });
                window.location.reload(true);
                $('.pagination .last').click();
                $('#confirmModal').modal('hide');

            });
        } else {
            $('.modal-body').text("上传失败！");
            $('#confirmModal').modal('show');
            $('.mymodal-confirm').on('click', function(event) {
                $('#confirmModal').modal('hide');
            });
            return;
        }
    }
    /**
     * [uldBase64 description]
     * @param  {[type]} base64 [description]
     * @return {[type]}        [description]
     */
    function uldBase64(fileName, base64) {
        // var config = require('../../../common/js/prjConfig');
        $.ajax({
                url: gEcnu.config.geoserver + 'fileserver',
                type: 'POST', //不能使用GET
                async: false,
                // dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: {
                    'req': 'putbase64',
                    'fn': 'upload/' + 'user' + '/picFile/' + fileName,
                    'con': base64
                }
            })
            .done(function() {
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

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
    //jquery
    $(function() {
        $('.uploadDetial').on('change', '#upload-cdcode', function(event) {
            if ($(this).children('option:checked').val() !== "0") {
                $('.sea-class1 span').css('color', '#333');
            } else {
                $('.sea-class1 span').css('color', 'red');
            }
            $('#upload-cmcode option').css('display', 'block');
            switch ($(this).children('option:checked').val()) {
                case "BX":
                    $('#upload-cmcode option').slice(3).css('display', 'none');
                    break;
                case "XX1":
                    $('#upload-cmcode option').slice(0, 3).css('display', 'none');
                    $('#upload-cmcode option').slice(6).css('display', 'none');
                    break;
                case "XX2":
                    $('#upload-cmcode option').slice(0, 5).css('display', 'none');
                    $('#upload-cmcode option').slice(15).css('display', 'none');
                    break;
                case "CDQT":
                    $('#upload-cmcode option').slice(0, 15).css('display', 'none');
                    break;
            }
        });
        /*上传图片封面 变化-->显示缩略图*/
        $('.uploadDetial').on('change', '.upfile-pic', function(event) {
            var picFile = document.getElementById('upfile-pic').files[0];
            if (!picFile) {
                return;
            }
            if (/&/.test(picFile.name)) {
                alertDialogShow('上传的封面名称中不应该有“ & ”符号');
                return;
            }
            if (picFile.size > 3 * 1024 * 1024) {
                alertDialogShow("文件大于3M，请重新上传");
                return;
            }
            var img = document.createElement('img');
            img.id = "picFile";
            img.classList.add('obj');
            img.file = picFile;
            img.alt = "封面图像已就绪";
            // img.height = '150px';
            $('.file-pic').html('');
            $('.file-pic').append(img);
            var reader = new FileReader();
            // reader.onload = (function(aImg) {
            //     return function(e) {
            //         aImg.src = e.target.result;
            //         uldBase64(picFile.name, aImg.src); //以Base64的形式上传文件
            //     };
            // })(img);
            reader.readAsDataURL(picFile);

            reader.onload = function(e) {
                $('.upfile-pic-default').css('display', 'none');
                var res = e.target.result;
                img.src = res;
                // uldBase64(picFile.name, res);
            };
            $('#picFile').css({
                'width': '240px',
                'height': '135px',
                'z-index': '999'
            }); //注意位置，已经压缩为150*height【自适应】

        });
        $('.uploadDetial').on('change', '#upload-cmcode', function(event) {
            if ($(this).children('option:checked').val() !== "0") {
                $('.sea-class2 span').css('color', '#333');
            } else {
                $('.sea-class2 span').css('color', 'red');
            }
        });

    });


    module.exports = uploadFile_Subject;
});
