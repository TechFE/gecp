/**
 * 自主学习部分-教师部分
 * By zry
 * 2016-04-27
 */
define(function(require) {
    var navheader = require("../../../common/js/navheader");
    navheader.init();
    $('.navbar-nav li a').css('color', '#9d9d9d');
    $('.navbar-nav li:nth(2) a').css('color', '#fff');

    $('.istudy-page').on('click', function(event) {
        window.location.href = "istudy.html";
    });
    var courseSetsHtml = require('../subs/courseSets.html');
    $('.course-info').html(courseSetsHtml); //1.课程设置
    var courseSet = require('./istudyTea'); //courseSet
    courseSet.init();
    //下一步 
    $('body').on('click', '.cs-go-btn', function(event) {
        event.preventDefault();
        $('.course-tea-title1').removeClass('course-top active-title');
        $('.course-tea-title2').addClass('course-top active-title');
        var uldCourseFileHtml = require('../subs/uldCourseFile.html');
        require('../css/uldCourseFile.css');
        $('.course-info').html(uldCourseFileHtml); //2.上传资源
    });
    $('body').on('click', '.uld-go-btn', function(event) {
        event.preventDefault();
        $('.course-tea-title2').removeClass('course-top active-title');
        $('.course-tea-title3').addClass('course-top active-title');
        var courseTestHtml = require('../subs/courseTest.html');
        require('../css/courseTest.css');
        $('.course-info').html(courseTestHtml); //3
    }); 
    $('body').on('click', '.uld-back-btn', function(event) {
        event.preventDefault();
        $('.course-tea-title2').removeClass('course-top active-title');
        $('.course-tea-title1').addClass('course-top active-title');
        var courseSetsHtml = require('../subs/courseSets.html');
    	$('.course-info').html(courseSetsHtml); //2回到1
    });
    $('body').on('click', '.ct-back-btn', function(event) {
        event.preventDefault();
        $('.course-tea-title3').removeClass('course-top active-title');
        $('.course-tea-title2').addClass('course-top active-title');
         var uldCourseFileHtml = require('../subs/uldCourseFile.html');
    	$('.course-info').html(uldCourseFileHtml); //3回到2
    });
});
