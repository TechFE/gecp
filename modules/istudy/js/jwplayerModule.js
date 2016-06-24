/**
 * jwplayer播放插件
 */
define(function(require, exports, module) {
    var jwplayer = {
        init: function() {
        	this.setupPlayer();
        },
        setupPlayer: function() {
            jwplayer('myplayer').setup({
                file: 'testfile/H264_640x480_AAC(LC).mp4',
                width: '640',
                height: '480'
            });
        },
    };
});
