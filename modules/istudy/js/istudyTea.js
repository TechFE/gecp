/**
 * 课程设置
 */

define(function(require, exports, module) {
    var courseSetsEvents = require('./courseSetsEvents');
    var courseSet = {
        init: function() {
            //执行三步骤的js文件
            this.changeEvents();
            this.submitEvents();
        },
        changeEvents: function() {
            courseSetsEvents.changeEvents(); //变化就存在localStorage中
        },
        submitEvents:function(){
            courseSetsEvents.submitEvents(); //提交存放到数据库中
        }
    };


    module.exports = courseSet;
});
