
//把相关的属性和方法聚集在一个单独的对象直接量里，我们称之为单例
var element ={

    //保存一个数组，用于存储页面元素的引用
    allElements:[],
    //通过元素的ID获取对该元素的引用并保存它
    get:function(id){
        var elem = document.getElementById(id);
        this.allElements.push(elem);
        return elem;
    },
    //根据给定的类型创建一个新元素，并保存它
    create:function(type){
        var elem = document.createElement(type);
        this.allElements.push(elem);
        return elem;
    },
    //返回所有保存的元素
    getAllElements:function(){
        return this.allElements;
    }
},
    //获取对ID为header的页面元素的引用并进行保存
    //header = element.get('header'),
    //创建一个新的input元素
   // input = element.create('input');

    //alert(element.getAllElements().length);

//定义一个单例，当中包含着与cookie操作相关的方法。初始化代码是通过使用自执行函数闭包实现的
//这使得在创建单例时所执行的代码不是公共性的，不会被应用程序的其余部分访问
cookie = (function(){
    //cookie保存在document.cookie字符串中，由分号进行分割
    var allCookies = document.cookie.split(';'),
        cookies={},
        cookiesIndex= 0,
        cookieLength = allCookies.length,
        cookie;

    //遍历所有的cookie，把他们添加至cookies对象，使用cookie的名称作为属性名称
    for(;cookiesIndex<cookieLength;cookiesIndex++){
        cookie = allCookies[cookiesIndex].split('=');
        cookies[unescape(cookie[0])] = unescape(cookie[1]);
    }

    //这里所返回的方法将可以在本代码清单顶部所定义的全局cookie变量所使用
    return{
        //创建一个函数，以cookie的名称获取其值
        get:function(name){
          return cookies[name] || '';
        },
        //创建一个函数来添加一个新的session cookie
        set:function(name,value){
            cookies[name] = value;
            document.cookie = escape(name)+"="+escape(value);
        }
    }

}());

cookie.set('name','mulei');
cookie.set('age',13);
alert(document.cookie);



//使用单例模式实现命名空间的设置
//使用对象直接量来创建一个层级化分组的各项属性和方法的结构，称作‘命名空间’

var myProject = {
    data:{
        //每个嵌套的属性表示一个新的，更深级的命名空间
        ajax:{
            //创建一个方法来发送ajax get请求
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
//命名空间建立后，使用点号标记法可以增加命名空间
myProject.data.cookie={
    //创建一个方法，可以通过cookie的名称读取cookie的值
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
    //创建一个方法，用于设置cookie的名称和值
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