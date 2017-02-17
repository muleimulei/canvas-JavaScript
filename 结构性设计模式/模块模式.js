
//模块模式综合使用了自执行的匿名函数闭包，作为参数传入的依赖，以及一个可选的return语句，此语句可使得在闭包中
//编写的代码能在外部进行访问

//这里的唯一一项依赖是document对象，在它当中包含有浏览器的cookie数据。作为一项附加的安全措施，我们可以使用
//一个命名为undefined的末位参数，但我们从不会向其中传入值。假如我们确实是不向该参数传入值得，此做法可确保该命名
//为undefined的变量总会包含这值undefined。

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

    //返回一些方法，属性或值，以便在代码库的其余部分进行访问使用，在本例中，return将通过cookie变量暴露以下两个方法
    return {
        get:function(name){
            return cookies[name]||'';
        },
        set:function(name,value){
            cookie[name] = value;
            document.cookie = escape(name)+'='+escape(value);
        }
    };
    //在函数执行的时刻传入所有依赖
}(document));

//使用模块模式增加命名空间
//定义一个命名空间，我们将会把一些代码模块放入此命名空间
var myData={};
//这是Ajax模块，我们通过添加的方式将其加入到myData命名空间
//命名空间是作为参数传入的。一旦该命名空间被加入了新的方法，最后就返回此命名空间，使用此新的，增加了新内容的
//命名空间重写原来的命名空间
myData = (function(myNamespace,undefined){
    //往命名空间加入一个ajax模块，并使用相关方法充实该属性
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
    //我们可以使用以下保障机制，如果该myData命名空间对象尚不存在，则使用一个空对象。当你在一个大的命名空间下使用
    //分散在多个文件下的多个模块，而且你又不确定所传入的命名空间是否在之前的地方已经被初始化时，这种方法很有帮助
}(myData||{}));


//这是cookie模块，我们通过添加的方式将其加入到myData命名空间和之前的一样，把命名空间传进来，增加内容，然后返回，重写原来的
//命名空间对象。
myData = (function(myNamespace,undefined){
    //往命名空间加入一个cookie对象属性，并使用相关方法充实该属性
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