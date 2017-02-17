
//定义一个函数，作为facade来简化和帮助实现跨浏览器的ajax调用，所支持的浏览器可回退至Internet Explore
function ajaxCall(type,url,callback,data){
    //根据当前浏览器获取对ajax连接对象的引用
    var xhr = (function(){
        try{
            //现代浏览器所使用的标准方法
            return new XMLHttpRequest();
        }catch(e){}

        //较老版本的Internet Explorer使用用户机器上安装一个ActIveX对象
        try{
            return new ActiveXObject('Msxml2.XMLHTTP.6.0');
        }catch(e){}

        try{
            return new ActiveXObject('Msxml2.XMLHTTP.3.0');
        }catch(e){}

        try{
            return new ActiveXObject('Microsoft.XMLHTTP');
        }catch(e){}
    }());

    //一旦从服务器收到成功的响应，则执行回调方法
    xhr.onreadystatechange = function(){
        if(xhr.status==200){
            callback(xhr.responseText);
        }
    };

    xhr.open(type,url);
    xhr.send(data);
}


//使用外观模式
ajaxCall('get','user/2313',function(response){
    alert('HTTP GET response received . User data :'+response);
});

ajaxCall('post','user/21354',function(response){
    alert('http post response received.');
},'company=YYU');