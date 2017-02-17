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
            //通过从表示cookie的对象中移除相应名称的cookie的值，并设置其失效日期为以前日期来移除cookie
            delete cookies[name];
            document.cookie = escape(name)+"=;expires=Thu,01 Jan 1970 00:00:01 GMT;";
        },
        //提供一个execute方法，用于对其他方法的调用进行抽象，这样，其他方法的名称就可以在日后需要时进行变更
        //但又不影响代码其余部分使用该API
        execute:function(command,params){
            if(this.hasOwnProperty(command)&&typeof this[command] ==='function'){
                return this[command].apply(this,params);
            }
        }
    };
}());

//创建一个单例，他可以执行其他方法并具有回撤这些方法的功能
var command=(function(){
    //创建一个数组，用于依次存储回撤命令。这样的数组通常也成为栈
    var undoStack = [];
    return{
        //定义一个方法，来执行所提供的第一个函数参数，保存第二个函数参数，以便以后对第一个函数的操作执行回退操作
        execute:function(command,undoCommand){
            if(command&&typeof command==='function'){
                command();
                undoStack.push(undoCommand);
            }
        },
        //定义一个方法，利用存储回撤命令的栈来对最后执行的命令进行反操作
        undo:function(){
            //从栈中移除并保存所执行的最后一个命令，及最近一次加入栈的那个命令。以下操作将从栈中移除该命令，使数组项数减少
            var undo = undoStack.pop();
            if(undo&&typeof undo ==='function'){
                //检查该命令是否为一个有效的函数，若是，则执行它，执行的效果实际是回撤
                undo();
            }

        }
    };

}());

//把每一项的可被回撤的操作包装在command.execute方法的调用中，马上执行的命令作为第一个参数传入，对该命令进行反操作
//所执行的函数作为作为第二个参数传入
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

//检查两个cookie的值
console.log(cookie.get('name'));
console.log(cookie.get('age'));

//把上一次的操作进行反操作，即移除名为age的cookie
command.undo();

//检查两个cookie的值
console.log(cookie.get('name'));
console.log(cookie.get('age'));