var cookie = (function(){
    var allCookies = document.cookie.split(';'),
        cookies={},
        cookieIndex = 0,
        cookieLength = allCookies.length,
        cookie;
    for(;cookieIndex<cookieLength;cookieIndex++){
        cookie = allCookies[cookieIndex].split('=');
        cookies[unescape(cookie[0])] = unescape(cookie[1]);
    }

    return{
        get:function(name){
            return cookies[name]||'';
        },
        set:function(name,value){
            cookies[name] = value;
            document.cookie = escape(name)+'='+escape(value);
        },
        remove:function(name){
            //ͨ���ӱ�ʾcookie�Ķ������Ƴ���Ӧ���Ƶ�cookie��ֵ����������ʧЧ����Ϊ��ǰ�������Ƴ�cookie
            delete cookies[name];
            document.cookie = escape(name)+"=;expires=Thu,01 Jan 1970 00:00:01 GMT;";
        },
        //�ṩһ��execute���������ڶ����������ĵ��ý��г����������������������ƾͿ������պ���Ҫʱ���б��
        //���ֲ�Ӱ��������ಿ��ʹ�ø�API
        execute:function(command,params){
            if(this.hasOwnProperty(command)&&typeof this[command] ==='function'){
                return this[command].apply(this,params);
            }
        }
    };
}());

//����һ��������������ִ���������������лس���Щ�����Ĺ���
var command=(function(){
    //����һ�����飬�������δ洢�س��������������ͨ��Ҳ��Ϊջ
    var undoStack = [];
    return{
        //����һ����������ִ�����ṩ�ĵ�һ����������������ڶ��������������Ա��Ժ�Ե�һ�������Ĳ���ִ�л��˲���
        execute:function(command,undoCommand){
            if(command&&typeof command==='function'){
                command();
                undoStack.push(undoCommand);
            }
        },
        //����һ�����������ô洢�س������ջ�������ִ�е�������з�����
        undo:function(){
            //��ջ���Ƴ���������ִ�е����һ����������һ�μ���ջ���Ǹ�������²�������ջ���Ƴ������ʹ������������
            var undo = undoStack.pop();
            if(undo&&typeof undo ==='function'){
                //���������Ƿ�Ϊһ����Ч�ĺ��������ǣ���ִ������ִ�е�Ч��ʵ���ǻس�
                undo();
            }

        }
    };

}());

//��ÿһ��Ŀɱ��س��Ĳ�����װ��command.execute�����ĵ����У�����ִ�е�������Ϊ��һ���������룬�Ը�������з�����
//��ִ�еĺ�����Ϊ��Ϊ�ڶ�����������
command.execute(function(){
    cookie.execute('set',['name','mulei']);
},function(){
    cookie.execute('remove',['name']);
});

command.execute(function(){
    cookie.execute('set',['age',34]);
},function(){
    cookie.execute('remove',['age']);
});

//�������cookie��ֵ
console.log(cookie.get('name'));
console.log(cookie.get('age'));

//����һ�εĲ������з����������Ƴ���Ϊage��cookie
command.undo();

//�������cookie��ֵ
console.log(cookie.get('name'));
console.log(cookie.get('age'));