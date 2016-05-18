define(function(require, exports, module) {
    var _downloadFile = {
        /**
         * [downloadFileByURL 链接模拟下载]
         * @param  {[string]} fileName [文件名全称]
         * 
         */
        downloadFileByURL: function(fileName, reFileName) {
            var a = document.getElementById('downloadFtsetBtn');
            var host = window.location.host; //"localhost:85"
            if (a == undefined) {
                a = document.createElement('a');
                a.id = 'downloadFtsetBtn';
                a.style.display = 'none';
                a.target = '_blank';
                document.body.appendChild(a);
            }
            try {
                // a.href = 'http://' + host + '/gecp/fileserver?fn=upload/' + fileName;
                a.href = 'gecp/fileserver?fn=upload/' + 'user' + '/' + fileName;
                if (reFileName&&reFileName!='null') {
                    a.download = reFileName;
                } else {
                    a.download = fileName;
                }
                /* if (typeof navigator.msSaveBlob == "function"){  //IE
                     navigator.msSaveBlob(blob, fileName);
                 }*/
                a.click();
                /*if(callback!=undefined){
                    callback();
                }*/
            } catch (e) {
                console.error(e);
            }
        },
        /**
         * [downloadFileByBinary 按照二进制下载]
         * @param  {[type]} fileName [文件名全称]
         * 
         */
        downloadFileByBinary: function(fileName, reFileName) {
            var host = window.location.host; //"localhost:85"
            /*下载查看  FileServer API*/
            $.ajax({
                    // url: 'http://' + host + '/gecp/fileserver',
                    url: 'gecp/fileserver',
                    type: 'POST',
                    // data: 'req=getzip&fn=upload/'+fileName+'&fn2='+fileName+'.zip'
                    data: 'req=getfile&fn=upload/' + 'user' + '/' + fileName,
                    success: function(content) {
                        console.log(content);
                        var blob = new Blob([content], { "type": 'text' }); //HTML 5 API 下载的时候注意type类型
                        console.log(blob);
                        // localStorage.setItem(fileName, blob);
                        var a = document.getElementById('downloadFtsetBtn');
                        if (a == undefined) {
                            a = document.createElement('a');
                            a.id = 'downloadFtsetBtn';
                            a.style.display = 'none';
                            a.target = '_blank';
                            document.body.appendChild(a);
                        }
                        try {
                            var URL = window.URL || window.webkitURL;
                            window.objectURL = URL.createObjectURL(blob);
                            a.href = objectURL;
                            if (reFileName&&reFileName!='null') {
                                a.download = reFileName;
                            } else {
                                a.download = fileName;
                            }
                            if (typeof navigator.msSaveBlob == "function") { //IE
                                navigator.msSaveBlob(blob, fileName);
                            }
                            a.click();
                            /*if(callback!=undefined){
                                callback();
                            }*/
                        } catch (e) {
                            console.error(e);
                        }
                    }
                })
                .done(function() {
                    console.log("success");
                    URL.revokeObjectURL(window.objectURL);
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
        }
    };

    module.exports = _downloadFile;
});
