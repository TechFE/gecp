/**
 * 课程设置
 */

define(function(require, exports, module) {
    // var courseSetsEvents = require('./courseSetsEvents');
    var uldCourseFile = require('./uldCourseFile');

    var courseSet = {
        init: function() {
            //执行三步骤的js文件
            var courseSets = require('./courseSets');
            courseSets.init();
            // var uldCourseFile = require('./uldCourseFile');
            // uldCourseFile.init();
            // this.changeEvents();
            // this.submitEvents();
            //下一步 
            $('body').on('click', '.cs-go-btn', function(event) {
                event.preventDefault();
                $('.course-tea-title1').removeClass('course-top active-title');
                $('.course-tea-title2').addClass('course-top active-title');
                var uldCourseFileHtml = require('../subs/uldCourseFile.html');
                require('../css/uldCourseFile.css');
                uldCourseFile.init();
                var checkValidate = courseSets.checkValidate();
                if (checkValidate) {
                    $('.course-info').html(uldCourseFileHtml); //到2.上传资源
                }
            });
            $('body').on('click', '.uld-go-btn', function(event) {
                event.preventDefault();
                $('.course-tea-title2').removeClass('course-top active-title');
                $('.course-tea-title3').addClass('course-top active-title');
                var courseTestHtml = require('../subs/courseTest.html');
                require('../css/courseTest.css');
                var b = uldCourseFile.checkValidate();
                if (!b) {
                    event.preventDefault();
                    return;
                } else {
                    $('.course-info').html(courseTestHtml); //到3
                }
            });
            $('body').on('click', '.uld-back-btn', function(event) {
                event.preventDefault();
                $('.course-tea-title2').removeClass('course-top active-title');
                $('.course-tea-title1').addClass('course-top active-title');
                var courseSetsHtml = require('../subs/courseSets.html');
                $('.course-info').html(courseSetsHtml); //2回到1
                courseSets.ifHasValue();
            });
            $('body').on('click', '.ct-back-btn', function(event) {
                event.preventDefault();
                $('.course-tea-title3').removeClass('course-top active-title');
                $('.course-tea-title2').addClass('course-top active-title');
                var uldCourseFileHtml = require('../subs/uldCourseFile.html');
                $('.course-info').html(uldCourseFileHtml); //3回到2
            });
        },
        changeEvents: function() {
            courseSetsEvents.changeEvents(); //变化就存在localStorage中
        },
        submitEvents: function() {
            courseSetsEvents.submitEvents(); //提交存放到数据库中
        }
    };


    module.exports = courseSet;
});
