/**
 * [自主学习的主页]
 * 与资源的区别是，生成页面用模板
 */
define(function(require, exports, module) {
    var dbTools = require('./dbOpr');
    var istudy = {
        init: function() {
        	this.initMainLayout();
        	this.changeLookStyle();
        },
        initMainLayout:function(queryFilter){
            var self = this;
            //从数据库中查询课程数据
            // var queryFilter = "cId = 1";
            dbTools.queryDatasFromDB('courses', '*', queryFilter, self.fyDiv, 'fyDiv'); //请求全部数据，初始化分页器
        },
        fyDiv: function(maxPage, queryFilter, isBySearch) {
            require('../../../common/css/fyDiv.css');
            /*****分页功能**********************/
            var currentPageNum = parseInt(sessionStorage.getItem('currentCoursePageNum')) || 1;
            if (currentPageNum > maxPage) {
                currentPageNum = maxPage;
            }
            maxPage = maxPage == 0 ? 1 : maxPage;
            $.jqPaginator('#pagination1', {
                totalPages: maxPage,
                visiblePages: 10,
                currentPage: 1,
                onPageChange: function(num, type) {
                    // $('#p1').text(type + '：' + num);
                    console.log(type + '：' + num);
                    if (type == "init") {
                        num = 1;
                    } else {
                        sessionStorage.setItem('currentCoursePageNum', parseInt(num)); //保存刷新之前的当前页码
                    }
                    var currentPageNum = parseInt(sessionStorage.getItem('currentCoursePageNum')) || 1;
                    if (currentPageNum != 1 && type == "init") {
                        num = currentPageNum; //即使刷新，进入为最后一次所在页码
                    }
                    if (isBySearch == 'bySearch' && type == "init") { //如果是点击搜索就不要在这里重复初始化了
                        return;
                    }
                    dbTools.queryDatasFromDB('courses', '*', queryFilter, getOnePageData,'getOnePageData',num-1); //请求全部数据，初始化分页器

                }
            });
            $('#pagination1').jqPaginator('option', {
                currentPage: currentPageNum,
                //pageSize:15,
                visiblePages: 6,
                first: '<li class="first"><a href="javascript:;">首页</a></li>',
                prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
                next: '<li class="next"><a href="javascript:;">下一页</a></li>',
                page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
                last: '<li class="last"><a href="javascript:;">末页</a></li>'
            });
            /*****分页功能End**********************/
        },
        changeLookStyle:function(){
        	var lookStyle = sessionStorage.getItem('courseLookStyle');
            if (lookStyle == "small") {
                $('.big-look-style').css('color', '#333');
                $('.small-look-style').css('color', '#337AB7');
            } else {
                $('.small-look-style').css('color', '#333');
                $('.big-look-style').css('color', '#337AB7');
            }
            $('.istudy-wraper').on('click', '.small-look-style', function(event) {
                sessionStorage.setItem('courseLookStyle', 'small');
                $('.big-look-style').css('color', '#333');
                $('.small-look-style').css('color', '#337AB7');
                location.reload();
            });
            $('.istudy-wraper').on('click', '.big-look-style', function(event) {
                sessionStorage.setItem('courseLookStyle', 'big');
                $('.small-look-style').css('color', '#333');
                $('.big-look-style').css('color', '#337AB7');
                location.reload();
            });
        },

    };

    function getOnePageData(data){
    	console.log('回掉函数：');
    	console.log(data);
    	var tplData ={
    		courseObjs:data,
    		picFileURL:gEcnu.config.geoserver + 'fileserver?req=getfile&fn=upload/course/coursePic/' ,
    	};
    	//两种浏览方式，两个模板
        var lookStyle = sessionStorage.getItem('courseLookStyle');
   		require('../css/courseContentPages.css');
    	if(lookStyle === 'big'||!lookStyle){
    		var courseContentBigTpl = require('../tpl/courseContentBig.tpl');
    		$('body').append(courseContentBigTpl);
    		var courseContentBig=template('courseContentBig',tplData);
    		document.querySelector('#course-divs').innerHTML = courseContentBig;
    	}else if(lookStyle === 'small'){
    		var courseContentSmallTpl = require('../tpl/courseContentSmall.tpl');
    		$('body').append(courseContentSmallTpl);
    		var courseContentSmall=template('courseContentSmall',tplData);
    		console.log('smallLookStyle');
    		document.querySelector('#course-divs').innerHTML = courseContentSmall;
    	}
    }
    module.exports = istudy;
});
