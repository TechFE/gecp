/**
 * 自主学习部分-教师部分
 * By zry
 * 2016-04-27
 */
define(function(require){
	var navheader = require("../../../common/js/navheader");
    navheader.init();
    $('.navbar-nav li a').css('color', '#9d9d9d');
    $('.navbar-nav li:nth(2) a').css('color', '#fff');

    $('.istudy-page').on('click',function(event) {
    	window.location.href = "istudy.html";
    });
    var courseSet = require('./istudyTea');//courseSet
    courseSet.init();
});