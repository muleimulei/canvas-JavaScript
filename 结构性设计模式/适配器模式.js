
//设计以下接口深藏在你的庞大的代码库中，用于通过http发出ajax请求
var http={
    makeRequest:function (type,url,callback,data){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.status==200){
                callback(xhr.responseText);
            }
        };
        xhr.open(type.toUpperCase(),url);
        xhr.send(data);
    }
};
//以上定义的http.makeRequest()方法可按如下方式进行调用，以对系统中的ID为“123456”的用户的数据进行获取和更新
http.makeRequest('get','user/12456',function(response){
    alert("HTTP GET response received,User data :"+response);
});
http.makeRequest('post','user/123456',function(response){
    alert("HTTP POST response received. New user data :"+response);
},"company=YUO&name=DEN%90Owe");

//现在，假设你要对项目进行重构，你决定引入一个新的结构，使用命名空间，并把makeRequest方法划分为两个独立的方法发出http get和post请求
var myProject={
    data:{
        ajax:(function(){
            function createRequestObj(callback){
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange=function(){
                    if(xhr.status==200){
                        callback(xhr.responseText);
                    }
                };
                return xhr;
            }

            return{
                get:function (url,callback){
                    var obj = createRequestObj(callback);
                    obj.open('get',url);
                    obj.send();
                },
                post:function(url,data,callback){
                  var obj = createRequestObj(callback);
                    obj.open('post',url);
                    obj.send(data);
                }
            };
        }())
    }
};

//新的get()和post()方法可按如下方式进行调用
myProject.data.ajax.get('user/12345',function(response){
    alert('Refactored HTTP GET response received . User data:'+response);
});
myProject.data.ajax.post('user/2135','company=RT&name=DEN',function(response){
    alert('Refactored HTTP response received . NEW user data:'+response);
});

//为了避免在代码中的其余部分重写每一个对http.makeRequest()方法的调用，你可以创建一个适配器来映射旧接口
//至该新方法。适配器需要使用与所要替换掉的原方法相同的输入参数，并在适配器内部调用新方法
function httpToAjaxAdaptor(type,url,callback,data){
    if(type.toLowerCase()==='get'){
        myProject.data.ajax.get(url,callback);
    }else if(type.toLowerCase()==='post'){
        myProject.data.ajax.post(url,data,callback);
    }
}

//最后，应用适配器来代替原来的方法
http.makeRequest=httpToAjaxAdaptor;
//按照原方法的使用方式使用盖新的适配器----在内部，他将调用新的代码，但在外部，它看起来又与旧的makeRequest方法一样
http.makeRequest('get','user/12345',function(response){
    alert('Adaptor Http get response received. User data:'+response);
});
http.makeRequest('post','user/12345',function(response){
    alert('Adaptor Http post received.New user data:'+response);
},'company=AKO&name=DEN');
