
//������½ӿ����������Ӵ�Ĵ�����У�����ͨ��http����ajax����
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
//���϶����http.makeRequest()�����ɰ����·�ʽ���е��ã��Զ�ϵͳ�е�IDΪ��123456�����û������ݽ��л�ȡ�͸���
http.makeRequest('get','user/12456',function(response){
    alert("HTTP GET response received,User data :"+response);
});
http.makeRequest('post','user/123456',function(response){
    alert("HTTP POST response received. New user data :"+response);
},"company=YUO&name=DEN%90Owe");

//���ڣ�������Ҫ����Ŀ�����ع������������һ���µĽṹ��ʹ�������ռ䣬����makeRequest��������Ϊ���������ķ�������http get��post����
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

//�µ�get()��post()�����ɰ����·�ʽ���е���
myProject.data.ajax.get('user/12345',function(response){
    alert('Refactored HTTP GET response received . User data:'+response);
});
myProject.data.ajax.post('user/2135','company=RT&name=DEN',function(response){
    alert('Refactored HTTP response received . NEW user data:'+response);
});

//Ϊ�˱����ڴ����е����ಿ����дÿһ����http.makeRequest()�����ĵ��ã�����Դ���һ����������ӳ��ɽӿ�
//�����·�������������Ҫʹ������Ҫ�滻����ԭ������ͬ����������������������ڲ������·���
function httpToAjaxAdaptor(type,url,callback,data){
    if(type.toLowerCase()==='get'){
        myProject.data.ajax.get(url,callback);
    }else if(type.toLowerCase()==='post'){
        myProject.data.ajax.post(url,data,callback);
    }
}

//���Ӧ��������������ԭ���ķ���
http.makeRequest=httpToAjaxAdaptor;
//����ԭ������ʹ�÷�ʽʹ�ø��µ�������----���ڲ������������µĴ��룬�����ⲿ��������������ɵ�makeRequest����һ��
http.makeRequest('get','user/12345',function(response){
    alert('Adaptor Http get response received. User data:'+response);
});
http.makeRequest('post','user/12345',function(response){
    alert('Adaptor Http post received.New user data:'+response);
},'company=AKO&name=DEN');
