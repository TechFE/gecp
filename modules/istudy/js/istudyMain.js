/**
 * 自主学习部分
 * By zry
 * 2016-04-26
 */
define(function(require){
	var navheader = require("../../../common/js/navheader");
    navheader.init();
    $('.navbar-nav li a').css('color', '#9d9d9d');
    $('.navbar-nav li:nth(2) a').css('color', '#fff');

    $('.tea-course-set').on('click',function(event) {
    	window.location.href = "istudy-tea.html";
    });
});