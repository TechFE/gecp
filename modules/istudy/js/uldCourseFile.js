/**
 * 上传文件
 */
define(function(require, exports, module) {
    var prjUtil = require('../../../common/js/prjUtil');
    var cCommonMethods = require('./courseCommon');
    var dbOprTools = require('./dbOpr');
    var dtd = $.Deferred(); // 新建一个Deferred对象

    var fileLists = []; //文件list
    var fileJsonText = ''; //文件名
    var chapterArray = [];
    var sectionArray = [];
    var coursePicName = '';
    var GECP = {};
    var uldCourseFile = {
        init: function() {
            var self = this;
            this.reviewCoursePic();
            $('.course-info').on('click', '.uld-coursefile', function(event) {
                var b = self.checkValidate();
                console.log(b);
                if (!b) {
                    event.preventDefault();
                    return;
                } else {}
            });
            self.showUldCourseFile();
            $('.course-info').on('click', '.uld-submit-btn', function(event) {
                // self.uldCoursePic2Server();
                // self.uldCourseFile2Server();
                self.finishUldCourse2Server();
                // sessionStorage.setItem('course-name', '');
                // sessionStorage.setItem('course-intro-text', '');
                // sessionStorage.setItem('course-teaintro-text', '');
                // sessionStorage.setItem('course-aims-text', '');
                // sessionStorage.setItem('course-outline-text', '');
                // sessionStorage.setItem('course-notification-text', '');
                // sessionStorage.setItem('difficulty-set', '');
                // sessionStorage.setItem('grade-set', '');
                // sessionStorage.setItem('cmcode-set', '');
                // sessionStorage.setItem('saCode-set', '');
                // sessionStorage.setItem('salevel-set', '');
                // sessionStorage.setItem('study-date1', '');
                // sessionStorage.setItem('study-date2', '');
            });

        },
        getCourseSetsObj: function() {
            var courseSetsObj = {};
            courseSetsObj.cName = sessionStorage.getItem('course-name') || "";
            courseSetsObj.cCreateDate = prjUtil.getStandardDate();
            courseSetsObj.cPicName = coursePicName;
            courseSetsObj.cIntro = sessionStorage.getItem('course-intro-text') || "";
            courseSetsObj.cTeaIntro = sessionStorage.getItem('course-teaintro-text') || "";
            courseSetsObj.cAims = sessionStorage.getItem('course-aims-text') || "";
            courseSetsObj.cOutline = sessionStorage.getItem('course-outline-text') || "";
            courseSetsObj.cNotification = sessionStorage.getItem('course-notification-text') || "";
            courseSetsObj.cDifficultySet = sessionStorage.getItem('difficulty-set') || "";
            courseSetsObj.cGradeSet = sessionStorage.getItem('grade-set') || "";
            courseSetsObj.cCmCodeSet = sessionStorage.getItem('cmCode-set') || "";
            courseSetsObj.cSaCodeSet = sessionStorage.getItem('saCode-set') || "";
            courseSetsObj.cSaLevelSet = sessionStorage.getItem('saLevel-set') || "";
            courseSetsObj.cStudyDate1 = sessionStorage.getItem('study-date1') || "";
            courseSetsObj.cStudyDate2 = sessionStorage.getItem('study-date2') || "";
            courseSetsObj.cStudyDuring = courseSetsObj.cStudyDate1 + "--" + courseSetsObj.cStudyDate2;
            courseSetsObj.cSectionName = sessionStorage.getItem('course-section-name') || "";
            courseSetsObj.cSectionFiles = '' + fileJsonText;
            // courseSetsObj.cSectionFiles = '[{"courseName":"20160612195522468-010500 日本.jpg","chapter":"1","section":"1"},{"courseName":"20160612195522471-011000 泰国.jpg","chapter":"1","section":"2"}]';
            // courseSetsObj.cSectionFiles = '[{"cn":"c.jpg"}]';  

            return courseSetsObj;
        },
        reviewCoursePic: function() {
            $('body').on('change', '.upcourse-pic', function(event) {
                var picFile = document.getElementById('upcourse-pic').files[0];
                if (!picFile) {
                    return;
                }
                GECP.picfile = picFile;
                // sessionStorage.setItem('picFile', stringify(picFile));
                if (/&/.test(picFile.name)) {
                    prjUtil.alertDialog('上传的封面名称中不应该有“ & ”符号');
                    return;
                }
                if (picFile.size > 3 * 1024 * 1024) {
                    prjUtil.alertDialog("文件大于3M，请重新上传");
                    return;
                }
                var img = document.createElement('img');
                img.id = "picFile";
                img.classList.add('obj');
                img.file = picFile;
                img.alt = "封面图像已就绪";
                $('.course-pic').html('');
                $('.course-pic').append(img);
                var reader = new FileReader();
                reader.readAsDataURL(picFile);

                reader.onload = function(e) {
                    $('.course-pic-default').css('display', 'none');
                    var res = e.target.result;
                    img.src = res;
                };
                $('#picFile').css({
                    'width': '240px',
                    'height': '135px',
                    'z-index': '999'
                }); //注意位置，已经压缩为150*height【自适应】
            });
        },
        checkValidate: function() {
            var checkValidate = cCommonMethods.checkValidate;
            var boolean1 = checkValidate('chapter-select', '没有选择【章】');
            var boolean2 = checkValidate('section-select', '没有选择【节】');
            return boolean1 && boolean2;
        },
        showUldCourseFile: function() {
            $('.course-info').on('change', '.uld-coursefile', function(event) {
                var fileInputDOM = document.getElementById('uld-coursefile');
                var file = fileInputDOM.files;
                console.log(file);
                // if (file.length !== 0) {
                var file2array = Array.prototype.slice.call(file); //全部转化为数组
                fileLists = fileLists.concat(file2array);
                console.log(fileLists);
                var chapter = $('.chapter-select').val().slice(2);
                var section = $('.section-select').val().slice(3);
                chapterArray.push(chapter);
                sectionArray.push(section);
                for (var i = 0, len = fileLists.length; i < len; i++) {}
                var html = "<p>第" + chapter + "章第" + section + "节:" + file[0].name + "&nbsp&nbsp<span class='glyphicon glyphicon-remove course-remove'></span></p>";
                $('.course-uld-finished').append(html);
                // }
            });
            $('.course-info').on('click', '.course-remove', function(event) {
                var ind = $(this).parent().index();
                $(this).parent().css('display', 'none');
                fileLists.splice(ind, 1);
                chapterArray.splice(ind, 1);
                sectionArray.splice(ind, 1);
                console.log(fileLists);
            });
        },
        finishUldCourse2Server: function() {
            var self = this;
            var wait = function(dtd) {　　　　
                var tasks = (function() {
                    //等待
                    var waitHtml = '<div class="uld-bg"><img alt="正在加载,请稍后... ..." class="uld-bg-img" src="img/wait.gif"></div>';
                    $('body').append(waitHtml);
                    self.uldCoursePic2Server(); //小于3M的图片，忽略判断
                    self.uldCourseFile2Server(dtd);　　　　　　
                    console.log("执行完毕！");　　　　　　
                    // dtd.resolve(); // 改变Deferred对象的执行状态
                })();　　　
                return dtd.promise(); // 返回promise对象
                　　
            };　　
            var d = wait(dtd); // 新建一个d对象，改为对这个对象进行操作
            　　
            $.when(d)
                .done(function() {
                    console.log("哈哈，成功了！");
                    $('.uld-bg,.uld-bg-img').css('display', 'none');
                    $('.uld-submit-btn').css('display', 'none');
                    $('.uld-go-btn').css('display', 'inline-block');
                    prjUtil.alertDialog('上传课程资源成功！');
                })
                .fail(function() { alert("出错啦！"); });

        },
        uldCoursePic2Server: function(dtd, callback) {
            var coursePic = document.getElementById('upcourse-pic').files[0];
            if (coursePic) {
                var intialCoursePicName = coursePic.name ? coursePic.name : '';
                Object.defineProperty(coursePic, 'name', {
                    writable: true
                });
                var timestamp = prjUtil.getTimestamp();
                if (!/^\d{17}-/.test(intialCoursePicName)) {
                    coursePicName = timestamp + '-' + intialCoursePicName; //全局变量 好使用
                }
                coursePic.name = coursePicName;
                console.log(coursePic);
                var reader1 = new FileReader();
                reader1.readAsDataURL(coursePic);

                reader1.onload = function(e) {
                    var res = e.target.result;
                    var path = 'course/coursePic/';
                    prjUtil.uldBase64(coursePic.name, res, path, dtd, callback);
                };

            }
        },
        uldCourseFile2Server: function(dtd, callback) {
            var self = this;
            //上传fileLists
            fileJsonText = '[';
            if (fileLists.length !== 0) {
                for (var i = 0; i < fileLists.length; i++) {
                    var initialFileName = fileLists[i].name;
                    Object.defineProperty(fileLists[i], 'name', {
                        writable: true
                    });
                    var timestamp = prjUtil.getTimestamp();
                    if (!/^\d{17}-/.test(initialFileName)) {
                        fileLists[i].name = timestamp + '-' + initialFileName;
                    }
                    fileJsonText += '{\'courseName\':\'' + fileLists[i].name + '\',\'chapter\':\'' + chapterArray[i] + '\',\'section\':\'' + sectionArray[i] + '\'},';
                    // filename += fileLists[i].name + ";";
                }
                fileJsonText = fileJsonText.slice(0, -1);
                fileJsonText += ']';
                // filename = filename.slice(0, -1);
                // console.log(filename);
            }

            filePath = 'course/file'; //上传服务器的文件夹
            var gUploadFile = new gEcnu.Upload(fileLists, filePath);
            gUploadFile.processAscyn(function() {
                var courseSetsObj = self.getCourseSetsObj();
                // console.log(courseSetsObj);
                // console.log(courseSetsObj.cSectionFiles);
                self.add2CourseDB(courseSetsObj); //上传至数据库
                //查询数据库，最新的id保存到session中
                /* var callback = function(data){
                     // return maxCId;
                     console.log(data);
                     console.log(data[0]);
                     sessionStorage.setItem('curCourseId',data[0]["max(cId)"]);
                 };*/
                dbOprTools.queryDatasFromDB('courses', 'max(cId)', '', getMaxCId);
                if (dtd) {
                    dtd.resolve(); //dtd全局的
                }
                if (callback) {
                    callback();
                }
            }, function() {
                alert('上传文件失败');
            });
        },
        add2CourseDB: function(courseSetsObj) {
            dbOprTools.addData2DB_courses(courseSetsObj);
        },
    };

    function getMaxCId(data) {
        console.log(data);
        console.log(data[0]);
        sessionStorage.setItem('curCourseId', parseInt(data[0]['max(cId)'])+1);
    }
    module.exports = uldCourseFile;
});
