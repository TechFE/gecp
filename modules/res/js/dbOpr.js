/**
 * [数据库操作]
 * 查询单独分在queryDB.js中了，这里集合除了查询之外的数据库操作               
 */
define(function(require, exports, module) {
    var dbTools = {
        addData2UbDownload: function(userId, userName, userDownloadFileId) {

            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {

                },
                'processFailed': function() {
                    console.log("res/js/dbOpr.js文件下数据库操作失败！");
                }
            });
            var Params = {
                'Fields': ['userId', 'userName', 'userDownloadFileId'],
                'Data': [
                    [
                        userId, userName, userDownloadFileId
                    ]
                ]
            };
            sqlServices.processAscyn("ADD", "gecp2", "ubDownload", Params);

        },
    };

    module.exports = dbTools;
});
