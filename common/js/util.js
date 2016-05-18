


//加载子模块：加载相应文件夹下的同名html、css
//传入override//callback
/**
 * [loadModules 加载子模块]
 * @param  {[String]}   eleId      [子模块存放位置的Id号]
 * @param  {[String]}   moduleName [子模块名称]
 * @param  {[Boolean]}   override   [是否覆盖]
 * @param  {Function} callback   [回掉函数]
 * @return {[type]}              [description]
 */
function loadModules(eleId,moduleName,override,callback){
	var htmlPath='modules/'+moduleName+"/"+moduleName+".html";
	var cssPath='modules/'+moduleName+"/"+moduleName+".css";
	//var jsPath='modules/'+moduleName+"/"+moduleName+".js";
	var bCover=arguments.length>2 ? arguments[2] :true;  //默认覆盖html
	// var callOrBool=arguments.length>2 ? arguments[2];
	loadFile(htmlPath,function (data){
		if(bCover){
			$("#"+eleId).html(data);  //覆盖
		}else{
			$("#"+eleId).append(data);  //追加
		}
		if(callback){
			callback();
		}
		
	});
	if(!isExisted('css',cssPath)){
		var link=document.createElement('link');
		link.rel='stylesheet';
		link.href=cssPath;
		document.getElementsByTagName('head')[0].appendChild(link);
	}
	
}
//请求相应的文件
function loadFile(requrl,callback){
	var succ=arguments.length>1 ? arguments[1] :function (){};
	$.ajax({
		type:'POST',
		url:requrl,
		async:true,   //同步加载
		success:function (data){
			succ(data);
		}
	});

}
//判断是否加载过js、css文件
function isExisted(type,src){
	var flag;
	switch(type){
		case "js":
		flag=isExistScript(src); 
		break;
		case "css":
		flag=isExistCss(src); 
		break;
	}
	return flag;
}
function isExistScript(src){ 
	var scripts=document.getElementsByTagName('script');
	if(scripts==undefined){ return false;}
    for(var j=0,len=scripts.length;j<len;j++){ //注：返回的src含有域名  绝对路径
    	var tmpSrc=node.hasAttribute ? // non-IE6/7
      		node.src :node.getAttribute("src", 4); // see http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
      
    	var flag=matchStr(src,tmpSrc); 
    	if(flag){
    		return true;
    	}

    }
    return false;
}
function isExistCss(url){
	var links=document.getElementsByTagName('link');
	for(var i=0,len=links.length;i<len;i++){
		var source=links[i].href;
		var flag=matchStr(url,source);
		if(flag){
			return true;
		}
	}
	return false;
}
//字符串匹配：targetStr待匹配字符串   
function matchStr(targetStr,totalStr){
	var reg=new RegExp(targetStr,'gi');
      if(reg.test(totalStr)){
        return true;
      }else{
      	return false;
      }
}
// 功能: 1)去除字符串前后所有空格 
// 2)去除字符串中所有空格(包括中间空格,需要设置第2个参数为:g) 
function Trim(str,is_global) { 
var result; 
result = str.replace(/(^\s+)|(\s+$)/g,""); 
if(is_global){
  if(is_global.toLowerCase()=="g") 
  result = result.replace(/\s/g,""); 
}
return result; 
} 

function ifctrl(e){ //函数:判断键盘Ctrl按键
     var nav4 = window.Event ? true : false; //初始化变量
     if(nav4) { //对于Netscape浏览器
       //判断是否按下Ctrl按键
       if((typeof e.ctrlKey != 'undefined') ? e.ctrlKey : e.modifiers & Event.CONTROL_MASK > 0) { 
         return true;
       } else {
          return false;
       }
     } else {
       //对于IE浏览器，判断是否按下Ctrl按键
       if(window.event.ctrlKey) {
           return true;
       } else {
           return false;
       }
     }
     return false;
 }
 function ifshift(e){ //函数:判断键盘Shift按键
   var nav4 = window.Event ? true : false; //初始化变量
   if(nav4) { //对于Netscape浏览器
     //判断是否按下Ctrl按键
     if((typeof e.shiftKey != 'undefined') ? e.shiftKey : e.modifiers & Event.SHIFT_MASK > 0) { 
       return true;
     } else {
        return false;
     }
   } else {
     //对于IE浏览器，判断是否按下Ctrl按键
     if(window.event.shiftKey) {
         return true;
     } else {
         return false;
     }
   }
   return false;
 }
 //阻止默认行为
 function stopDefaultAction(e){
 	if(e && e.preventDefault){
 		e.preventDefault();
 	}else{
 		window.event.returnValue = false;
 	}
 }
 /**
 * 拖动元素
 * @param  {[type]} divId      要拖动的元素的id
 * @param  {[type]} dragzoneId 拖动区域的id
 */
function dragDiv(divId,dragzoneId){
  var odiv=document.getElementById(divId);
  if(!odiv){ return;}
  var dragZone=document.getElementById(dragzoneId);
  dragZone.style.cursor='move';

  var odivWid_Px=odiv.currentStyle ? odiv.currentStyle['width'] : document.defaultView.getComputedStyle(odiv, null)['width'];
  var odivheignt_Px=odiv.currentStyle ? odiv.currentStyle['height'] : document.defaultView.getComputedStyle(odiv, null)['height'];
  var odivWid=odivWid_Px.substring(0,odivWid_Px.length-2);
  var odivh=odivheignt_Px.substring(0,odivheignt_Px.length-2);
  dragZone.onmousedown=function (e){  
    var dltx=e.clientX-odiv.offsetLeft;
    var dlty=e.clientY-odiv.offsetTop;
    document.onmousemove=function (e){  //绑定到document上
      var left=e.clientX-dltx;
      var top=e.clientY-dlty;
      // if(left<0){
      //  left=0;
      // }else if(left>document.body.clientWidth-odivWid){  
      //   left=document.body.clientWidth-odivWid;
      //  }

      // if(top<0){
      //   top=0;
      // }else if(top>document.body.clientHeight-odivh){
      //   top=document.body.clientHeight-odivh;
      // }

        odiv.style.left=left+'px';
        odiv.style.top=top+'px';
    };
    document.onmouseup=function (e){
      document.onmousemove=null;
      document.onmouseup=null;
    };
  };
}
/**
 * 获取按键的值
 */
function getKeyCode(evt){
  var keyCode = evt.keyCode ? evt.keyCode 
    : evt.which ? evt.which : evt.charCode;
    return keyCode;
}
/**
 * 显示“加载中”的动画效果
 * @return {[type]} [description]
 */
  function showLoading(){ 
  var loadingDiv = document.getElementById('_loadingDiv');
  if(loadingDiv){
    loadingDiv.style.display= 'block';
    //document.body.removeChild(loadingDiv);
    return;
  }
  var odiv = document.createElement('div');
  // var img = new Image();
  // img.src = gEcnu.config.imgPath+'wait.gif';
  // odiv.id = '_loadingDiv';
  // odiv.style.position = 'absolute';
  // odiv.style.top = '50%';
  // odiv.style.left = '45%';
  // odiv.style.width = '100px';
  // odiv.style.height = '100px';
  // odiv.style.zIndex = '99999';
  // odiv.appendChild(img);
  
  odiv.id = '_loadingDiv';
  odiv.style.position = 'absolute';
  odiv.style.top = '50%';
  odiv.style.left = '45%';
  odiv.style.width = '200px';
  odiv.style.height = '40px';
  odiv.style.zIndex = '99999';
  odiv.style.lineHeight = '40px';
  odiv.style.backgroundColor = '#757575';
  odiv.style.borderRadius = '20px';
   
  odiv.style.color = '#fff';
  odiv.style.textAlign = 'center';
  odiv.style.fontFamily = 'Microsoft YaHei';
  odiv.style.fontSize = '15px';
  odiv.style.letterSpacing = '1px';
  odiv.innerHTML = '数据加载中...';
  document.body.appendChild(odiv);
}
/**
 * 隐藏“加载中”的动画效果
 * @return {[type]} [description]
 */
function hideLoading(){ 
  var odiv = document.getElementById('_loadingDiv');
  if(odiv){
    odiv.style.display= 'none';
    //document.body.removeChild(odiv);
  }
}
 /**
  * 判断是否加载过该iframe
  * @param  {[type]}  subType 取值datamgr tablemgr thmmap model api
  */
  function isLoadSubpage(subType){
    var str = localStorage.getItem('subpage'); 
    if(str ==null){
      var pageRecord = {};
      pageRecord[subType] = 'loaded';
      localStorage.setItem('subpage',JSON.stringify(pageRecord)); 
      return false;
    }else{
      var json = JSON.parse(str);
      if(json[subType]=='loaded'){
        return true;
      }else{
        json[subType] = 'loaded';
        localStorage.setItem('subpage',JSON.stringify(json));
        return false;
      }
    }
  }