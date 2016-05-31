define(function(require, exports, module) {
    var cookie = require('../../../common/js/cookie');
    var username = cookie.getCookie('username');
    // var usrRes = require('./usrres');
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
        updateTitle: function(fid, newTitle, updateFiled) {
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

        usrCollectFile: function(callback, flag, pageNum) {
            var userId = localStorage.getItem('userId');
            var onePageNums = 15;
            var whereArgs = 'userId="' + userId + '"';
            if (flag === 'getPageDataFlag') {
                whereArgs = whereArgs +'  limit '+ onePageNums+' offset  '+ (pageNum * onePageNums);
            }
            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    console.log(data);
                    if (flag === 'getAllDataFlag') {
                        if (data && callback) {
                            callback(Math.ceil(data.length / onePageNums));
                        } else {
                            callback(1);
                        }
                    } else if (flag === 'getPageDataFlag') {
                        if (data && callback) {
                            callback(data);
                        }
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
                'filter': whereArgs
            };
            sqlServices.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
        },
        /**
         * 根据用户名去查询数据库
         * @return {[data]}                            [返回数据]
         */
        queryUsrDB2Datas: function(callback) {
            var onePageNums = 15;
            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    if (data) {
                        callback(Math.ceil(data.length / onePageNums));
                    } else {
                        callback(1);
                    }
                },
                'processFailed': function() {
                    console.log("usrres.js文件下数据库操作失败！");
                }
            });
            //processAscyn: function(ActionType,map,lyrOrSQL,Params)
            var lyrOrSQL = {
                'lyr': 'uploadFile2',
                'fields': 'fid',
                'filter': 'uldname="' + username + '"'
            };
            sqlServices.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
            /**********数据库End**********************/
        },
        /*按页进行查询*/
        queryUsrDB2PageDatas: function(pageNum, callback) {
            var onePageNums = 15;
            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    // var usrRes = require('./usrres');
                    // usrRes.usrResDiv.createResDiv(data);
                    console.log(data);
                    if (data && callback) {
                        callback(data);
                    }
                },
                'processFailed': function() {
                    console.log("usrres.js文件下数据库操作失败！");
                }
            });
            //processAscyn: function(ActionType,map,lyrOrSQL,Params)
            var lyrOrSQL = {
                'lyr': '(uploadFile2 join cDesign on uploadFile2.cdCode = cDesign.cdCode) as a left join cMoudle on a.cmCode=cMoudle.cmCode',
                'fields': 'fid,fPicFileName,ftype,subjectName,uldname,a.cdCode,cdName,a.cmCode,cmName,clCode,saCode,ssnj,ssks,wjlx,date,filename,fileRename,bzxx,fcomments',
                'filter': 'uldname="' + username + '"limit '+onePageNums+' offset ' + (pageNum * onePageNums)
            };
            sqlServices.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
            /**********数据库End**********************/
        },

    };

    module.exports = dbTools;
});
