/**
 * 课程目录下公共的方法
 */
define(function(require, exports, module) {
    var prjUtil = require('../../../common/js/prjUtil');
    var cCommonMethods = {
        /**
         * [input2Storage input变化时存到sessionStorage]
         * @param  {[string]} eleClassName [元素类名]
         */
        input2Storage: function(eleClassName) {
            $('.' + eleClassName).on('change', function(event) {
                sessionStorage.setItem(eleClassName, $(this).val());
            });
        },
        /**
         * [ifSessionHasValue 如果sessionStorage有，则填充]
         * @param  {[string]} eleClassName [元素类名]
         */
        ifSessionHasValue: function(eleClassName) {
            if (sessionStorage.getItem(eleClassName)) {
                $('.' + eleClassName).val(sessionStorage.getItem(eleClassName));
            }
        },
        checkValidate: function(eleClassName, alertDialogValue) {
        	console.log($('.' + eleClassName).val());
            if (!$('.' + eleClassName).val()||$('.' + eleClassName).val()=='0') {
                prjUtil.alertDialog(alertDialogValue);
                return false;
            }
            return true;
        }
    };

    module.exports = cCommonMethods;
});
