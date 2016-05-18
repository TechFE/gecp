/**
 * 课程设置
 */

define(function(require, exports, module) {
    var courseSetEvents = require('./courseSetEvents');
    var courseSet = {
        init: function() {
            this.changeEvents();
            this.submitEvents();
        },
        changeEvents: function() {
            courseSetEvents.changeEvents(); //变化就存在localStorage中
        },
        submitEvents:function(){
            courseSetEvents.submitEvents(); //提交存放到数据库中
        }
    };


    module.exports = courseSet;
});
