
//定义一个mixin，可以借助他来实现调试日志记录。可将其应用至任何对象或类
var loggingMixin= {
    //声明一个存储数组，用于存放各条日志记录
    logs: [],
    //定义一个方法，用于存储消息到日志中
    log: function (message) {
        this.logs.push(message);
    },
    //定义一个方法，用于存储所存储的日志
    readLog: function () {
        return this.logs.join(',');
    }
},
    element,
    header,
    textField,
    emailField;
    //定义一个函数，用于将一个对象中的方法和属性应用到另一个对象中，
    //我们将使用该函数来应用mixin至其他对象
    function extendObj(obj1,obj2){
        var obj2Key;
        for(obj2Key in obj2){
            if(obj2.hasOwnProperty(obj2Key)){
                obj1[obj2Key] = obj2[obj2Key];
            }
        }
        return obj1;
    }
//更改extendObj方法来复制基于对象的属性而不是通过引用指向他们
/*function extendObj(obj1,obj2){
    var obj2key,
        value;
    for(obj2key in obj2){
        if(obj2.hasOwnProperty(obj2key)){
            value = obj2[obj2key];
            //如果所复制的是数组，则使用slice()方法来复制该数组的副本
            if(Object.prototype.toString().apply(value)==='[object Array]'){
                obj1[obj2key] = value.slice();
            }else if(typeof obj2[obj2key] ==='object'){
                obj1[obj2key] = extendObj({},value);
            }else{
                obj1[obj2] = value;
            }

        }
    }
}*/
//定义一个单例，我们将应用到mixin于其上
    element={
        allElements:[],
        create:function(type){
            var elem = document.createElement(type);
            this.allElements.push(elem);
            //使用该mixin的log方法，确保该方法存在才调用它。如果该mixin尚未应用，则该方法仍将正常运作
            if(typeof this.log ==='function'){
                this.log('Create an element of type:'+type);
            }
            return elem;
        },
        getAllElements:function(){
            return this.allElements;
        }
    };
//定义一个简单的类，我们将应用该mixin于其上
var Field = function(type,displayText){
  this.type = type;
  this.displayText = displayText;
  if(typeof this.log ==='function'){
        this.log('Create an element of type:'+type);
  }
};

Field.prototype={
    getElement:function(){
        var field = document.createElement('input');
        field.setAttribute('type',this.type);
        field.setAttribute('placeholder',this.displayText);
        if(typeof this.log==='function'){
            this.log('Create a dom element with placeholder text :'+this.displayText);
        }
        return field;
    }
};

//直接应用该mixin至element对象，实质是从该mixin复制个方法和属性至该单例
element = extendObj(element,loggingMixin);
//应用该mixin至Field‘类’的prototype，使得该mixin的方法为每一个从该类实例化的对象所拥有
Field.prototype = extendObj(Field.prototype,loggingMixin);
//使用element.create()方法来创建一个新的dom元素
header = element.create('header');

//创建两个对象实例，两者都从prototype中获得了getElement方法
textField = new Field('text','Enter the first line of your address');
emailField = new Field('email','Enter your address');

//将这些对象中所保存的元素添加至当前页面
document.body.appendChild(textField.getElement());
document.body.appendChild(emailField.getElement());

console.log(loggingMixin.readLog());