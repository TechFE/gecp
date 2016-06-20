/**
 * 课程资源点击进入
 * By zry
 * 2016-04-27
 */
define(function(require) {
    var navheader = require("../../../common/js/navheader");
    navheader.init();
    $('.navbar-nav li a').css('color', '#9d9d9d');
    $('.navbar-nav li:nth(2) a').css('color', '#fff');

    var assessModue = require('../../res/js/assessModule');
    var serachArray = window.location.search.split('&');
    var cid = serachArray[0].slice(5);
    var tableFields = {};
    tableFields.fidValue = cid;
    tableFields.id = "ccId"; //表中对应的字段名
    tableFields.fId = "cId";
    tableFields.person = "ccPerson";
    tableFields.content = "ccContent";
    tableFields.rate = "ccRate";
    tableFields.date = "ccDate";
    /**
     * [init 评论模块初始化]
     * @param  {[type]} elePos     [位置]
     * @param  {[type]} tableName [评论的表名]
     * @param  {[type]} id        [根据唯一值插入数据]
     */
    assessModue.init('#assess-module', 'courseComments', tableFields);
    $('#assess-module').css('display', 'none');
    $('#pagination1').css('display', 'none');
    // assessModue.initLayout('#assess');
    $('.course-detail-pane li').on('click', function(event) {
        console.log($(this).text());
        console.log($(this).index());
        sessionStorage.setItem('cDetailPaneLiIndex',$(this).index());
        if ($(this).text() == '评价') {
            $('#assess-module').fadeIn('slow', function() {
                $('.course-tab-content div:last').css('display', 'none');
                $('#assess-module').css('display', 'block');
                $('#pagination1').css('display', 'block');
            });
        } else {
            $('#assess-module').css('display', 'none');
            $('#pagination1').css('display', 'none');
        }

    });
    // var cDetailPaneLiIndex = sessionStorage.getItem('cDetailPaneLiIndex');
    // if(cDetailPaneLiIndex){
    //     $('.course-detail-pane li').removeClass('active');
    //     $('.course-detail-pane li').eq(cDetailPaneLiIndex).addClass('active');
    //     $('.course-detail-pane li').eq(cDetailPaneLiIndex).click();
    // }
    var courseDetail =  require('./courseDetail');   
    courseDetail.init();


});
