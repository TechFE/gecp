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
         * [getPicFile 得到资源封面]
         * @return {[type]} [description]
         */
        getPicFileURL: function(picName) {
            if (picName) {
                return encodeURI(gEcnu.config.geoserver + 'fileserver?req=getfile&fn=upload/' + 'user' + '/picFile/' + picName);
            }
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
        sampleEncode:function(value){
            return btoa(encodeURIComponent(value));
        },
        /**
         * [sampleEncode 简单的解密算法]
         */
        sampleDecode:function(value){
            return decodeURIComponent(atob(value));
        },
    };

    module.exports = prjUtil;
});
