// $(document).ready(function() {
define(function(require, exports, module) {
    /**
     * pdf online
     */
    var fileOnline = (function(mod) {
        //var url = "../../temp/1.pdf";
        var pdfDoc = null,
            pageNum = 1,
            pageRendering = false,
            pageNumPending = null,
            scale = 1.5,
            canvas = document.getElementById('the-canvas'),
            ctx = canvas.getContext('2d');
        /*私有函数*/
        //////////////////////////////////////////////////////////////////////////
        /**
         * Get page info from document, resize canvas accordingly, and render page.
         * @param num Page number.
         */
        function renderPage(num) {
            pageRendering = true;
            // Using promise to fetch the page
            pdfDoc.getPage(num).then(function(page) {
                var viewport = page.getViewport(scale);
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);

                // Wait for rendering to finish
                renderTask.promise.then(function() {
                    pageRendering = false;
                    if (pageNumPending !== null) {
                        // New page rendering is pending
                        renderPage(pageNumPending);
                        pageNumPending = null;
                    }
                });
            });

            // Update page counters
            document.getElementById('page_num').textContent = pageNum;
        }

        /**
         * If another page rendering in progress, waits until the rendering is
         * finised. Otherwise, executes rendering immediately.
         */
        function queueRenderPage(num) {
            if (pageRendering) {
                pageNumPending = num;
            } else {
                renderPage(num);
            }
        }

        /**
         * Displays previous page.
         */
        function onPrevPage() {
            if (pageNum <= 1) {
                return;
            }
            pageNum--;
            queueRenderPage(pageNum);
        }
        document.getElementById('prev').addEventListener('click', onPrevPage);

        /**
         * Displays next page.
         */
        function onNextPage() {
            if (pageNum >= pdfDoc.numPages) {
                return;
            }
            pageNum++;
            queueRenderPage(pageNum);
        }
        document.getElementById('next').addEventListener('click', onNextPage);

        function pdfjsInit(url) {
            /**
             * Asynchronously downloads PDF.
             */
            PDFJS.getDocument(url).then(function(pdfDoc_) {
                pdfDoc = pdfDoc_;
                document.getElementById('page_count').textContent = pdfDoc.numPages;

                // Initial/first page rendering
                renderPage(pageNum);
            });
        }

        mod.init = function(url) {
            console.log('pdf文件预览');
            pdfjsInit(url);
        };


        return mod;
    })(window.fileOnline || {});
    /**
     * 图像online
     */
    /*图像canvas操作*/
    var canvasOpr = (function(mod) {
        var transX = 0;
        var transY = 0;
        var scaleX = 1;
        var scaleY = 1;
        console.log(transX);
        console.log(transY);
        console.log(scaleX);
        console.log(scaleY);

        mod.init = function(context, image) {

            $('#scale2Big').on('click', function(event) {
                canvasTools.scaleImg(context, image, 2, 2);
            });
            $('#scale2Small').on('click', function(event) {
                canvasTools.scaleImg(context, image, 0.5, 0.5);
            });

            //移动
            $('#toleft').on('click', function(event) {
                canvasTools.transImg(context, image, -10, 0);
            });
            $('#toright').on('click', function(event) {
                canvasTools.transImg(context, image, 10, 0);
            });
            $('#toup').on('click', function(event) {
                canvasTools.transImg(context, image, 0, -10);
            });
            $('#todown').on('click', function(event) {
                canvasTools.transImg(context, image, 0, 10);
            });
            $('#init-image').on('click', function(event) {
                canvasTools.updImg(context, image);
            });
        };

        var canvasTools = {
            //重置
            updImg: function(context, image) {
                // var context = myCanvas.getContext('2d');
                console.log(transX);
                console.log(transY);
                console.log(scaleX);
                console.log(scaleY);
                context.clearRect(0, 0, image.width, image.height);
                context.translate(-transX, -transY);
                transX = 0;
                transY = 0;
                context.scale(1 / scaleX, 1 / scaleY);
                scaleX = 1;
                scaleY = 1;
                context.drawImage(image, 0, 0);
            },
            transImg: function(context, image, x, y) { //平移
                // var context = myCanvas.getContext('2d');
                context.clearRect(0, 0, image.width, image.height);
                context.translate(x, y);
                transX += x;
                transY += y;
                context.drawImage(image, 0, 0);
            },
            scaleImg: function(context, image, x, y) { //放大缩小
                // var context = myCanvas.getContext('2d');
                console.log('scale');
                context.clearRect(0, 0, image.width, image.height);
                context.scale(x, y);

                scaleX = scaleX * x;
                scaleY = scaleY * y;
                context.drawImage(image, 0, 0);
            }
        };


        return mod;
    })(window.canvasOpr || {});
    /**
     * 文本数据的读取
     */
    var textPreview = (function(mod) {

        mod.getText = function(fileName) {
            var host = window.location.host; //"localhost:85"
            /*下载查看  FileServer API*/
            $.ajax({
                    // url: 'http://' + host + '/gecp/fileserver',
                    url: '/gecp/fileserver',
                    type: 'POST',
                    // data: 'req=getzip&fn=upload/'+fileName+'&fn2='+fileName+'.zip'
                    // data: 'req=getfile&fn=upload/' + fileName,
                    data: 'fn=upload/user/' + fileName,
                    success: function(content) {
                        console.log(content);
                        //var blob = new Blob([content], { "type": 'text' }); //HTML 5 API 下载的时候注意type类型
                        //console.log(blob);
                        var textHtml = "<pre class='textResult' id='textResult'></pre>";
                        $('.main-content').html(textHtml);
                        $('#textResult').html(content);
                    }
                })
                .done(function() {
                    console.log("ajax success");
                    // URL.revokeObjectURL(window.objectURL);
                })
                .fail(function() {
                    console.log("ajax error");
                })
                .always(function() {
                    console.log("ajax complete");
                });
        };

        return mod;
    })(window.textPreview || {});
    /************************************************************************************/
    /*根据文件类型进行预览*/
    function previewPage() {
        var cookie = require('../../../common/js/cookie');
        var username = cookie.getCookie('username'); //用户名
        var fileName = decodeURIComponent(location.search.split('&')[1].slice(3));
        // var fileName = location.search.split('&')[1].slice(3);
        console.log(fileName);
        var lastDotInd = fileName.lastIndexOf('.');
        console.log(lastDotInd);
        // var fileType = fileName.slice(-3);
        var fileType = fileName.slice(lastDotInd+1);
        console.log(fileType);
        var filePath = gEcnu.config.geoserver + 'fileserver?req=getfile&fn=upload/user/';
        var fileURL = filePath + fileName;
        console.log(fileURL);
        // $('.main-content').html('<p class="tip-text">浏览器不支持此文件预览，请下载后查阅!</p>');
        switch (fileType) {
            case "pdf":
                fileOnline.init(fileURL);
                break;
            case "txt":
            case "tml":
            case ".js":
                textPreview.getText(fileName);
                break;
            case "jpg":
            case "gif":
            case "png":
                var html = '<canvas id="my-canvas" style="border:1px solid #ccc;"/>' +
                    '<div class="canvasOpr"><button id="init-image" class="btn-primary">原图像</button><button id="toleft" class="btn-primary">左移</button>' +
                    '<button id="toright" class="btn-primary">右移</button><button id="toup" class="btn-primary">上移</button><button id="todown" class="btn-primary">下移</button>' +
                    '<button id="scale2Big" class="btn-primary">放大</button><button id="scale2Small" class="btn-primary">缩小</button></div>';
                $('.main-content').html(html);
    
                var canvas = document.getElementById('my-canvas');
                if (canvas === null) {
                    return false;
                }
                var context = canvas.getContext('2d');
                image = new Image();
                image.src = fileURL;
                console.log(image);
                image.onload = function() {
                    drawImage(canvas, context, image);
                };
                canvasOpr.init(context, image); //canvas操作
                break;
            case "mp3":
            case "mav":
                var audioHtml = '<div class="audio-online">' +
                    '<audio class="audio-div" preload="auto" controls autoplay>' +
                    '您的浏览器不支持音频播放，请使用360浏览器或者火狐、Chrome浏览器。' +
                    '</audio></div>';
                $('.main-content').html(audioHtml);
                $('.audio-div').attr('src', fileURL);
                break;
            case "mp4":
            case "mov":
            case "avi":
            case "mvb":
            case "3gp":
                var videoHtml = '<div class="video-online">' +
                    '<video class="video-div" id="videoDiv" width="100%"  preload="auto" poster="" controls autoplay>' +
                    '您的浏览器不支持视频播放，请使用360浏览器或者火狐、Chrome浏览器' +
                    '</video>' +
                    '</div>';
                $('.main-content').html(videoHtml);
                $('.video-div').attr('src', fileURL);
                break;
            default:
                $('.main-content').html('<p class="tip-text">对不起！浏览器不支持此类型文件预览，请下载后查阅!</p>');

        }
    }
    /**
     * [drawImage 画在画布上]
     * @param  {[type]} canvas  [description]
     * @param  {[type]} context [description]
     * @param  {[type]} image   [image]
     */
    function drawImage(canvas, context, image) {
        var scale = 1;
        var n1 = image.width / scale;
        var n2 = image.height / scale;

        canvas.setAttribute('width', n1);
        canvas.setAttribute('height', n2);
        console.log(n1 + "  " + n2);
        context.drawImage(image, 0, 0, n1, n2, 0, 0, n1, n2);
    }

    module.exports = previewPage;

});
