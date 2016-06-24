/**
 * 课程视频模块
 */
define(function(require, exports, module) {
    var prjUtil = require('../../../common/js/prjUtil');
    var prjConfig = require('../../../common/js/prjConfig');
    var courseVideo = {
        init: function() {
            this.getDataFromDB();
            this.returnClickEvents();
            this.cMenuClickEvents();
            
            var lSearchArray = location.search.split('&');
            var cFileName =  lSearchArray[2].slice(6);
            sessionStorage.setItem('cFileName',cFileName);
            if (cFileName) {
                this.refresh2PlayVideo(cFileName);
            }
        },
        getDataFromDB: function() {
            var self = this;
            var searchArray = location.search.split('&');
            var cId = searchArray[0].slice(5);
            console.log(cId);
            var dbTools = require('./dbOpr');
            dbTools.queryDBByField('courses_total', '*', 'cId=' + cId, self.useDataFromDB);
        },
        useDataFromDB: function(data) {
            console.log(data);
            var data0 = data[0];
            courseVideo.initLayout(data0);
        },
        initLayout: function(data0) {

            var tplData = {
                cObj: data0
            };
            // var cVideoTpl = require('../tpl/courseVideo.tpl');
            // $('body').append(cVideoTpl);
            var cVideoTpl2Html = template('cVideoTpl', tplData);
            $('.return-area-div').prepend(cVideoTpl2Html);
            /*课程目录*/
            var courseDetail = require('./courseDetail');
            courseDetail.parseCourseMenu(data0, '.course-menu-div');
            $(".nano").nanoScroller(); //滚动条
        },
        returnClickEvents: function() {
            $('.course-video-wraper').on('click', '.return-area a', function(event) {
                var subHref = prjConfig.subHref() + '/modules/istudy/courseDetail.html' + location.search;
                location.href = subHref;
            });
        },
        cMenuClickEvents: function() {
            $('.course-video-wraper').on('click', '.course-menu-div p', function(event) {
                var cFileName = $(this).attr('data-cName');
                console.log(cFileName);
                // sessionStorage.setItem('cFileName', cFileName);
                var locationHref = location.href;
                var locationSearch = location.search;
                if(/&pname=/.test(locationSearch)){
                	var pnamePos = locationHref.indexOf('&pname=');
                	location.href = locationHref.slice(0,pnamePos+7)+cFileName;
                }else{
                	location.href = locationHref+'&pname='+cFileName;
                }
                // window.location.reload();
                
            });
        },
        refresh2PlayVideo: function(cFileName) {
        	/*var getDir = new gEcnu.GetDir('upload');
        	console.log(getDir);
        	getDir.processAscyn(function(data){
        		console.log(data);
        	},function(){});*/
            var fileUrl = prjUtil.getFileUrlByName(cFileName, 'course/file');
            // console.log(fileUrl);
            $('.cvideo').attr('src', fileUrl);
            // var jwplayerM = require('./jwplayerModule');
            // jwplayerM.setupPlayer('../../../../data/userdata/upload/course/file/20160616154209827-第1讲：Axure原型作品演示.mp4');
            // jwplayerM.setupPlayer(fileUrl);

            // sessionStorage.setItem('cFileName', '');
        },
    };

    module.exports = courseVideo;
});
