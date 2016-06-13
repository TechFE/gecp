/**
 * 课程设置
 */
define(function(require, exports, module) {
    var cCommonMethods = require('./courseCommon');
    var courseSets = {
        init: function() {
        	this.changeEvents();
        	this.ifHasValue();
        },
        changeEvents: function() {
            var input2Storage = cCommonMethods.input2Storage;
            input2Storage('course-name');
            input2Storage('course-intro-text');
            input2Storage('course-teaintro-text');
            input2Storage('course-aims-text');
            input2Storage('course-outline-text');
            input2Storage('course-notification-text');
            input2Storage('difficulty-set');
            input2Storage('grade-set');
            input2Storage('cmcode-set');
            input2Storage('saCode-set');
            input2Storage('salevel-set');
            input2Storage('study-date1');
            input2Storage('study-date2');
        },
        ifHasValue:function(){
        	var ifSessionHasValue = cCommonMethods.ifSessionHasValue;
        	ifSessionHasValue('course-name');
            ifSessionHasValue('course-intro-text');
            ifSessionHasValue('course-teaintro-text');
            ifSessionHasValue('course-aims-text');
            ifSessionHasValue('course-outline-text');
            ifSessionHasValue('course-notification-text');
            ifSessionHasValue('difficulty-set');
            ifSessionHasValue('grade-set');
            ifSessionHasValue('cmcode-set');
            ifSessionHasValue('saCode-set');
            ifSessionHasValue('salevel-set');
            ifSessionHasValue('study-date1');
            ifSessionHasValue('study-date2');
        },
        checkValidate:function(){
        	var checkValidate = cCommonMethods.checkValidate;
        	var boolean1 = checkValidate('course-name','对不起，课程名没有填写！');
        	var boolean2 = checkValidate('course-intro-text','建议填写课程介绍！');
        	return boolean1&&boolean2;
        }
    };

    module.exports = courseSets;
});
