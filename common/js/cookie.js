/*
 *zry
 *2015-11-22
 *cookie的处理逻辑
 */
/*设置cookie*/
define(function(require, exports, moudle) {
    var cookie = {
        setCookie: function(c_name, value, expiredays) {
            console.log('setCookie function');
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString()) +
                ";path=/";
            console.log(this.getCookie('username'));
        },

        /*得到cookie*/

        getCookie: function(c_name) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }

            return "";
        }
    };
    moudle.exports = cookie;   
});

