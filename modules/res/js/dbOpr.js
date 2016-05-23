/**
 * [数据库操作]
 * 查询单独分在queryDB.js中了，这里集合除了查询之外的数据库操作               
 */
define(function(require, exports, module) {
    var prjUtil = require('../../../common/js/prjUtil');

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
        updateUploadFile2: function(obj) {
            var sqlservice = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function() {
                    var confirmDialog = require('../../../common/subpages/confirmDialog.html');
                    $('body').append(confirmDialog);
                    $('#confirmModal').modal('show');
                    $('.modal-body').text("修改成功！点击【确定】获得修改结果！");
                    $('.mymodal-confirm').on('click', function(event) {
                        window.location.reload();
                    });
                },
                'processFailed': function() {
                    prjUtil.alertDialog("对不起！修改失败");
                }
            });
            var Params = {
                'Fields': ["fid", "fileRename", "cdCode", "cmCode", "ssnj", "ssks", "wjlx", "bzxx", "geoInfo"],
                'Data': [
                    [obj.fid, obj.fileTitleEdit, obj.cdCodeEdit, obj.cmCodeEdit, obj.ssnjEdit, obj.ssksEdit, obj.wjlxEdit, obj.bzxxEdit, obj.LocEdit],
                ]
            };
            sqlservice.processAscyn(gEcnu.ActType.UPDATE, 'gecp2', 'uploadFile2', Params);
        },
        delRecordById: function(fields,id) {
            var sqlservice = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function() {
                    prjUtil.alertDialog("删除资源成功");
                    setTimeout(function(){
                        location.reload();
                    },800);
                },
                'processFailed': function() {
                    prjUtil.alertDialog("对不起！删除资源失败");
                }
            });
            var Params = {
                'Fields': fields,
                'Data': [id]
            };
            sqlservice.processAscyn(gEcnu.ActType.DELETE, 'gecp2', 'uploadFile2', Params);
        },
    };

    module.exports = dbTools;
});
