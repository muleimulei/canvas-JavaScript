//����һ������ȫ�ַ���publish��subscribe,unsubscribe�Ķ�������ʵ�ֹ۲���ģʽ

var observer = (function(){
    //����һ���������ڰ��¼����Ʊ�����ע����¼��Լ��͸��¼�������ĸ����ص��������Ա���ȫ������е����ⲿ��ʹ����Щ����
    var events={};
    return{
        //subscribe���������ڱ���һ�������Լ��͸ú�����������¼����ơ��Ժ�ĳ��ʱ�̣��������ƶ�Ӧ���ض��¼�����ʱ�����øú���
        subscribe:function(eventName,callback){
            //������ṩ�����ƶ�Ӧ���¼���û�б����ģ�����events���������һ�����ԣ������Ե���������Ϊ���飬�����Ե�
            //����Ϊ���¼������ơ��Դ��������������Ժ�����Ƶ��¼�����ʱ����Ҫ���õĺ���
            if(!events.hasOwnProperty(eventName)){
                events[eventName]=[];
            }
            //�������ṩ�Ļص�����������ù������ض��¼����Ƶ�������
            events[eventName].push(callback);
        },
        //����unscribe���������ڴӺ����������Ƴ�һ�������ĺ���
        unsubscribe:function(eventName,callback){
            var index= 0,
                length=0;
            if(events.hasOwnProperty(eventName)){
                length = events[eventName].length;
                //���ݸ������¼����ƣ�ѭ���������Ӧ�������б���ĸ������������Ӹ��������Ƴ������ṩ�ĺ�����ƥ��ĺ���
                for(;index<length;index++){
                    if(events[eventName][index]===callback){
                        events[eventName].splice(index,1);
                        break;
                    }
                }
            }
        },
        //����publish��������������ִ�����е���������¼�������ص����к��������ݸ���Щ�����Ĳ���������ͬ�����������ݣ�������
        //����Ϊpublish�Ĳ��������
        publish:function(eventName){
            //���˵�һ���������ѵ���publish����ʱ��������в�������Ϊһ������
            var data = Array.prototype.slice(arguments,1),
                index= 0,
                length=0;
            if(events.hasOwnProperty(eventName)){
                length = events[eventName].length;
                //���ݸ������¼����ƣ�ѭ���������Ӧ��������������ĸ���������������ִ����Щ���������������ṩ�Ĳ�����Ϊ��Щ�����Ĳ���
                for(;index<length;index++){
                    events[eventName][index].apply(this,data);
                }
            }
        }
    };
}());

//ʹ�ù۲���ģʽ������һ��ģ�飬����ajaxͨ�ţ���ģ���������observer����
(function(observer){
    //����һ�����������ڽ���ajax post����ִ�е�post�������ṩ��URL��form-encoded�������ַ������Լ�һ���ص�����
    //һ���ӷ������ɹ����յ���Ӧ���ݾ�ִ�лص�����
    function ajaxPost(url,data,callback){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.status===200){
                callback(xhr.responseText);
            }
        };
        xhr.open('post',url);
        //֪ͨ�����������ǽ����ͱ���������ݣ������е����ƺ�ֵͨ��=�Ž��зָ�����ÿ��������/ֵ����ͨ�����ţ�&�����зָ�
        xhr.setRequestHeader('Content-type',"application/x-www-form-urlencoded");
        //�������post����
        xhr.send(data);
    }
    //����ȫ�ֵģ��Զ����form-submit�¼��������¼��ɴ�����е�����ģ�鷢��ʱ��ʹ�����ṩ��URL������������һ��ajax
    //post ������ɺ󣬷���ajax-response�¼������Ѵ˴�ajax���ôӷ��������õ�����Ӧ���ݴ���
    observer.subscribe('form-submit',function(url,data){
        ajaxPost(url,data,function(response){
            //����ȫ���¼�ajax-response����ajax post �ڼ�ӷ��������õ��ķ������ݴ���
            observer.publish('ajax-response',response);
        });
    });
}(observer));

//����һ��ģ�飬���ڴ���ҳ���е�һ���򵥱����ύ���ˣ��˱��������ɸ��ı����򣬱���ID��my-form���������嵥�е�
//����ģ�鶼û���г��ԶԷ������ã�����ֻ�����ù۲��߶��󡣹۲��߶�������ϵͳ��ģ��֮���������ϵ��ÿ��ģ��ɱ���Ϊ
//����ϣ���Ϊ���ǲ�û�ж��κ�����ģ���Ӳ��������
(function(observer){
    //��ȡ�Ե�ǰHTMLҳ����IDΪmy-form��������
    var form = document.getElementById('my-form'),
         //�Ӹñ��л�ȡaction��ǩ���Ե�ֵ���⽫������ʵʩajax post ָ���URL
        action = form.action,
        data=[],
        //��ȡ�Ա��е�����input���������
        fields = form.getElementsByTagName('input'),
        index= 0,
        length = field.length,
        field,
        //����һ��p��ǩ�������ڱ����ύ��������ʾ��л��Ϣ
        thankMessage = document.createElement('p');
    //����һ���������ڱ��ύʱִ�д˺������˺���ʹ�ù۲���ģʽ��ͨ��ajax�ķ�ʽ�ύ���������
    function onFormSubmit(e){
        //��ֹ�ύ�¼���Ĭ����Ϊ������ζ�ų����ҳ����HTML���ύ�����ᷢ��
        e.preventDefault();
        //ѭ���������е�input��ǩ���ѱ��������������ת��Ϊһ��������/ֵ������ɵ�����
        for(;index<length;index++){
            field = fields[index];
            data.push(escape(field.name)+'='+escape(field.value));
        }
        observer.publish('form-submit',action,data.join('&'));
    }
    //��onFormSubmit��������������submit�¼�
    form.addEventListener('submit',onFormSubmit,false);
    //����ȫ�ֵģ��Զ����ajax-response�¼�����ʹ����ͬ���¼������ķ�������Ӧ����������л��Ϣ
    observer.subscribe('ajax-response',function(response){
        thankYouMessage.innerHTML = 'Thank you for your form submission .<br>The server responded with'+response;
        form.parentNode.appendChild(thankMessage);
    });
}(observer));