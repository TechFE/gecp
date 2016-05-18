/**
 * 全局搜索
 */
define(function(require, exports, module) {
    var config = require('./prjConfig');
    var globalSearch = {
        init: function() {
            this.initLayout();
            this.clickSearchResultMenu();
            this.getSearchTxt();
        },
        
        initLayout: function() {
            $('.search-result-menu li:first').addClass('search-result-menu-hover');
            $('search-result-mes').text();
        },
        getSearchTxt:function(){
        	var searchTxt = location.search.slice(7);
        	var searchTxtArray = searchTxt.split('+');
        	var queryFilter1="";
        	for (var i = 0,len=searchTxtArray.length-1; i < len; i++) {
        		var searchText=decodeURIComponent(searchTxtArray[i]);
        	    queryFilter1 += " filename like '%" + searchText + "%' or fileRename like '%" + searchText + "%' or subjectName like '%" + searchText + "%' or";
        	}
        	var searchText1=decodeURIComponent(searchTxtArray[len]);
        	queryFilter1 += " filename like '%" + searchText1 + "%' or fileRename like '%" + searchText1 + "%' or subjectName like '%" + searchText1 + "%'";
        	this.searchFromDB(queryFilter1);

        },
        clickSearchResultMenu:function(){
        	 $('.search-result-menu li').on('click', function(event) {
        	 	 $(this).parent().children().removeClass('search-result-menu-hover');
        	 	 $(this).addClass('search-result-menu-hover');
        	 	 console.log($.trim($(this).text()));
        	 });
        },
        searchFromDB:function(queryFilter, pageNum){
        		var self = this;
        		var onePageRes = 15;
                queryFilter = queryFilter ? queryFilter : '1=1'; //queryFilter为空的话 1=1
                
                if ((pageNum + 1)) { //附加limit offset条件
                    queryFilter = queryFilter + " limit " + onePageRes + " offset " + pageNum * onePageRes;
                }
                console.log(queryFilter);
                var maxPage;
                var lyrVal = 'ratesDownloads';//数据库中的视图
                var fieldsVal = 'fid,fPicFileName,ftype,subjectName,uldname,cdCode,cdName,cmCode,cmName,clCode,saCode,ssnj,ssks,wjlx,geoInfo,date,filename,fileRename,bzxx,fcomments,uldFileId,fcRate,rateNums,downloadNums';
                
                var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                    'processCompleted': function(data) {
                        console.log(data);
                        self.createResultContent(data);
                    },
                    'processFailed': function() {
                        console.log("globalSearch.js文件下数据库操作失败！");
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
        createResultContent:function(data){
        	 if (data.length == 0) {
                $('.search-result-div').html('<br><br><p style="color:#ccc">对不起，没有搜索到资源！</p>');
                return;
            }
            $('.search-result-div').empty(); //清除所有再去添加
            var totalHtml = "",
                messagesTopHtml = "",
                html = "";
            for (var i = 0, len = data.length; i < len; i++) {
                var datai = data[i];
                if (datai) {
                    var fileTitle = "";
                    if (datai.fileRename && datai.fileRename != 'null') {
                        fileTitle = datai.fileRename;
                    } else {
                        fileTitle = datai.filename;
                    }
                    var lastIndexOfDot = fileTitle.lastIndexOf('.');
                    if (lastIndexOfDot > 0) {
                        fileTitle = fileTitle.slice(0, lastIndexOfDot);
                        fileTitle = fileTitle ? fileTitle : '文件名为空';
                    } else {
                        fileTitle = fileTitle ? fileTitle : '文件名为空';
                    }

                    if (datai.ftype == 2) {
                        fileTitle = datai.subjectName || fileTitle;
                        messagesTopHtml = '<div class="messages-top subject-logo">' + fileTitle + '</div>';
                    } else {
                        // fileTitle = filename;
                        messagesTopHtml = '<div class="messages-top">' + fileTitle + '</div>' +
                            '<div class="filename-hidden">' + datai.filename + '</div>';
                    }

                    /* if (datai.fPicFileName) { //如果有封面
                         var picFileURL = getPicFileURL(datai.fPicFileName);
                         fileImgHtml = "<div class='usrres-img'><img src='" + decodeURI(picFileURL) + "' class='cont-img' alt='封面'/></div>";
                     } else {
                         //空
                         fileImgHtml = "<div class='usrres-img'><img src='../res/img/nr/" + (i + 1) + ".png' class='cont-img' alt='封面'/></div>";
                     }*/
                    var wjlx = datai.wjlx == '0' ? "   " : datai.wjlx;
                    var ssnj = datai.ssnj == '0' ? "   " : datai.ssnj;
                    var ssks = datai.ssks == '0' ? "   " : datai.ssks;
                    var date = datai.date == '0' ? "   " : datai.date;
                    var cdName = datai.cdName ? datai.cdName : " ";
                    var cmName = datai.cmName ? datai.cmName : " ";

                    html = '<div class="usrres-onediv" data-fid="' + datai.fid + '">' +
                        // fileImgHtml +
                        '<div class="usrres-messages">' +
                        messagesTopHtml +
                        '<div class="messages-bottom">' +
                        '<div class="mes-fid">' + datai.fid + '</div>' +
                        '<div class="mes-ftype">' + datai.ftype + '</div>' +
                        '<div class="mes-cdcm">' + cdName + '&nbsp&nbsp</div>' +
                        '<div class="mes-cdcm">' + cmName + '&nbsp&nbsp</div>' +
                        '<div class="mes-wjgs">' + wjlx + '&nbsp&nbsp</div>' +
                        '<div class="mes-ssnj">' + ssnj + '&nbsp&nbsp</div>' +
                        '<div class="mes-ssks">' + ssks + '&nbsp&nbsp</div>' +
                        // '<span>&nbsp&nbsp上传者：</span>' +
                        '<div class="res-date"><span class="glyphicon glyphicon-time"></span>&nbsp' + date + '</div>' +
                        '<div class="res-uldname"><span class="glyphicon glyphicon-user"></span>&nbsp' + datai.uldname + '&nbsp&nbsp</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    totalHtml = totalHtml + html;

                }
            }
            //
            $('.search-result-div').append(totalHtml);
        },
    };

    module.exports = globalSearch;
});
