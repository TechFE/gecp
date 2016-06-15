/**
 * 自主学习部分
 * By zry
 * 2016-04-26
 */
define(function(require){
	var navheader = require("../../../common/js/navheader");
	var prjUtil = require("../../../common/js/prjUtil");
    navheader.init();
    $('.navbar-nav li a').css('color', '#9d9d9d');
    $('.navbar-nav li:nth(2) a').css('color', '#fff');

    //判断身份
    var identity = prjUtil.sampleDecode(localStorage.getItem('identity'));
    // console.log(identity);
   
    $('.istudy-wraper').on('click','.tea-course-set',function(event) {
    	window.location.href = "istudy-tea.html";
    });

    //使用模板引擎
    var data = {
        title:'课程主页',
        identity:identity,
    };
    var html = template('isStudyTemp',data);//script的id
    // console.log(html);
    document.getElementById('tea-course-set-div').innerHTML = html;

    var istudy = require('./istudy');
    istudy.init();
});