/**
 * 课程设置的实践模块
 * change submit
 */

define(function(require, exports, module) {

    var courseSetEvents = {
        changeEvents: function() {
            var self = this;
            $('.course-intro-text').on('change', function(event) {
                console.log($(this).val());
                localStorage.setItem('course-intro', $(this).val());
            });
            $('.course-teaintro-text').on('change', function(event) {
                localStorage.setItem('course-teaintro', $(this).val());
            });
            $('.course-aims-text').on('change', function(event) {
                localStorage.setItem('course-aims', $(this).val());
            });
            $('.course-outline-text').on('change', function(event) {
                localStorage.setItem('course-outline', $(this).val());
            });
            $('.course-notification-text').on('change', function(event) {
                localStorage.setItem('course-notification', $(this).val());
            });
            $('.difficulty-set').on('change', function(event) {
                localStorage.setItem('difficulty-set', $(this).val());
            });
            $('.grade-set').on('change', function(event) {
                localStorage.setItem('grade-set', $(this).val());
            });
            $('#cmcode-set').on('change', function(event) {
                localStorage.setItem('cmcode-set', $(this).val());
            });
            $('#saCode-set').on('change', function(event) {
                localStorage.setItem('saCode-set', $(this).val());
            });
            $('#saLevel-set').on('change', function(event) {
                localStorage.setItem('saLevel-set', $(this).val());
            });

            $('.study-date1').on('change', function(event) {
                localStorage.setItem('study-date1', $(this).val());
            });
            $('.study-date2').on('change', function(event) {
                localStorage.setItem('study-date2', $(this).val());
            });
            $('.course-name').on('change', function(event) {
                localStorage.setItem('course-name', $(this).val());
            });
            $('#chapter-select').on('change', function(event) {
                localStorage.setItem('chapter-select', $(this).val());
            });
            $('#section-select').on('change', function(event) {
                localStorage.setItem('section-select', $(this).val());
            });
            $('.course-section-name').on('change', function(event) {
                localStorage.setItem('course-section-name', $(this).val());
                self.checkRequire('course-upload-cha-sec'); //检测章节是否选择
            });
            $('#course-test-chapter-select').on('change', function(event) {
                localStorage.setItem('course-test-chapter-select', $(this).val());
            });
            $('#course-test-section-select').on('change', function(event) {
                localStorage.setItem('course-test-section-select', $(this).val());
            });
            $('.ct-radio-question').on('change', function(event) {
                localStorage.setItem('ct-radio-question', $(this).val());
                self.checkRequire('course-test-cha-sec');
            });
            $('.radio-option1').on('change', function(event) {
                localStorage.setItem('radio-option1', $(this).val());
            });
            $('.radio-option2').on('change', function(event) {
                localStorage.setItem('radio-option2', $(this).val());
            });
            $('.radio-option3').on('change', function(event) {
                localStorage.setItem('radio-option3', $(this).val());
            });
            $('.radio-option4').on('change', function(event) {
                localStorage.setItem('radio-option4', $(this).val());
            });
            $('#ct-radio-right-answer').on('change', function(event) {
                localStorage.setItem('ct-radio-right-answer', $(this).val());
            });

            $('.ct-checkbox-question').on('change', function(event) {
                localStorage.setItem('ct-checkbox-question', $(this).val());
                self.checkRequire('course-test-cha-sec');
            });
            $('.checkbox-option1').on('change', function(event) {
                localStorage.setItem('checkbox-option1', $(this).val());
            });
            $('.checkbox-option2').on('change', function(event) {
                localStorage.setItem('checkbox-option2', $(this).val());
            });
            $('.checkbox-option3').on('change', function(event) {
                localStorage.setItem('checkbox-option3', $(this).val());
            });
            $('.checkbox-option4').on('change', function(event) {
                localStorage.setItem('checkbox-option4', $(this).val());
            });
            $('#ct-checkbox-right-answer').on('change', function(event) {
                localStorage.setItem('ct-checkbox-right-answer', $(this).val());
            });
            $('.subjectivity-question').on('change', function(event) {
                localStorage.setItem('subjectivity-question', $(this).val());
                self.checkRequire('course-test-cha-sec');
            });
            $('.reference-answer').on('change', function(event) {
                localStorage.setItem('reference-answer', $(this).val());
            });
            /**********************************************************************/
            // window.addEventListener('storage', function(e) {
            //     console.log('改变啦');
            // });
        },
        getCourseSetStorageValue: function() {
            var courseSetObj = {};

            courseSetObj.cIntro = localStorage.getItem('course-intro') || "";
            courseSetObj.cTeaIntro = localStorage.getItem('course-teaintro') || "";
            courseSetObj.cAims = localStorage.getItem('course-aims') || "";
            courseSetObj.cOutline = localStorage.getItem('course-outline') || "";
            courseSetObj.cNotification = localStorage.getItem('course-notification') || "";
            courseSetObj.cDifficultySet = localStorage.getItem('difficulty-set') || "";
            courseSetObj.cGradeSet = localStorage.getItem('grade-set') || "";
            courseSetObj.cCmCodeSet = localStorage.getItem('cmCode-set') || "";
            courseSetObj.cSaCodeSet = localStorage.getItem('saCode-set') || "";
            courseSetObj.cSaLevelSet = localStorage.getItem('saLevel-set') || "";
            courseSetObj.cStudyDate1 = localStorage.getItem('study-date1') || "";
            courseSetObj.cStudyDate2 = localStorage.getItem('study-date2') || "";
            courseSetObj.cStudyDuring = courseSetObj.cStudyDate1 + "#" + courseSetObj.cStudyDate2;
            courseSetObj.cName = localStorage.getItem('course-name') || "";
            courseSetObj.cChapter = localStorage.getItem('chapter-select') || "";
            courseSetObj.cSection = localStorage.getItem('section-select') || "";
            courseSetObj.cSectionName = localStorage.getItem('course-section-name') || "";
            courseSetObj.cTestChapter = localStorage.getItem('course-test-chapter-select') || "";
            courseSetObj.cTestSection = localStorage.getItem('course-test-section-select') || "";
            courseSetObj.cRadioQuestion = localStorage.getItem('ct-radio-question') || "";
            courseSetObj.cRadioOption1 = localStorage.getItem('radio-option1') || "";
            courseSetObj.cRadioOption2 = localStorage.getItem('radio-option2') || "";
            courseSetObj.cRadioOption3 = localStorage.getItem('radio-option3') || "";
            courseSetObj.cRadioOption4 = localStorage.getItem('radio-option4') || "";
            courseSetObj.cRadioRightAnswer = localStorage.getItem('ct-radio-right-answer') || "";
            courseSetObj.cCheckBoxQuestion = localStorage.getItem('ct-checkbox-question') || "";
            courseSetObj.cIntroCheckboxOption1 = localStorage.getItem('checkbox-option1') || "";
            courseSetObj.cIntroCheckboxOption2 = localStorage.getItem('checkbox-option2') || "";
            courseSetObj.cIntroCheckboxOption3 = localStorage.getItem('checkbox-option3') || "";
            courseSetObj.cIntroCheckboxOption4 = localStorage.getItem('checkbox-option4') || "";
            courseSetObj.cCheckboxRightAnswer = localStorage.getItem('ct-checkbox-right-answer') || "";
            courseSetObj.cSubjectivityQuestion = localStorage.getItem('subjectivity-question') || "";
            courseSetObj.cReferenceAnswer = localStorage.getItem('reference-answer') || "";
            courseSetObj.cDate = new Date().toLocaleDateString();
            courseSetObj.cAttendStuId = localStorage.getItem('userId') || "";
            courseSetObj.cMaxCId = (parseInt(localStorage.getItem('newCourseId')) + 2) || 1;
            console.log('courseSetObj.cMaxCId =' + courseSetObj.cMaxCId);
            courseSetObj.cSectionCode = courseSetObj.cMaxCId + "-" + courseSetObj.cChapter + "-" + courseSetObj.cSection;

            return courseSetObj;
        },
        checkRequire: function(chechPos) {
            var courseSetObj = this.getCourseSetStorageValue();
            switch (chechPos) {
                case 'course-upload-cSName':
                    break;
                case "course-upload-cha-sec":
                    if (!courseSetObj.cChapter || !courseSetObj.cSection) {
                        alertDialogShow("上传课程的【章节】没有选择！");
                        return;
                    }
                    break;
                case "course-test-cha-sec":
                    if (courseSetObj.cRadioQuestion || courseSetObj.cCheckBoxQuestion || courseSetObj.cSubjectivityQuestion) {
                        if (!courseSetObj.cTestChapter || !courseSetObj.cTestSection) {
                            alertDialogShow("课程测试的【章节】没有选择！");
                            return;
                        }
                    }
                    break;

            }
        },
        dbOpr: {
            addData2DB_courses: function(courseSetObj) {
                var dbOprTools = require('./dbOpr');
                dbOprTools.addData2DB_courses(courseSetObj);
            },
            queryDataFromDB_courses: function(queryFilter, callbackFunc) { /*'courses','',getMaxId*/
                var dbOprTools = require('./dbOpr');
                dbOprTools.queryDatasFromDB('courses', queryFilter, callbackFunc);
            }
        },
        submitEvents: function() {
            var self = this;
            if (!$('#confirmModal').val()) {
                var confirmDialog = require('../../../common/subpages/confirmDialog.html');
                $('body').append(confirmDialog);
            }

            $('.submit-all').on('click', function(event) { //全部提交--保存到数据库中
                event.preventDefault(); //阻止跳转
                //新建一个课程需要知道最大的课程id  --> 新课程= 最大id+1

                $('#confirmModal').modal('show');
                $('.modal-body').text("是否新建课程？");
                $('.mymodal-cancel').text("需要修改,暂时不新建");
                $('.mymodal-confirm').on('click', function(event) {
                    var courseSetObj = self.getCourseSetStorageValue(); //保存在localStorage里面的值
                    console.log(courseSetObj);
                    console.log('mymodal-confirm');
                    console.log('0000');

                    self.dbOpr.queryDataFromDB_courses('', getMaxCId);
                    console.log('2222');

                    self.dbOpr.addData2DB_courses(courseSetObj);
                    console.log('3333');

                    $('#confirmModal').modal('hide');
                });


            });
        },

    };

    function getMaxCId(data) {
        var maxCId = data[data.length - 1].CID || 1;
        localStorage.setItem('newCourseId', maxCId);
        console.log('1111');
    }
    /**
     * [alertDialogShow alert]
     * @param  {[string]} value [aler4t的内容]
     */
    function alertDialogShow(value) {
        var alertDialog = require('../../../common/subpages/alertDialog.html');
        $('body').append(alertDialog);
        $('#alertModal').modal('show');
        $('.modal-body').text(value);
    }

    module.exports = courseSetEvents;
});
