//定义一个包含全局方法publish，subscribe,unsubscribe的对象，用于实现观察者模式

var observer = (function(){
    //定义一个对象，用于按事件名称保存所注册的事件以及和该事件相关联的各个回调函数，以便在全代码库中的任意部分使用这些函数
    var events={};
    return{
        //subscribe方法，用于保存一个函数以及和该函数相关联的事件名称。稍后某个时刻，当此名称对应的特定事件发出时，调用该函数
        subscribe:function(eventName,callback){
            //如果所提供的名称对应的事件还没有被订阅，则在events对象中添加一个属性，该属性的数据类型为数组，该属性的
            //名称为该事件的名称。以此属性来保存在稍后该名称的事件发出时所需要调用的函数
            if(!events.hasOwnProperty(eventName)){
                events[eventName]=[];
            }
            //把所有提供的回调函数添加至该关联着特定事件名称的数组中
            events[eventName].push(callback);
        },
        //定义unscribe函数，用于从函数数组中移除一个给定的函数
        unsubscribe:function(eventName,callback){
            var index= 0,
                length=0;
            if(events.hasOwnProperty(eventName)){
                length = events[eventName].length;
                //根据给定的事件名称，循环遍历其对应的数组中保存的各个函数，并从该数组中移除与所提供的函数相匹配的函数
                for(;index<length;index++){
                    if(events[eventName][index]===callback){
                        events[eventName].splice(index,1);
                        break;
                    }
                }
            }
        },
        //定义publish方法，用于依次执行所有的与给定的事件名称相关的所有函数。传递给这些函数的参数都是相同的任意项数据，此数据
        //是作为publish的参数传入的
        publish:function(eventName){
            //除了第一个参数，把调用publish函数时传入的所有参数保存为一个数组
            var data = Array.prototype.slice(arguments,1),
                index= 0,
                length=0;
            if(events.hasOwnProperty(eventName)){
                length = events[eventName].length;
                //根据给定的事件名称，循环遍历其对应的数组中所保存的各个函数，并依次执行这些函数，传入所有提供的参数作为这些函数的参数
                for(;index<length;index++){
                    events[eventName][index].apply(this,data);
                }
            }
        }
    };
}());

//使用观察者模式，定义一个模块，用于ajax通信，此模块的依赖是observer对象
(function(observer){
    //定义一个函数，用于进行ajax post，所执行的post基于所提供的URL，form-encoded的数据字符串，以及一个回调函数
    //一旦从服务器成功接收到响应数据就执行回调函数
    function ajaxPost(url,data,callback){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.status===200){
                callback(xhr.responseText);
            }
        };
        xhr.open('post',url);
        //通知服务器，我们将发送表单编码的数据，这其中的名称和值通过=号进行分隔，而每个“名称/值”对通过符号（&）进行分隔
        xhr.setRequestHeader('Content-type',"application/x-www-form-urlencoded");
        //向服务器post数据
        xhr.send(data);
    }
    //订阅全局的，自定义的form-submit事件。当该事件由代码库中的其他模块发出时，使用所提供的URL和数据来发出一个ajax
    //post 请求。完成后，发出ajax-response事件，并把此次ajax调用从服务器所得到的响应数据传入
    observer.subscribe('form-submit',function(url,data){
        ajaxPost(url,data,function(response){
            //发出全局事件ajax-response，把ajax post 期间从服务器所得到的返回数据传入
            observer.publish('ajax-response',response);
        });
    });
}(observer));

//定义一个模块，用于处理页面中的一个简单表单的提交事宜，此表单含有若干个文本表单域，表单的ID是my-form。本代码清单中的
//两个模块都没有列出对对方的引用，他们只是引用观察者对象。观察者对象负责处理系统中模块之间的所有联系。每个模块可被称为
//松耦合，因为他们并没有对任何其他模块的硬编码依赖
(function(observer){
    //获取对当前HTML页面中ID为my-form表单的引用
    var form = document.getElementById('my-form'),
         //从该表单中获取action标签特性的值，这将是我们实施ajax post 指向的URL
        action = form.action,
        data=[],
        //获取对表单中的所有input表单域的引用
        fields = form.getElementsByTagName('input'),
        index= 0,
        length = field.length,
        field,
        //创建一个p标签，用作在表单的提交发生后显示感谢信息
        thankMessage = document.createElement('p');
    //定义一个函数，在表单提交时执行此函数。此函数使用观察者模式来通过ajax的方式提交表单域的数据
    function onFormSubmit(e){
        //阻止提交事件的默认行为，这意味着常规的页面内HTML表单提交将不会发生
        e.preventDefault();
        //循环遍历表单中的input标签，把表单中所输入的数据转化为一个由名称/值对所组成的数组
        for(;index<length;index++){
            field = fields[index];
            data.push(escape(field.name)+'='+escape(field.value));
        }
        observer.publish('form-submit',action,data.join('&'));
    }
    //把onFormSubmit函数关联至表单的submit事件
    form.addEventListener('submit',onFormSubmit,false);
    //订阅全局的，自定义的ajax-response事件，并使用随同该事件传来的服务器响应数据来填充感谢信息
    observer.subscribe('ajax-response',function(response){
        thankYouMessage.innerHTML = 'Thank you for your form submission .<br>The server responded with'+response;
        form.parentNode.appendChild(thankMessage);
    });
}(observer));