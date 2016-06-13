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
                'Fields': ["cName", "cCreateDate","cPicName","cIntro", "cTeacherIntro", "cAims", "cOutline", "cNotification", "cDifficulty", "cGrade", "cmCode", "saCode", "saLevel", "cFinishDuringDate", "cSectionFiles"],
                'Data': [
                    [courseSetObj.cName,courseSetObj.cCreateDate,courseSetObj.cPicName, courseSetObj.cIntro, courseSetObj.cTeaIntro, courseSetObj.cAims, courseSetObj.cOutline, courseSetObj.cNotification, courseSetObj.cDifficultySet, courseSetObj.cGradeSet, courseSetObj.cCmCodeSet,
                        courseSetObj.cSaCodeSet, courseSetObj.cSaLevelSet, courseSetObj.cStudyDuring, courseSetObj.cSectionFiles
                    ]
                ]
            };
            sqlServices.processAscyn("ADD", "gecp2", "courses", Params);
        },
        queryDatasFromDB: function(tableName, queryFields,queryFilter,callbackFunc) {
            if (!queryFilter) {
                queryFilter = '1=1';
            }
            if(!queryFields){
                queryFields = '*';
            }
            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    console.log(data);
                    if (callbackFunc) {
                        callbackFunc(data);
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
        }



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
