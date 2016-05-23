/**
 * [收藏行为操作数据库]
 * Date 2016-04-25
 * by zry
 */
define(function(require, exports, module) {
    var collctDB = {
        addCollect: function(userId, username, fid) {
            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {

                },
                'processFailed': function() {
                    console.log("fileDetial.js文件下数据库操作失败！");
                }
            });
            var Params = {
                'Fields': ['userId', 'userName', 'userCollectFileId'],
                'Data': [
                    [userId, username, fid]
                ]
            };
            sqlServices.processAscyn("ADD", "gecp2", "ubCollectFile", Params);
        },
        /**
         * [removeCollect 根据userId 和 userCollecFileId删除收藏]
         * @return {[type]} [description]
         */
        removeCollect: function(ubId) {
            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    sessionStorage.setItem('isCollectFile', '0'); //是收藏的资源
                    sessionStorage.setItem('userBeahivourId', '-1'); //是收藏的资源
                },
                'processFailed': function() {
                    console.log("fileDetial.js文件下数据库操作失败！");
                }
            });
            var Params = {
                'Fields': 'ubId',
                'Data': [
                    parseInt(ubId)
                ]
            };
            sqlServices.processAscyn("DELETE", "gecp2", "ubCollectFile", Params);
        },
        queryCollect: function(queryFilter, callbackFunc) {
            if (!queryFilter) {
                queryFilter = "1 = 1";
            }
            var sqlServices2 = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    if (callbackFunc && data) {
                        callbackFunc(data);
                    }
                    callback(data);
                },
                'processFailed': function() {
                    console.log("fileDetial.js文件下数据库操作失败！");
                }
            });
            var lyrOrSQL = {
                'lyr': 'ubCollectFile',
                'fields': '*',
                'filter': queryFilter
            };
            sqlServices2.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
        }
    };

    function callback(data) {
        console.log(data);
        if (data[0]) {
            sessionStorage.setItem('isCollectFile', '1'); //是收藏的资源
            sessionStorage.setItem('userBeahivourId', data[0].UBID); 
        } else {
            sessionStorage.setItem('isCollectFile', '0'); 
            // sessionStorage.setItem('userBeahivourId', '-1'); 
        }
    }
    module.exports = collctDB;

});
