/**
 * jwplayer播放插件
 */
define(function(require, exports, module) {
    var jwplayerMod = {
        init: function() {
            // this.setupPlayer();
        },
        setupPlayer: function(fileUrl) {
        	console.log(decodeURI(fileUrl));
            jwplayer("myplayer").setup({
                file: decodeURI(fileUrl),
                // "file": "../../assert/第1讲：Axure原型作品演示.mp4",
                "height": 600,
                "width": 800,
                "autostart": true,
                "preload":"auto",
            });
        },
    };

    module.exports = jwplayerMod;
});
