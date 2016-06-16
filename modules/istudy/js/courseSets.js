/**
 * 课程设置
 */
define(function(require, exports, module) {
    var cCommonMethods = require('./courseCommon');
    var prjUtil = require('../../../common/js/prjUtil');
    var courseSets = {
        init: function() {
            this.datePikaday();
            this.changeEvents();
            this.ifHasValue();
        },
        datePikaday: function() {
            var picker1 = new Pikaday({
                field: document.getElementById('datepicker1'),
                firstDay: 1,
                minDate: new Date('2010-01-01'),
                maxDate: new Date('2020-12-31'),
                yearRange: [2000, 2030]
            });
             var picker2 = new Pikaday({
                field: document.getElementById('datepicker2'),
                firstDay: 1,
                minDate: new Date('2010-01-01'),
                maxDate: new Date('2020-12-31'),
                yearRange: [2000, 2030]
            });
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
            $('.course-info').on('change', '.study-date2', function(event) {
                var  cDuringStartTime = $('.study-date1').val();
                var  cDuringStopTime = $('.study-date2').val();
                if(cDuringStartTime > cDuringStopTime){
                    prjUtil.alertDialog('结束时间应该在开始时间之后，请重新选择！');
                    $('.study-date2').val('');
                    return;
                }
                if(!cDuringStartTime){
                    sessionStorage.setItem('study-date1',prjUtil.getStandardDate());
                }

            });
            input2Storage('study-date2');

        },
        ifHasValue: function() {
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
        checkValidate: function() {
            var checkValidate = cCommonMethods.checkValidate;
            var boolean1 = checkValidate('course-name', '对不起，课程名没有填写！');
            var boolean2 = checkValidate('course-intro-text', '建议填写课程介绍！');
            return boolean1 && boolean2;
        }
    };

    module.exports = courseSets;
});
