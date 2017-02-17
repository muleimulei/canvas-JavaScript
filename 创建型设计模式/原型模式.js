
//使用prototype关键字实现原型模式
var textField,
    emailField;

//定义一个field类，用于创建<input>表单元素
function Field(type,displayText){
    this.type=type;
    this.displayText = displayText;
}

//使用prototype属性来实现原型模式，所定义的方法将会应用于所有继承于此类的对象
Field.prototype = {
    getElement:function(){
        var field = document.createElement('input');
        field.setAttribute('type',this.type);
        field.setAttribute('placeholder',this.displayText);
        return field;
    }
};

//创建2个对象实例，二者都从prototype中获得了getElement方法
textField = new Field('text','Enter the first line of your address');
emailField = new Field('email','Enter your email address');

//页面加载完成，把这些对象保存的元素添加至当前页面
window.addEventListener('load',function(){
    var bodyElement = document.body;
    bodyElement.appendChild(textField.getElement());
    bodyElement.appendChild(emailField.getElement());
},false);


/*******************使用ecmascript 5实现原型模式*****************/

//定义一个基础对象，该对象有两个属性，type和displayText，还有一个getElement()方法，此方法创建一个<input>元素
var field={
    type:"",
    displayText:"",
    getElement:function(){
        var field = document.createElement('input');
        field.setAttribute('type',this.type);
        field.setAttribute('placeholder',this.displayText);
        return field;
    }
},

//使用基础对象创建一个新的对象,使用ECMAScript 5 的Object.create()方法来克隆原始对象，并为type和displayText这两个
//属性赋值。
     textField = Object.create(field,{
        "type":{
            value:"text",
            enumerable:true
        },
        "displayText":{
            value:'Enter the first line of your address',
            enumerable:true
        }
    }),


    emailField = Object.create(field,{
        "type":{
            value:"email",
            enumerable:true
        },
        "displayText":{
            value:'Enter your email address',
            enumerable:true
        }
    });

window.addEventListener('load',function(){
    var bodyElement = document.body;
    bodyElement.appendChild(textField.getElement());
    bodyElement.appendChild(emailField.getElement());
},false);
