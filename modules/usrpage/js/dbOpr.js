define(function(require, exports, module) {
    /**
     * [dbTools 数据库操作]
     * @type {Object}
     */
    var dbTools = {
        /**
         * [deleteFromDB 根据选择删除数据库]
         * @param  {[type]} fids [根据fid的数组删除]
         */
        deleteFromDB: function(fids) {
            var sqlservice = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function() {
                    $('#usrTipModal .modal-body').text('删除成功！');
                    $('#usrTipModal').modal('show');
                    $('.mymodal-close').on('click', function(event) {
                        window.location.reload(); //刷新
                    });

                },
                'processFailed': function() {
                    $('#usrTipModal .modal-body').text('删除失败！');
                    $('#usrTipModal').modal('show');
                }
            });
            var Params = { 'Fields': 'fid', 'Data': fids };
            sqlservice.processAscyn(gEcnu.ActType.DELETE, 'gecp2', 'uploadFile2', Params);
        },
        updateTitle: function(fid, newTitle,updateFiled) {
            var upFildsArrays = [];
            var upFildsArray = [];
            upFildsArray.push(parseInt(fid));
            upFildsArray.push(newTitle);
            upFildsArrays.push(upFildsArray);
            console.log(upFildsArrays);
            var sqlservice = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function() {
                    $('#usrTipModal .modal-body').text('更新成功！');
                    $('#usrTipModal').modal('show');
                },
                'processFailed': function() {
                    $('#usrTipModal .modal-body').text('更新失败！');
                    $('#usrTipModal').modal('show');
                }
            });
            var Params = { 'Fields': ['fid', updateFiled], 'Data': upFildsArrays };
            sqlservice.processAscyn(gEcnu.ActType.UPDATE, 'gecp2', 'uploadFile2', Params);
        },

        usrCollectFile:function(callback){
            var userId = localStorage.getItem('userId');
            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    if (data) {
                        callback(data);
                    }
                },
                'processFailed': function() {
                    console.log("dbOpr.js文件下数据库操作失败！");
                }
            });
            //processAscyn: function(ActionType,map,lyrOrSQL,Params)
            var lyrOrSQL = {
                'lyr': '((ubCollectFile as ub join uploadFile2 as uf on ub.userCollectFileId = uf.fid) as a join cDesign on a.cdCode=cDesign.cdCode) as b join cMoudle on b.cmCode=cMoudle.cmCode',
                'fields': 'userCollectFileId,fid,ftype,fPicFileName,subjectName,b.cdCode,cdName,b.cmCode,cmName,ssnj,ssks,wjlx,bzxx,date,fileName,fileRename',
                'filter': 'userId="' + userId + '"'
            };
            sqlServices.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
        },

    };

    module.exports = dbTools;
});
