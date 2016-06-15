/**
 * 课程测试题
 */
define(function(require, exports, module) {
    var prjUtil = require('../../../common/js/prjUtil');
    var cCommonMethods = require('./courseCommon');
    var dbOprTools = require('./dbOpr');
    var courseTest = {
        init: function() {
            var self = this;
            var b = false;
            $('.course-info').on('click', 'button', function(event) {
                b = self.checkValidate();
                console.log(b);
            });
            this.changeEvents();
            this.ifHasValue();
            self.radQuesEvents();
            self.mulQuesEvents();
            self.subjQuesEvents();

            $('.course-info').on('click', '.submit-all', function(event) {
                self.submitAll2DB();
            });
        },
        checkValidate: function() {
            var checkValidate = cCommonMethods.checkValidate;
            var boolean1 = checkValidate('ctest-chapter-select', '没有选择【章】');
            var boolean2 = checkValidate('ctest-section-select', '没有选择【节】');
            return boolean1 && boolean2;
        },
        changeEvents: function() {
            var input2Storage = cCommonMethods.input2Storage;
            input2Storage('ct-radio-question');
            input2Storage('radio-option1');
            input2Storage('radio-option2');
            input2Storage('radio-option3');
            input2Storage('radio-option4');
            input2Storage('ct-radio-right-answer');
            input2Storage('ct-checkbox-question');
            input2Storage('checkbox-option1');
            input2Storage('checkbox-option2');
            input2Storage('checkbox-option3');
            input2Storage('checkbox-option4');
            input2Storage('ct-checkbox-right-answer');
            input2Storage('subjectivity-question');
            input2Storage('reference-answer');
        },
        ifHasValue: function() {
            var ifSessionHasValue = cCommonMethods.ifSessionHasValue;
            ifSessionHasValue('ct-radio-question');
            ifSessionHasValue('radio-option1');
            ifSessionHasValue('radio-option2');
            ifSessionHasValue('radio-option3');
            ifSessionHasValue('radio-option4');
            ifSessionHasValue('ct-radio-right-answer');
            ifSessionHasValue('ct-checkbox-question');
            ifSessionHasValue('checkbox-option1');
            ifSessionHasValue('checkbox-option2');
            ifSessionHasValue('checkbox-option3');
            ifSessionHasValue('checkbox-option4');
            ifSessionHasValue('ct-checkbox-right-answer');
            ifSessionHasValue('subjectivity-question');
            ifSessionHasValue('reference-answer');
        },
        getChaSec: function() {
            return {
                chapter: $('.ctest-chapter-select').val().slice(2),
                section: $('.ctest-section-select').val().slice(3)
            };
        },
        radQuesEvents: function() {
            var self = this;
            var radQuesJsonTextSession = sessionStorage.getItem('radQuesJsonText') || '';
            $('.course-info').on('change', '.ct-radio-question', function(event) {
                $('.radques-save-btn').css('display', 'block');
                $('.ct-radio-state').html('');
            });
            $('.course-info').on('click', '.radques-save-btn', function(event) {
                var radQues = {
                    content: prjUtil.conv2oneLine($('.ct-radio-question').val(), 'isToBr'),
                    radOptin1: $('.radio-option1').val() || '',
                    radOptin2: $('.radio-option2').val() || '',
                    radOptin3: $('.radio-option3').val() || '',
                    radOptin4: $('.radio-option4').val() || '',
                    radRightAnswer: $('.ct-radio-right-answer').val() || '',
                };
                if (radQues.content && radQues.radOptin1) {
                    var chapter = self.getChaSec().chapter;
                    var section = self.getChaSec().section;
                    if (!chapter && !section) {
                        return;
                    }
                    //json文本存到session里面
                    var radQuesJsonText = "{'chapter':'" + chapter + "','section':'" + section + "','radContent':'" + radQues.content + "','radChoice':['" + radQues.radOptin1 + "','" +
                        radQues.radOptin2 + "','" + radQues.radOptin3 + "','" + radQues.radOptin4 + "'],'radAnswer':'" + radQues.radRightAnswer + "'}";
                    if (!radQuesJsonTextSession) { //空
                        sessionStorage.setItem('radQuesJsonText', radQuesJsonText);
                        console.log(radQuesJsonText);
                    } else if (/^\[\{/.test(radQuesJsonTextSession)) { //存了至少两个
                        console.log('>=2');
                        var radQuesJsonTextSessionNew = sessionStorage.getItem('radQuesJsonText');
                        var radQuesJsonText3 = radQuesJsonTextSessionNew.slice(0, -1) + "," + radQuesJsonText + "]";
                        sessionStorage.setItem('radQuesJsonText', radQuesJsonText3);
                        console.log(radQuesJsonText3);
                    } else {
                        console.log('=1');
                        var radQuesJsonTextSessionNew2 = sessionStorage.getItem('radQuesJsonText');
                        var radQuesJsonText2 = "[" + radQuesJsonTextSessionNew2 + "," + radQuesJsonText + "]";
                        sessionStorage.setItem('radQuesJsonText', radQuesJsonText2);
                        console.log(radQuesJsonText2);
                    }
                }

                $('.radques-save-btn').css('display', 'none');
            	$('.ct-radio-state').html('保存成功，可继续输入');
                $('.ct-radio-question').val('');
                $('.radio-option1').val('');
                $('.radio-option2').val('');
                $('.radio-option3').val('');
                $('.radio-option4').val('');
                $('.ct-radio-right-answer').val('');
            });
            // $('.course-info').on('click', '.radques-save-next-btn', function(event) {
            //     if (radQuesJsonTextSession) {
            //         // var radQuesJsonTexts =  
            //     }

            // });
        },
        mulQuesEvents: function() {
            var self = this;
            var mulQuesJsonTextSession = sessionStorage.getItem('mulQuesJsonText') || '';
            $('.course-info').on('change', '.ct-checkbox-question', function(event) {
                $('.mulques-save-btn').css('display', 'block');
                $('.ct-checkbox-state').html('');
            });
            $('.course-info').on('click', '.mulques-save-btn', function(event) {
                var mulQues = {
                    content: prjUtil.conv2oneLine($('.ct-checkbox-question').val(), 'isToBr'),
                    mulOptin1: $('.checkbox-option1').val() || '',
                    mulOptin2: $('.checkbox-option2').val() || '',
                    mulOptin3: $('.checkbox-option3').val() || '',
                    mulOptin4: $('.checkbox-option4').val() || '',
                    mulRightAnswer: $('.ct-checkbox-right-answer').val() || '',
                };
                if (mulQues.content && mulQues.mulOptin1) {
                    var chapter = self.getChaSec().chapter;
                    var section = self.getChaSec().section;
                    if (!chapter && !section) {
                        return;
                    }
                    //json文本存到session里面
                    var mulQuesJsonText = "{'chapter':'" + chapter + "','section':'" + section + "','mulContent':'" + mulQues.content + "','mulChoice':['" + mulQues.mulOptin1 + "','" +
                        mulQues.mulOptin2 + "','" + mulQues.mulOptin3 + "','" + mulQues.mulOptin4 + "'],'mulAnswer':'" + mulQues.mulRightAnswer + "'}";
                    if (!mulQuesJsonTextSession) { //空
                        sessionStorage.setItem('mulQuesJsonText', mulQuesJsonText);
                        console.log(mulQuesJsonText);
                    } else if (/^\[\{/.test(mulQuesJsonTextSession)) { //存了至少两个
                        console.log('>=2');
                        var mulQuesJsonTextSessionNew = sessionStorage.getItem('mulQuesJsonText');
                        var mulQuesJsonText3 = mulQuesJsonTextSessionNew.slice(0, -1) + "," + mulQuesJsonText + "]";
                        sessionStorage.setItem('mulQuesJsonText', mulQuesJsonText3);
                        console.log(mulQuesJsonText3);
                    } else {
                        console.log('=1');
                        var mulQuesJsonTextSessionNew2 = sessionStorage.getItem('mulQuesJsonText');
                        var mulQuesJsonText2 = "[" + mulQuesJsonTextSessionNew2 + "," + mulQuesJsonText + "]";
                        sessionStorage.setItem('mulQuesJsonText', mulQuesJsonText2);
                        console.log(mulQuesJsonText2);
                    }
                }

                $('.mulques-save-btn').css('display', 'none');
                $('.ct-checkbox-state').html('保存成功，可继续输入');
                $('.ct-checkbox-question').val('');
                $('.checkbox-option1').val('');
                $('.checkbox-option2').val('');
                $('.checkbox-option3').val('');
                $('.checkbox-option4').val('');
                $('.ct-checkbox-right-answer').val('');

            });
        },
        subjQuesEvents: function() {
            var self = this;
            var subjQuesJsonTextSession = sessionStorage.getItem('subjQuesJsonText') || '';
            $('.course-info').on('change', '.subjectivity-question', function(event) {
                $('.subques-save-btn').css('display', 'block');
                $('.ct-subjectivity-state').html('');

            });
            $('.course-info').on('click', '.subques-save-btn', function(event) {
                var subjQues = {
                    content: prjUtil.conv2oneLine($('.subjectivity-question').val(), 'isToBr'),
                    subjRightAnswer: prjUtil.conv2oneLine($('.reference-answer').val(), 'isToBr') || '',
                };
                if (subjQues.content) {
                    var chapter = self.getChaSec().chapter;
                    var section = self.getChaSec().section;
                    if (!chapter && !section) {
                        return;
                    }
                    //json文本存到session里面
                    var subjQuesJsonText = "{'chapter':'" + chapter + "','section':'" + section + "','subjContent':'" + subjQues.content +
                        "','subjAnswer':'" + subjQues.subjRightAnswer + "'}";
                    if (!subjQuesJsonTextSession) { //空
                        sessionStorage.setItem('subjQuesJsonText', subjQuesJsonText);
                        console.log(subjQuesJsonText);
                    } else if (/^\[\{/.test(subjQuesJsonTextSession)) { //存了至少两个
                        console.log('>=2');
                        var subjQuesJsonTextSessionNew = sessionStorage.getItem('subjQuesJsonText');
                        var subjQuesJsonText3 = subjQuesJsonTextSessionNew.slice(0, -1) + "," + subjQuesJsonText + "]";
                        sessionStorage.setItem('subjQuesJsonText', subjQuesJsonText3);
                        console.log(subjQuesJsonText3);
                    } else {
                        console.log('=1');
                        var subjQuesJsonTextSessionNew2 = sessionStorage.getItem('subjQuesJsonText');
                        var subjQuesJsonText2 = "[" + subjQuesJsonTextSessionNew2 + "," + subjQuesJsonText + "]";
                        sessionStorage.setItem('subjQuesJsonText', subjQuesJsonText2);
                        console.log(subjQuesJsonText2);
                    }
                }

                $('.subques-save-btn').css('display', 'none');
                $('.subjectivity-question').val('');
                $('.reference-answer').val('');
                $('.ct-subjectivity-state').html('保存成功，可继续输入');

            });
        },
        submitAll2DB: function() {
            var self = this;
            var radQuesJsonText,
                mulQuesJsonText,
                subjQuesJsonText;
            var radQuesJsonTextSession = sessionStorage.getItem('radQuesJsonText') || '';
            var mulQuesJsonTextSession = sessionStorage.getItem('mulQuesJsonText') || '';
            var subjQuesJsonTextSession = sessionStorage.getItem('subjQuesJsonText') || '';
            console.log(radQuesJsonTextSession);
            var radQues = {
                content: prjUtil.conv2oneLine($('.ct-radio-question').val(), 'isToBr'),
                radOptin1: $('.radio-option1').val() || '',
                radOptin2: $('.radio-option2').val() || '',
                radOptin3: $('.radio-option3').val() || '',
                radOptin4: $('.radio-option4').val() || '',
                radRightAnswer: $('.ct-radio-right-answer').val() || '',
            };
            var mulQues = {
                content: prjUtil.conv2oneLine($('.ct-checkbox-question').val(), 'isToBr'),
                mulOptin1: $('.checkbox-option1').val() || '',
                mulOptin2: $('.checkbox-option2').val() || '',
                mulOptin3: $('.checkbox-option3').val() || '',
                mulOptin4: $('.checkbox-option4').val() || '',
                mulRightAnswer: $('.ct-checkbox-right-answer').val() || '',
            };
            var subjQues = {
                content: prjUtil.conv2oneLine($('.subjectivity-question').val(), 'isToBr'),
                subjRightAnswer: prjUtil.conv2oneLine($('.reference-answer').val(), 'isToBr') || '',
            };
            var chapter = self.getChaSec().chapter;
            var section = self.getChaSec().section;
            if (!chapter && !section) {
                return;
            }
            if (!(radQuesJsonTextSession || mulQuesJsonTextSession || subjQuesJsonTextSession)) {
                if (!(radQues.content || mulQues.content || subjQues.content)) {
                    prjUtil.alertDialog('请确认您已经输入了测试题目！');
                    return;
                }
            }
            //其余情况不一定设置哪种类型的题目了
            if (!radQuesJsonTextSession && radQues.content) { //没点击确定
                radQuesJsonText = "{'chapter':'" + chapter + "','section':'" + section + "','radContent':'" + radQues.content + "','radChoice':['" + radQues.radOptin1 + "','" +
                    radQues.radOptin2 + "','" + radQues.radOptin3 + "','" + radQues.radOptin4 + "'],'radAnswer':'" + radQues.radRightAnswer + "'}";
            } else {
                radQuesJsonText = radQuesJsonTextSession;
            }
            if (!mulQuesJsonTextSession && mulQues.content) {
                mulQuesJsonText = "{'chapter':'" + chapter + "','section':'" + section + "','mulContent':'" + mulQues.content + "','mulChoice':['" + mulQues.mulOptin1 + "','" +
                    mulQues.mulOptin2 + "','" + mulQues.mulOptin3 + "','" + mulQues.mulOptin4 + "'],'mulAnswer':'" + mulQues.mulRightAnswer + "'}";
            } else {
                mulQuesJsonText = mulQuesJsonTextSession;
            }
            if (!subjQuesJsonTextSession && subjQues.content) {
                subjQuesJsonText = "{'chapter':'" + chapter + "','section':'" + section + "','subjContent':'" + subjQues.content +
                    "','subjAnswer':'" + subjQues.subjRightAnswer + "'}";
            } else {
                subjQuesJsonText = subjQuesJsonTextSession;
            }
            var cTestObj = {
                csId: sessionStorage.getItem('curCourseId') || -1,
                radQues: radQuesJsonText,
                mulQues: mulQuesJsonText,
                subjQues: subjQuesJsonText
            };
            console.log(cTestObj);
            dbOprTools.addData2DB_cTest(cTestObj, callback_clearTestSession);

        },
    };

    function callback_clearTestSession() {

        sessionStorage.setItem('radQuesJsonText', '');
        sessionStorage.setItem('mulQuesJsonText', '');
        sessionStorage.setItem('subjQuesJsonText', '');
    }
    module.exports = courseTest;
});
