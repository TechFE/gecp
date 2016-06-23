/**
 * 课程视频模块
 */
define(function(require,exports,module){
	var courseVideo ={
		init:function(){
			this.getDataFromDB();
		},
		getDataFromDB:function(){
			var self =this;
			var searchArray = location.search.split('&');
			var cId = searchArray[0].slice(5);
			console.log(cId);
			var dbTools = require('./dbOpr');
			dbTools.queryDBByField('courses_total','*','cId='+cId,self.useDataFromDB);
		},
		useDataFromDB:function(data){
			console.log(data);
			var data0 = data[0];
			courseVideo.initLayout(data0);
		},
		initLayout:function(data0){
			// var tplData ={
			// 	courseObj:data0
			// };
			// var cVideoTpl = require('../tpl/courseVideo.tpl');
			// $('body').append(cVideoTpl);
			// var cVideoTpl2Html =template('cVideoTpl',tplData);
			// $('.course-video-wraper').html(cVideoTpl2Html);
		},
	};

	module.exports = courseVideo;
});