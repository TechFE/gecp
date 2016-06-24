/**
 * 项目中的工具函数
 */
define(function(require, exports, module) {
    var prjUtil = {
        getStandardDate: function() {
            var time = new Date();
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            m = parseInt(m) < 10 ? '0' + m : m;
            d = parseInt(d) < 10 ? '0' + d : d;
            return '' + y + '-' + m + '-' + d;
        },
        getStandardTime: function() {
            var time = new Date();
            var h = time.getHours();
            var min = time.getMinutes();
            var s = time.getSeconds();
            var ms = time.getMilliseconds();
            var msi = parseInt(ms);
            h = parseInt(h) < 10 ? '0' + h : h;
            min = parseInt(min) < 10 ? '0' + min : min;
            s = parseInt(s) < 10 ? '0' + s : s;
            ms = parseInt(ms) < 10 ? '0' + ms : ms;
            if (msi < 10) {
                msi = '00' + msi;
            } else if (msi < 100) {
                msi = '0' + msi;
            }
            return '' + h + '-' + min + '-' + s + '-' + msi;
        },
        /**
         * [getTimestamp 时间戳]
         * @return {[string]} [时间戳字符串17位]
         */
        getTimestamp: function() {
            var time = new Date();
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            m = parseInt(m) < 10 ? '0' + m : m;
            d = parseInt(d) < 10 ? '0' + d : d;
            var h = time.getHours();
            var min = time.getMinutes();
            var s = time.getSeconds();
            var ms = time.getMilliseconds();
            var msi = parseInt(ms);
            h = parseInt(h) < 10 ? '0' + h : h;
            min = parseInt(min) < 10 ? '0' + min : min;
            s = parseInt(s) < 10 ? '0' + s : s;
            ms = parseInt(ms) < 10 ? '0' + ms : ms;
            if (msi < 10) {
                msi = '00' + msi;
            } else if (msi < 100) {
                msi = '0' + msi;
            }
            return '' + y + m + d + h + min + s + msi;
        },
        getCharLen: function() {
            /**
             * [gblen 获得字符串长度]
             * @return {[type]} [字符串长度]
             */
            String.prototype.gblen = function() {
                var len = 0;
                for (var i = 0; i < this.length; i++) {
                    if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
                        len += 2;
                    } else {
                        len++;
                    }
                }
                return len;
            };
        },
        getEleFromTo: function() {
            return function() {
                /**
                 * 扩展Jquery  从第n到第m个元素--从0计数，包含n，m
                 */
                $.fn.eleFromTo = function(n, m) {
                    console.log("查询从第" + n + "个元素到第" + m + "个元素");
                    var isNumber = function(value) {
                        var reg = /^[0-9]\d*$/;
                        return reg.test(value);
                    };
                    if (!isNumber(n) || !isNumber(m) || n > m) {
                        console.log('数据不符合规则');
                        return;
                    }
                    console.log($(this).slice(n, m + 1));
                    return $(this).slice(n, m + 1);

                };
            };
        },
        /**
         * [getPicFile 利用FileServer得到资源封面]
         * @return {[type]} [图片的地址]
         */
        getPicFileURL: function(picName) {
            if (picName) {
                return encodeURI(gEcnu.config.geoserver + 'fileserver?req=getfile&fn=upload/' + 'user' + '/picFile/' + picName);
            }
        },
        /**
         * [delFileServer 利用FileServer删除文件]
         */
        delFileServer: function(fileName, path) {
            path = (path) ? path : 'upload/user/';
            console.log(path + fileName);
            if (fileName) {
                $.ajax({
                        url: gEcnu.config.geoserver + 'fileserver',
                        type: 'POST', //不能使用GET
                        async: false,
                        // dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                        data: {
                            'req': 'delete',
                            'fn': path + fileName,
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
        },
        /**
         * [uldBase64 按照base64进行上传文件]
         * @param  {[string]} fileName  [文件名]
         * @param  {[base64]} base64Con [base64内容]
         * @param  {[string]} path      [存储路径]
         */
        uldBase64: function(fileName, base64Con, path, dtd, callback) {
            if (!path) {
                path = 'user/picFile/';
            }
            $.ajax({
                    url: gEcnu.config.geoserver + 'fileserver',
                    type: 'POST', //不能使用GET
                    async: false,
                    // dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                    data: {
                        'req': 'putbase64',
                        'fn': 'upload/' + path + fileName,
                        'con': base64Con
                    }
                })
                .done(function() {
                    if (dtd) {
                        dtd.resolve();
                    }
                    if (callback) {
                        callback();
                    }
                    console.log("success");
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
        },
        /**
         * [alertDialogShow alert]
         * @param  {[string]} value [alert的内容]
         */
        alertDialog: function(value) {
            var alertDialog = require('../subpages/alertDialog.html');
            $('body').append(alertDialog);
            $('#alertModal').modal('show');
            $('.modal-body').text(value);
        },
        /**
         * [sampleEncode 简单的加密算法]
         */
        sampleEncode: function(value) {
            return btoa(encodeURIComponent(value));
        },
        /**
         * [sampleEncode 简单的解密算法]
         */
        sampleDecode: function(value) {
            return decodeURIComponent(atob(value));
        },
        /**
         * [conv2oneLine 转化为一行，换行的地方可以选择是否换位<br>]
         * @param  {[string]} val [要转化的字符串]
         * @return {[type]}     [description]
         */
        conv2oneLine: function(val, isToBr) {
            if (!!isToBr) {
                // val.replace(/[\x0a|\cJ]/g,'<br>')
                return val.replace(/\n/, '<br>');
            }
            return val.replace(/\n/, '');
        },
        /**
         * [compare sort的比较函数]
         * @return {[Number]} [1 -1 0]
         */
        compare: function() {
            var arg = arguments;
            var len = arg.length;
            var flag;
            return function(obj1, obj2) {

                for (var i = 0; i < len; i++) {
                    val1 = obj1[arg[i]];
                    val2 = obj2[arg[i]];

                    if (val2 < val1) {
                        flag = 1;
                        break;
                    } else if (val2 > val1) {
                        flag = -1;
                        break;
                    } else { //相等的时候比较第二个
                        flag = 0;
                    }
                }
                return flag;
            };
        },
        // function compare() {
        //  var arg = arguments;
        //     return function(obj1, obj2) {
        //         var val1 = obj1[arg[0]];
        //         var val2 = obj2[arg[0]];
        //         //先比较对象第一个属性
        //         if (val2 < val1) {
        //             return 1;
        //         } else if (val2 > val1) {
        //             return -1;
        //         } else { //相等的时候比较第二个
        //          // return 0;
        //             var value1 = obj1[arg[1]];
        //             var value2 = obj2[arg[1]];
        //             if (value2 < value1) {
        //                 return 1;
        //             } else if (value2 > value1) {
        //                 return -1;
        //             } else {
        //                 return 0;
        //             }
        //         }
        //     };
        // }
        /**
         * [getFileUrlByName 根据文件名查找文件全路径]
         * @param  {[type]} fileName [文件名]
         * @param  {[type]} path     [查找文件路径]
         * @return {[type]}          [文件全路径]
         */
        getFileUrlByName:function(fileName,path){
            if(!path){
                path = 'user';
            }
            if (fileName) {
                var fileUrl;
                try{
                    fileUrl = encodeURI(gEcnu.config.geoserver + 'fileserver?req=getfile&fn=upload/' + path +'/'+ fileName);
                }catch(e){
                     fileUrl = encodeURI(gEcnu.config.geoserver + 'fileserver?req=getfile&fn=upload/' + 'course/file' +'/'+ fileName);
                }
                return fileUrl;
            }
        },
    };

    module.exports = prjUtil;
});
