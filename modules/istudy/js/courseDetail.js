/**
 * 课程详情页
 */

define(function(require, exports, module) {
    var prjUtil = require('../../../common/js/prjUtil');
    var prjConfig = require('../../../common/js/prjConfig');
    var dbTools = require('./dbOpr');
    var serachArray = window.location.search.split('&');
    var cid = serachArray[0].slice(5);
    var courseName = serachArray[1].slice(11);
    console.log(cid);
    var cDetail = {
        init: function() {
            this.getMesFromDB();
            this.attendCourse();
        },
        getMesFromDB: function() {
            var queryFilter = 'cid=' + cid;
            dbTools.queryDBByField('courses', '*', queryFilter, getMesDataFromDB);
        },
        initLayout: function(data0) {
            $('.cd-return-area').html('<span class="return-istudy">课程学习 </span> > ' + data0.CNAME);
            $('.course-detail-title').html(data0.CNAME);
            $('.cd-course-intro-p').html(data0.CINTRO);
            $('.cd-course-teainfo-p').html(data0.CTEACHERINTRO);
            var courseJsonText = data0.CSECTIONFILES;
            var courseJson = JSON.parse(courseJsonText.replace(/'/g, '"'));
            courseJson.sort(prjUtil.compare("chapter", "section"));
            console.log(courseJson);
            // var chapterArray =[],sectionArray =[],cNameArray =[],
            var len = courseJson.length;
            var cMenuHtml = '';
            for (var i = 0; i < len; i++) {
                // chapterArray.push(courseJson[i].chapter);
                // sectionArray.push(courseJson[i].section);
                // cNameArray.push(courseJson[i].courseName);
                var chapteri = courseJson[i].chapter,
                    courseNamei = courseJson[i].courseName;
                var chapterTitle = "";
                var j = i > 0 ? i : i + 1;
                if (chapteri != courseJson[j - 1].chapter || i === 0) {
                    chapterTitle = '<h4>第' + chapteri + '章</h4>';
                }
                if (/^\d{17}\-/.test(courseNamei)) {
                    courseNamei = courseNamei.slice(18);
                    var lastDotInd = courseNamei.lastIndexOf('.');
                    if (lastDotInd > 1) {
                        courseNamei = courseNamei.slice(0, lastDotInd);
                    }
                }
                cMenuHtml += chapterTitle + '<p>第' + courseJson[i].section + '节&nbsp' + courseNamei + '</p>';
            }
            $('.course-menu').html(cMenuHtml);

            $('.course-detail-wraper').on('click', '.return-istudy', function(event) {
                location.href = prjConfig.subHref()+'/modules/istudy/istudy.html';
            });


            //    var tplData = {
            //    	chapter:chapterArray,
            //    	section:sectionArray,
            //    	courseName:cNameArray,
            //    	courseJson:courseJson
            //    };
            //    var courseMenuTpl = require('../tpl/courseMenu.tpl');
            //    $('body').append(courseMenuTpl);
            // var courseMenu = template('courseMenu',tplData);
            // $('.course-menu').html(courseMenu);

        },
        attendCourse: function() {
            $('.course-detail-wraper').on('click', '.attend-course', function(event) {
                var userId = localStorage.getItem('userId');
                console.log('userId:' + userId);
                if (userId) {
                    var cAttendStu = {
                        uid: userId,
                        csId: cid
                    };
                    //写入数据库cAttendStu
                    dbTools.addData2DB_cAttendStu(cAttendStu);
                }
                location.href = prjConfig.subHref()+'/modules/istudy/courseVideo.html?cid='+cid+'&courseName='+courseName;
            });
        },
    };

    /**
     * [getMesDataFromDB 查询数据库回掉函数]
     * @return {[type]} [description]
     */
    function getMesDataFromDB(data) {
        console.log(data); //回调函数里返回数据
        cDetail.initLayout(data[0]);
    }

    module.exports = cDetail;
});
