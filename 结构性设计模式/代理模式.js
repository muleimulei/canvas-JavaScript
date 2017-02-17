/*
var myData={};
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
//为了对代码清单6-13中的myData.cookies.get()方法实现代理，我们先把当前方法保存在一个变量中
var proxiedGet = myData.cookies.get;

//使用一个新的函数来重写get()方法，对原来的方法实现代理
myData.cookies.get=function(){
  //调用被代理的方法来获取它可能产生的值
    var value = proxiedGet.apply(this,arguments);
    //对被代理的方法所返回的值实施某种操作
    value = value.toUpperCase();
    return value;
};
*/
/********虚拟代理模式***********/

//定义一个类，用于构建一个对象，来表示一个简单的表单域
function FormField(type,displayText){
    this.type = type;
    this.displayText = displayText;
    this.element = document.createElement('input');
    this.element.setAttribute('type',this.type);
    this.element.setAttribute('placeholder',this.displayText);
}
//定义2个方法以供对象实例来继承
FormField.prototype={
    getElement:function(){
        return this.element;
    },
    isValid:function(){
        return this.element.value!=='';
    }
};

//现在，使用实现了相同方法的代理来替代FormField类。他会延迟调用原来的构造函数，直至这些方法被正真调用。这样，节省了内存
//资源并提升了性能，根据需要，可使用模块模式来使该‘类’的作用域实现局部化，传入原来的FormField类，并返回它所经过的代理的
//版本

FormField = (function(FormField){
    //定义代理构造函数，类似于原来的FormField'类'
    function FormFieldProxy(type,displayText){
        this.type = type;
        this.displayText = displayText;
    }

    FormFieldProxy.prototype = {
        //定义一个新的initialize方法，用于在FormField的对象尚未存在时执行原来的类的构造函数，以创建出该对象
        //实例
        initialize:function(){
            if(!this.formfield){
                this.formfield = new FormField(this.type,this.displayText);
            }
        },
        //使用一些新方法对原来的各个方法进行代理，只有当这些新方法当中某一个被调用时，才会调用initialize方法来实例化FormField类
        getElement:function(){
            this.initialize();
            return this.formfield.getElement();
        },
        isValid:function(){
            this.initialize();
            return this.formfield.isValid();
        }
    };

    //返回该代理类，替换原来的类
    return FormFieldProxy;
}(FormField));

//创建2个实例对象，他们实际调用的都是代理类，这意味着，在此阶段，dom元素并不会被创建，这样便节省了内存占用并提升了性能
var textField = new FormField('text','Enter the first line of your address'),
    emailField = new FormField('email','Enter your email address');

//当页面加载完成时，把保存在这些对象中的元素添加至当前页面。getElement()方法在此时被调用。它首先调用initialize，然后
//创建原来的类的实例并执行该类的构造函数。此函数才是真正实施dom元素创建过程的函数。此做法确保了用作保存dom元素
//的内存只在需要该元素的确切时刻才被占用

window.onload=function(){
    document.body.appendChild(textField.getElement());
    document.body.appendChild(emailField.getElement());
};
