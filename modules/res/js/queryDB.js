    /**
     * [queryDB 查询数据库]
     * @param  {[string]} queryFilter [where语句条件]
     * @param  {[function]} callback [回掉函数]
     * @return {[type]}             [description]
     */
    define(function(require, exports, module) {
        var onePageRes = 12; //onePageRes 一页12个数据

        var queryDB = {
            /**
             * [queryByTb_Fields 根据表和字段查询]
             * @param  {[type]} tableName  [表名]
             * @param  {[type]} fieldWhere [description]
             * @param  {[type]} fieldValue [description]
             * @return {[type]}            [description]
             */
            queryByTb_Fields: function(tableName, fieldWhere, fieldValue, callbackfun) {
                var self = this;
                var sqlServices1 = new gEcnu.WebSQLServices.SQLServices({
                    'processCompleted': function(data) {
                        if (callbackfun) {
                            // console.log(data);
                            callbackfun(data);
                        }
                    },
                    'processFailed': function() {
                        console.log("queryDB.js文件下数据库操作失败！");
                    }
                });
                var lyrOrSQL = {
                    'lyr': tableName,
                    'fields': '*',
                    'filter': '"' + fieldWhere + '"="' + fieldValue + '"'
                };
                sqlServices1.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
            },
            queryDB2Page: function(queryFilter, pageNum) {

                queryFilter = queryFilter ? queryFilter : '1=1'; //queryFilter为空的话 1=1
                var sortItemSession = sessionStorage.getItem('sortItem');
                var sortItemName = 'fid'; //默认
                // var lyrVal = '((uploadFile2 join cDesign on uploadFile2.cdCode = cDesign.cdCode) as ud left join cMoudle on ud.cmCode=cMoudle.cmCode) as a left join fComments on a.fid = fComments.uldFileId';
                // var fieldsVal = 'fid,fPicFileName,ftype,subjectName,uldname,a.cdCode cdCode,cdName,a.cmCode cmCode,cmName,clCode,saCode,ssnj,ssks,wjlx,date,filename,fileRename,bzxx,fcomments,uldFileId,sum(fcRate) fcRate';
                var lyrVal = 'ratesDownloads';//数据库中的视图
                var fieldsVal = 'fid,fPicFileName,ftype,subjectName,uldname,cdCode,cdName,cmCode,cmName,clCode,saCode,ssnj,ssks,wjlx,geoInfo,date,filename,fileRename,bzxx,fcomments,uldFileId,fcRate,rateNums,downloadNums';
                if (sortItemSession) {
                    switch (sortItemSession) {
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
                                sortItemName = 'downloadNums DESC';                
                                break;
                    }
                }
                if ((pageNum + 1)) { //附加limit offset条件
                    queryFilter = queryFilter + " group by fid order by " + sortItemName + " limit " + onePageRes + " offset " + pageNum * onePageRes;
                }
                console.log(queryFilter);
                var maxPage;

                var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                    'processCompleted': function(data) {
                        //回掉函数返回的数据   15条数据
                        var resContent = require('./content');
                        var lookStyle = sessionStorage.getItem('lookStyle');
                        if (lookStyle == "small") {
                            resContent.createResSmallContent(data); //资源列表生成
                        } else {
                            resContent.createResBigContent(data); //资源列表生成
                        }
                    },
                    'processFailed': function() {
                        console.log("queryDB.js文件下数据库操作失败！");
                    }
                });
                //processAscyn: function(ActionType,map,lyrOrSQL,Params)
                var lyrOrSQL = {
                    'lyr': lyrVal,
                    'fields':fieldsVal, 
                    'filter': queryFilter
                };
                sqlServices.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
                /**********数据库End**********************/
            },
            queryDBDatasNum: function(action, queryFilter, isBySearch, callbackFunc) {
                queryFilter = queryFilter ? queryFilter : '1=1'; //queryFilter为空的话 1=1
                var sqlServices2 = new gEcnu.WebSQLServices.SQLServices({
                    'processCompleted': function(data) {
                        if (action === "fyDiv") {
                            callbackFunc(Math.ceil(data.length / onePageRes), queryFilter, isBySearch); //分页
                        }
                    },
                    'processFailed': function() {
                        console.log("queryDB.js文件下数据库操作失败！");
                    }
                });
                //processAscyn: function(ActionType,map,lyrOrSQL,Params)
                var lyrOrSQL = {
                    'lyr': 'ratesDownloads',
                    'fields': 'fid',
                    'filter': queryFilter
                };
                sqlServices2.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
            }
        };

        module.exports = queryDB;
    });
