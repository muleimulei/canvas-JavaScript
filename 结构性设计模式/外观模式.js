
//����һ����������Ϊfacade���򻯺Ͱ���ʵ�ֿ��������ajax���ã���֧�ֵ�������ɻ�����Internet Explore
function ajaxCall(type,url,callback,data){
    //���ݵ�ǰ�������ȡ��ajax���Ӷ��������
    var xhr = (function(){
        try{
            //�ִ��������ʹ�õı�׼����
            return new XMLHttpRequest();
        }catch(e){}

        //���ϰ汾��Internet Explorerʹ���û������ϰ�װһ��ActIveX����
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

    //һ���ӷ������յ��ɹ�����Ӧ����ִ�лص�����
    xhr.onreadystatechange = function(){
        if(xhr.status==200){
            callback(xhr.responseText);
        }
    };

    xhr.open(type,url);
    xhr.send(data);
}


//ʹ�����ģʽ
ajaxCall('get','user/2313',function(response){
    alert('HTTP GET response received . User data :'+response);
});

ajaxCall('post','user/21354',function(response){
    alert('http post response received.');
},'company=YYU');