define(function(require, exports, module) {
	var config = {
    	 subHref :function(){
    	 	return window.location.protocol + "//" + window.location.host + "/gecp";
    	 } 
	};

	module.exports = config;
});