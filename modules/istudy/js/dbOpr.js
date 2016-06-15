/**
 * 自主学习模块下的数据库操作放在这里
 */

define(function(require, exports, module) {
    var dbOpr = {
        /*课程设置模块*/
        addData2DB_courses: function(courseSetObj) {
            console.log(courseSetObj);

            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    alertDialogShow("新建课程成功");
                    // $('.modal-close').on('click', function(event) {
                    //     // localStorage.clear();
                    //     // courseSetObj = null;
                    //     window.location.reload();
                    // });
                    // $('.close').on('click', function(event) {
                    //     window.location.reload();
                    // });
                },
                'processFailed': function() {
                    console.log("dbOpr.js文件下数据库操作失败！");
                }
            });
            var Params = {
                'Fields': ["cName", "cCreateDate","cCreateUser", "cPicName", "cIntro", "cTeacherIntro", "cAims", "cOutline", "cNotification", "cDifficulty", "cGrade", "cmCode", "saCode", "saLevel", "cFinishDuringDate", "cSectionFiles"],
                'Data': [
                    [courseSetObj.cName, courseSetObj.cCreateDate,courseSetObj.cCreateUser,courseSetObj.cPicName, courseSetObj.cIntro, courseSetObj.cTeaIntro, courseSetObj.cAims, courseSetObj.cOutline, courseSetObj.cNotification, courseSetObj.cDifficultySet, courseSetObj.cGradeSet, courseSetObj.cCmCodeSet,
                        courseSetObj.cSaCodeSet, courseSetObj.cSaLevelSet, courseSetObj.cStudyDuring, courseSetObj.cSectionFiles
                    ]
                ]
            };
            sqlServices.processAscyn("ADD", "gecp2", "courses", Params);
        },
        /**
         * [queryDatasFromDB 已经写死了，只用在courses表]
         * @param  {[type]} tableName    [description]
         * @param  {[type]} queryFields  [description]
         * @param  {[type]} queryFilter  [description]
         * @param  {[type]} callbackFunc [description]
         * @param  {[type]} action       [description]
         * @param  {[type]} pageNum      [description]
         * @return {[type]}              [description]
         */
        queryDatasFromDB: function(tableName, queryFields, queryFilter, callbackFunc, action, pageNum) {
            var onePageNums = 12; //一页12个
            if (!queryFilter || action === 'fyDiv') {
                queryFilter = '1=1';
            }
            if (!queryFields) {
                queryFields = '*';
            }
            var sortItemName = 'cId';
            var cSortItemSession = sessionStorage.getItem('courseSortItem'); //排序
            if (cSortItemSession) {
                switch (cSortItemSession) {
                    case "timeDown": //升序
                        sortItemName = 'date'; /*'date(a.date)';*/
                        break;
                    case "timeUp": //降序
                        sortItemName = 'date DESC';
                        break;
                    case "fate": //评分
                        sortItemName = 'avgRate DESC';
                        break;
                    case "downloads": //下载量   其实评分也可以这样类似写
                        // lyrVal='((uploadFile2 join cDesign on uploadFile2.cdCode = cDesign.cdCode) as ud left join cMoudle on ud.cmCode=cMoudle.cmCode) as a left join ubDownload on a.fid = ubDownload.userDownloadFileId';
                        // fieldsVal = 'fid,fPicFileName,ftype,subjectName,uldname,a.cdCode,cdName,a.cmCode,cmName,clCode,saCode,ssnj,ssks,wjlx,date,filename,fileRename,bzxx,fcomments,userDownloadFileId,count(userDownloadFileId) fileDownloadNums';
                        sortItemName = 'attendNums DESC';
                        break;
                }
            }
            if (action === 'getOnePageData') { //分页获取数据
                if ((pageNum + 1)) {
                    queryFilter = queryFilter + " group by cId order by " + sortItemName + " limit " + onePageNums + " offset " + pageNum * onePageNums;
                    console.log(queryFilter);
                }
            }
            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    console.log(data);
                    if (callbackFunc && data) {
                        if (action === 'fyDiv') {
                            callbackFunc(Math.ceil(data.length / onePageNums));
                        } else {
                            callbackFunc(data);
                        }
                    }
                },
                'processFailed': function() {
                    console.log("fileDetial.js文件下数据库操作失败！");
                }
            });
            var lyrOrSQL = {
                'lyr': tableName,
                'fields': queryFields,
                'filter': queryFilter
            };
            sqlServices.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
        },
        addData2DB_cTest: function(cTestObj, callback) {
            console.log(cTestObj);

            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    if (callback) {
                        callback();
                    }
                    alertDialogShow("新建测试题成功");
                    $('.modal-close').on('click', function(event) {
                        window.location.reload();
                    });

                },
                'processFailed': function() {
                    console.log("dbOpr.js文件下数据库操作失败！");
                }
            });
            var Params = {
                'Fields': ["csId", "radQues", "mulQues", "subjQues"],
                'Data': [
                    [
                        cTestObj.csId, cTestObj.radQues, cTestObj.mulQues, cTestObj.subjQues
                    ]
                ]
            };
            sqlServices.processAscyn("ADD", "gecp2", "cTest", Params);
        },



        /**/
    };
    /**
     * [alertDialogShow alert]
     * @param  {[string]} value [alert的内容]
     */
    function alertDialogShow(value) {
        if (!$('#alertModal').val()) {
            var alertDialog = require('../../../common/subpages/alertDialog.html');
            $('body').append(alertDialog);
            $('#alertModal').modal('show');
            $('.modal-body').text(value);
        }
    }

    module.exports = dbOpr;
});
