
//����һ������publish��subscribe��unsubscribe�������࣬��ʵ���н���ģʽ��ע������۲���ģʽ������֮��������Ψһ��
//�����ǣ������Ǵ���һ�����Թ��Ժ󴴽�����ʵ��ʹ�ã�ͬʱ����Ϊÿ������ʵ����ʼ��һ�����ڴ洢�¼������飬�Ա�������
//ʵ�������ڴ��е�ͬһ����

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


//Ϊ���ǵĴ���ⶨ��2���н��ߡ�һ���Ǳ�д������ʵ�ֹ��ڱ��Ĺ��ܵģ�����һ���Ǹ���ʵ����־��Ϣ�ļ�¼���ܵ�
//formMediator���߱�2���¼�form-submit��ajax-response����loggingMediator���߱�3���¼�log��retrieve-log,log-retrieved
//��ע�����������Ӧ���н���ģʽΪ��ͬ�Ĺ��������ָ����¼���
var formsMediator = new Mediator(),
    loggingMediator = new Mediator();

//����һ��ģ�飬����ajaxͨ�š���formsMediator����form-submit�¼�ʱ
//��ģ�������ṩ������post��������
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

//����һ��ģ�飬���ڴ���ǰҳ���һ���򵥱����ύ���ˡ��˱�ֻ����������ֻ�ı����򣬱�IDΪmy-form�������ύʱ������formsMediator
//�з���form-submit�¼�
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

//����һ��ģ�飬���ڼ�¼��ϵͳ�е���Ϣ���԰������Կ��ܳ��ֵ����⡣ʹ��loggingMediator���������������־��¼�����봦����ύ���˵�formsMediator
//�����

(function(loggingMediator){
    //����һ�����飬���ڴ洢��־��¼
    var logs=[];
    //��loggingMediator����log�¼�ʱ����logs�������һ������������ö�����������ṩ����Ϣ�Լ����յ�����Ϣ������/ʱ��
    loggingMediator.subscribe('log',function(message){
        logs.push({
            message:message,
            date:new Date()
        });
    });
    //��loggingMediator����retrieved-log�¼�ʱ������ͷ���log-retrieved�¼�
    //������logs����
    loggingMediator.subscribe('retrieved-log',function(){
        loggingMediator.publish('log-retrieved',logs);
    });
}(loggingMediator));

//����һ��ģ�飬ʹ����loggingMediator�����������־��¼����Ļ����ʾ����
(function(loggingMediator){
    //����һ����ť�������ð�ťʱ����ʾ����ǰ����¼����־
    var btn = document.createElement('button');
    btn.innerHTML='show logs';
    btn.addEventListener('click',function(){
        //��loggingMediator����retrieve-log�¼�����ᴥ��log-retrieved�¼���loggingMediator�ڷ���
        //log-retrieved�¼�ʱ�ᴫ�뵱ǰ��¼����־
        loggingMediator.publish('retrieved-log');
    },false);
    //��log-retrieved�¼�����ʱ������Ļ����ʾ��־��¼
    loggingMediator.subscribe('log-retrieved',function(logs){
        var index= 0,
            length=logs.length,
            ulTag = document.createElement('ul'),
            liTag = document.createElement('li'),
            listItem;
        //ѭ��������־�����е�ÿ����¼���������������ʱ�����Ϣ��Ⱦ��һ��li��ǩ��
        for(;index<length;index++){
            listItem = liTag.cloneNode(false);
            listItem.innerHTML = logs[index].date.toUTCString()+": "+logs[index].message;
            ulTag.appendChild(listItem);
        }
        //��ҳ���·���Ӹð���������li��ǩ�ı�ʾ��ǰ����¼����־���ݵ�ul��ǩ
        document.body.appendChild(ulTag);
    });

    //�Ѹð�ť�������ǰҳ��ײ�
    document.body.appendChild(btn);
}(loggingMediator));

//����һ��ģ�飬���ڼ�¼formsMediator�з������¼�
(function(formsMediator,loggingMediator){
    //ʹ��loggingMediator��log�¼�����¼��form-submit�¼���formsMediator�з���ʱ�����ύ��URL
    forms.subscribe('form-submit',function(url){
        loggingMediator.publish('log','Form submitted to '+url);
    });
    //��ajax-response�¼���formsMediator�з���ʱ����¼���������ṩ�Ĵӷ��������ص���Ӧ����
    formsMediator.subscribe('ajax-response',function(response){
        loggingMediator.publish('log','The server responded to an ajax call with :'+response);
    });
}(formsMediator,loggingMediator));