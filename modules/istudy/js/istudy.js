/**
 * [自主学习的主页]
 * 与资源的区别是，生成页面用模板
 */
define(function(require, exports, module) {
    var dbTools = require('./dbOpr');
    var config = require('../../../common/js/prjConfig');
    var istudy = {
        init: function() {
            this.initMainLayout();
            this.changeLookStyle();
            this.gotoCourseDetail();
            this.sortCourses();
            this.searchByText();
        },
        initMainLayout: function(queryFilter) {
            var self = this;
            //从数据库中查询课程数据
            dbTools.queryDatasFromDB('courses_total', '*', queryFilter, self.fyDiv, 'fyDiv'); //请求全部数据，初始化分页器
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
                    dbTools.queryDatasFromDB('courses_total', '*', queryFilter, getOnePageData, 'getOnePageData', num - 1); //请求全部数据，初始化分页器

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
        sortCourses: function() {
            var self = this;
            $('.istudy-wraper').on('click', '.sortdivs div', function(event) {
                console.log($.trim($(this).text()));
                $(this).parent().children().removeClass('sortdivs-clk');
                $(this).addClass('sortdivs-clk');

                //应该重新全部生成新的div页
                switch ($.trim($(this).text())) {
                    case '时间':
                        var spanIcon = $(this).find('.glyphicon');
                        if (spanIcon.hasClass('glyphicon-arrow-down')) {
                            $(this).find('.glyphicon').removeClass('glyphicon-arrow-down');
                            $(this).find('.glyphicon').addClass('glyphicon-arrow-up');
                            sessionStorage.setItem('courseSortItem', 'timeDown');
                        } else if (spanIcon.hasClass('glyphicon-arrow-up')) {
                            $(this).find('.glyphicon').removeClass('glyphicon-arrow-up');
                            $(this).find('.glyphicon').addClass('glyphicon-arrow-down');
                            sessionStorage.setItem('courseSortItem', 'timeUp');
                        }
                        // sessionStorage.setItem('currentPageNum',1);
                        // content.initLayout(whereArgs.slice(0, -4));

                        break;
                    case '评分':
                        sessionStorage.setItem('courseSortItem', 'fate');
                        // content.initLayout(whereArgs.slice(0, -4));
                        break;
                    case '参与量':
                        // content.initLayout(whereArgs.slice(0, -4));
                        sessionStorage.setItem('courseSortItem', 'attendNums');
                        break;
                }
                self.initMainLayout();

            });
        },
        /**
         * [searchByText 输入查询]
         */
        searchByText: function() {
            var self = this;

            $('.istudy-wraper').on('click', '.course-search-icon', function(event) {
                var searchText = $('.course-search-text').val();
                var queryFilter = "cName like '%" + searchText + "%' or cIntro like '%" + searchText + "%' or cTeacherIntro like '%" +
                    searchText + "%' or cSectionFiles like '%" + searchText + "%'";
                if (searchText) {
                    self.initMainLayout(queryFilter);
                }
                /*else {
                                   self.initMainLayout();
                               }*/
            });
            $('.course-search-text').keydown(function(event) {
                if (event.keyCode) {
                    if (event.keyCode == 13) {
                        var searchText = $('.course-search-text').val();
                        var queryFilter = "cName like '%" + searchText + "%' or cIntro like '%" + searchText + "%' or cTeacherIntro like '%" +
                            searchText + "%' or cSectionFiles like '%" + searchText + "%'";
                        if (searchText) {
                            self.initMainLayout(queryFilter);
                        }
                    }
                }
            });
        },
        changeLookStyle: function() {
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
        gotoCourseDetail: function() {
            $('.istudy-wraper').on('click', '.content-one,.content-one-small', function(event) {
                var cId = $(this).attr('data-cid');
                var searchCourseName = $(this).find('.cont-title').text();
                parent.location.assign(config.subHref() + "/modules/istudy/courseDetail.html?cid=" + cId + "&courseName='" + searchCourseName + "'");
            });
        },

    };

    function getOnePageData(data) {
        console.log('回掉函数：');
        console.log(data);
        if(data.length == 0){
            $('.course-divs').html('<p style="color:#ccc;font-weight:bold;margin-top:20px;">对不起！没有查询到相关资源。</p>')
            return;
        }
        var tplData = {
            courseObjs: data,
            picFileURL: gEcnu.config.geoserver + 'fileserver?req=getfile&fn=upload/course/coursePic/',
        };
        //两种浏览方式，两个模板
        var lookStyle = sessionStorage.getItem('courseLookStyle');
        require('../css/courseContentPages.css');
        if (lookStyle === 'big' || !lookStyle) {
            var courseContentBigTpl = require('../tpl/courseContentBig.tpl');
            $('body').append(courseContentBigTpl);
            var courseContentBig = template('courseContentBig', tplData);
            document.querySelector('#course-divs').innerHTML = courseContentBig;
        } else if (lookStyle === 'small') {
            var courseContentSmallTpl = require('../tpl/courseContentSmall.tpl');
            $('body').append(courseContentSmallTpl);
            var courseContentSmall = template('courseContentSmall', tplData);
            console.log('smallLookStyle');
            document.querySelector('#course-divs').innerHTML = courseContentSmall;
        }
    }
    module.exports = istudy;
});
