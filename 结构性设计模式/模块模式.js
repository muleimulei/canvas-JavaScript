
//ģ��ģʽ�ۺ�ʹ������ִ�е����������հ�����Ϊ����������������Լ�һ����ѡ��return��䣬������ʹ���ڱհ���
//��д�Ĵ��������ⲿ���з���

//�����Ψһһ��������document�����������а������������cookie���ݡ���Ϊһ��ӵİ�ȫ��ʩ�����ǿ���ʹ��
//һ������Ϊundefined��ĩλ�����������ǴӲ��������д���ֵ����������ȷʵ�ǲ���ò�������ֵ�ã���������ȷ��������
//Ϊundefined�ı����ܻ������ֵundefined��

var cookie=(function(document,undefined){
    var allCookies = document.cookie.split(';'),
        cookies={},
        cookiesIndex= 0,
        cookieLength = allCookies.length,
        cookie;
    for(;cookiesIndex<cookieLength;cookiesIndex++){
        cookie = allCookies[cookiesIndex].split('=');
        cookies[unescape(cookie[0])] = escape(cookie[1]);
    }

    //����һЩ���������Ի�ֵ���Ա��ڴ��������ಿ�ֽ��з���ʹ�ã��ڱ����У�return��ͨ��cookie������¶������������
    return {
        get:function(name){
            return cookies[name]||'';
        },
        set:function(name,value){
            cookie[name] = value;
            document.cookie = escape(name)+'='+escape(value);
        }
    };
    //�ں���ִ�е�ʱ�̴�����������
}(document));

//ʹ��ģ��ģʽ���������ռ�
//����һ�������ռ䣬���ǽ����һЩ����ģ�����������ռ�
var myData={};
//����Ajaxģ�飬����ͨ����ӵķ�ʽ������뵽myData�����ռ�
//�����ռ�����Ϊ��������ġ�һ���������ռ䱻�������µķ��������ͷ��ش������ռ䣬ʹ�ô��µģ������������ݵ�
//�����ռ���дԭ���������ռ�
myData = (function(myNamespace,undefined){
    //�������ռ����һ��ajaxģ�飬��ʹ����ط�����ʵ������
    myNamespace.ajax = {
        get:function(url,callback){
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange=function(){
                if(xhr.status==200){
                    callback(xhr.responseText);
                }
            };
            xhr.open('get',url);
            xhr.send();
        }
    };
    return myNamespace;
    //���ǿ���ʹ�����±��ϻ��ƣ������myData�����ռ�����в����ڣ���ʹ��һ���ն��󡣵�����һ����������ռ���ʹ��
    //��ɢ�ڶ���ļ��µĶ��ģ�飬�������ֲ�ȷ��������������ռ��Ƿ���֮ǰ�ĵط��Ѿ�����ʼ��ʱ�����ַ������а���
}(myData||{}));


//����cookieģ�飬����ͨ����ӵķ�ʽ������뵽myData�����ռ��֮ǰ��һ�����������ռ䴫�������������ݣ�Ȼ�󷵻أ���дԭ����
//�����ռ����
myData = (function(myNamespace,undefined){
    //�������ռ����һ��cookie�������ԣ���ʹ����ط�����ʵ������
    myNamespace.cookies={
        get:function(name){
            var output='',
                escapeName = escape(name),
                start = document.cookie.indexOf(escapeName+'='),
                end = document.cookie.indexOf(';',start);
            end = (end==-1)?(document.cookie.length-1):end;
            if(start>0){
                output = document.cookie.substring(start+escapeName.length+1,end);
            }
            return unescape(output);
        },
        set:function(name,value){
            document.cookie = escape(name)+'='+escape(value);
        }
    };
    return myNamespace;
}(myData||{}));

myData.cookies.set('name','mulei');
myData.cookies.set('age',345);