
//定义一个包含publish，subscribe和unsubscribe方法的类，来实现中介者模式。注意其与观察者模式的相似之处。他们唯一的
//区别是，这里是创建一个类以供以后创建对象实例使用，同时还会为每个对象实例初始化一个用于存储事件的数组，以避免所有
//实例共享内存中的同一数组

function Mediator(){
    this.events={};
}

Mediator.prototype.subscribe = function(name,callback){
    if(!this.events.hasOwnProperty(name)){
        this.events[name]=[];
    }
    this.events[name].push(callback);
};

Mediator.prototype.unsubscribe = function(name,callback){
    var index= 0,
        length=0;
    if(this.events.hasOwnProperty(name)){
        length = this.events[name].length;
        for(;index<length;index++){
            if(this.events[name][index]===callback){
                this.events[name].splice(index,1);
                break;
            }
        }
    }
};

Mediator.prototype.publish=function(name){
    var data = Array.prototype.slice(arguments,1),
        index= 0,
        length=0;
    if(this.events.hasOwnProperty(name)){
        length = this.events[name].length;
        for(;index<length;index++){
            this.events[name][index].apply(this,data);
        }
    }
};


//为我们的代码库定义2个中介者。一个是编写来辅助实现关于表单的功能的，而另一个是辅助实现日志消息的记录功能的
//formMediator将具备2个事件form-submit和ajax-response；而loggingMediator将具备3个事件log，retrieve-log,log-retrieved
//请注意我们是如何应用中介者模式为不同的功能来划分各个事件的
var formsMediator = new Mediator(),
    loggingMediator = new Mediator();

//定义一个模块，用于ajax通信。当formsMediator发出form-submit事件时
//此模块会把所提供的数据post至服务器
(function(formsMediator){
    function ajaxPost(url,data,callback){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.status===200){
                callback(xhr.responseText);
            }
        };
        xhr.open('post',url);
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xhr.send(data);
    }

    formsMediator.subscribe('form-submit',function (url,data){
        ajaxPost(url,data,function(response){
            formsMediator.publish('ajax-response',response);
        });
    });
}(formsMediator));

//定义一个模块，用于处理当前页面的一个简单表单的提交事宜。此表单只包含有若干只文本表单域，表单ID为my-form，当表单提交时，会在formsMediator
//中发出form-submit事件
(function(formsMediator){
    var form = document.getElementById('my-form'),
        action = form.action,
        data=[],
        fields = form.getElementsByTagName('input'),
        index= 0,
        length = fields.length,
        field,
        thankMessage = document.createElement('p');
    function onFormSubmit(e){
        e.preventDefault();
        for(;index<length;index++){
            field = fields[index];
            data.push(escape(field.name)+'='+escape(field.value));
        }
        formsMediator.publish('form-submit',action,dada.join('&'));
    }

    form.addEventListener('submit',onFormSubmit,false);

    formsMediator.subscribe('ajax-response',function(response){
        thankMessage.innerHTML = "Thank you for your form submission <br> The server responsed with"+response;
        form.parentNode.appendChild(thankMessage);
    });
}(formsMediator));

//定义一个模块，用于记录该系统中的消息，以帮助调试可能出现的问题。使用loggingMediator来分离出代码库的日志记录功能与处理表单提交事宜的formsMediator
//相分离

(function(loggingMediator){
    //创建一个数组，用于存储日志记录
    var logs=[];
    //当loggingMediator发出log事件时，向logs数组添加一个对象数组项。该对象包含着所提供的消息以及接收到该消息的日期/时间
    loggingMediator.subscribe('log',function(message){
        logs.push({
            message:message,
            date:new Date()
        });
    });
    //当loggingMediator发出retrieved-log事件时，这里就发出log-retrieved事件
    //并传入logs数组
    loggingMediator.subscribe('retrieved-log',function(){
        loggingMediator.publish('log-retrieved',logs);
    });
}(loggingMediator));

//定义一个模块，使得在loggingMediator中所保存的日志记录在屏幕中显示出来
(function(loggingMediator){
    //创建一个按钮，单击该按钮时将显示出当前所记录的日志
    var btn = document.createElement('button');
    btn.innerHTML='show logs';
    btn.addEventListener('click',function(){
        //用loggingMediator发出retrieve-log事件。这会触发log-retrieved事件。loggingMediator在发出
        //log-retrieved事件时会传入当前记录的日志
        loggingMediator.publish('retrieved-log');
    },false);
    //当log-retrieved事件出现时，在屏幕上显示日志记录
    loggingMediator.subscribe('log-retrieved',function(logs){
        var index= 0,
            length=logs.length,
            ulTag = document.createElement('ul'),
            liTag = document.createElement('li'),
            listItem;
        //循环遍历日志数组中的每条记录，把所保存的日期时间和消息渲染至一个li标签中
        for(;index<length;index++){
            listItem = liTag.cloneNode(false);
            listItem.innerHTML = logs[index].date.toUTCString()+": "+logs[index].message;
            ulTag.appendChild(listItem);
        }
        //在页面下方添加该包含着所有li标签的表示当前所记录的日志数据的ul标签
        document.body.appendChild(ulTag);
    });

    //把该按钮添加至当前页面底部
    document.body.appendChild(btn);
}(loggingMediator));

//定义一个模块，用于记录formsMediator中发生的事件
(function(formsMediator,loggingMediator){
    //使用loggingMediator的log事件来记录当form-submit事件在formsMediator中发送时表单所提交的URL
    forms.subscribe('form-submit',function(url){
        loggingMediator.publish('log','Form submitted to '+url);
    });
    //当ajax-response事件在formsMediator中发出时，记录参数中所提供的从服务器返回的响应数据
    formsMediator.subscribe('ajax-response',function(response){
        loggingMediator.publish('log','The server responded to an ajax call with :'+response);
    });
}(formsMediator,loggingMediator));