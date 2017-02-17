
//����ص����Ժͷ����ۼ���һ�������Ķ���ֱ��������ǳ�֮Ϊ����
var element ={

    //����һ�����飬���ڴ洢ҳ��Ԫ�ص�����
    allElements:[],
    //ͨ��Ԫ�ص�ID��ȡ�Ը�Ԫ�ص����ò�������
    get:function(id){
        var elem = document.getElementById(id);
        this.allElements.push(elem);
        return elem;
    },
    //���ݸ��������ʹ���һ����Ԫ�أ���������
    create:function(type){
        var elem = document.createElement(type);
        this.allElements.push(elem);
        return elem;
    },
    //�������б����Ԫ��
    getAllElements:function(){
        return this.allElements;
    }
},
    //��ȡ��IDΪheader��ҳ��Ԫ�ص����ò����б���
    //header = element.get('header'),
    //����һ���µ�inputԪ��
   // input = element.create('input');

    //alert(element.getAllElements().length);

//����һ�����������а�������cookie������صķ�������ʼ��������ͨ��ʹ����ִ�к����հ�ʵ�ֵ�
//��ʹ���ڴ�������ʱ��ִ�еĴ��벻�ǹ����Եģ����ᱻӦ�ó�������ಿ�ַ���
cookie = (function(){
    //cookie������document.cookie�ַ����У��ɷֺŽ��зָ�
    var allCookies = document.cookie.split(';'),
        cookies={},
        cookiesIndex= 0,
        cookieLength = allCookies.length,
        cookie;

    //�������е�cookie�������������cookies����ʹ��cookie��������Ϊ��������
    for(;cookiesIndex<cookieLength;cookiesIndex++){
        cookie = allCookies[cookiesIndex].split('=');
        cookies[unescape(cookie[0])] = unescape(cookie[1]);
    }

    //���������صķ����������ڱ������嵥�����������ȫ��cookie������ʹ��
    return{
        //����һ����������cookie�����ƻ�ȡ��ֵ
        get:function(name){
          return cookies[name] || '';
        },
        //����һ�����������һ���µ�session cookie
        set:function(name,value){
            cookies[name] = value;
            document.cookie = escape(name)+"="+escape(value);
        }
    }

}());

cookie.set('name','mulei');
cookie.set('age',13);
alert(document.cookie);



//ʹ�õ���ģʽʵ�������ռ������
//ʹ�ö���ֱ����������һ���㼶������ĸ������Ժͷ����Ľṹ�������������ռ䡯

var myProject = {
    data:{
        //ÿ��Ƕ�׵����Ա�ʾһ���µģ�����������ռ�
        ajax:{
            //����һ������������ajax get����
            get:function(url,callback){
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange=function(){
                    if(xhr.readyState===4&&xhr.status===200){
                        callback(xhr.responseText);
                    }
                };
                xhr.open('get',url);
                xhr.send(null);
            }
        }
    }
};
//�����ռ佨����ʹ�õ�ű�Ƿ��������������ռ�
myProject.data.cookie={
    //����һ������������ͨ��cookie�����ƶ�ȡcookie��ֵ
    get:function(name){
        var output = '',
            escapeName = escape(name),
            start = document.cookie.indexOf(escapeName+'='),
            end = document.cookie.indexOf(';',start);
        end = end===-1?(document.cookie.length):end;
        if(start>=0){
            output = document.cookie.substring(start+escapeName.length+1,end);
        }
        return unescape(output);
    },
    //����һ����������������cookie�����ƺ�ֵ
    set:function(name,value){
        document.cookie = escape(name)+"="+escape(value);
    }
};

myproject.data.ajax.get('/user/123456',function(response){
    alert("HTTP GET response received,User data :"+response);
});

myProject.data.cookie.set('company','AKQA');
myProject.data.cookie.set('name','DEN odell');

alert(myProject.data.cookie.get('company'));
alert(myProject.data.cookie.get('name'));