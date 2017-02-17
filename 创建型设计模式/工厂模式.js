//定义一个工厂，他会基于所输入的内容，使用合适的类，来为我们创建出相应的表单域对象
var FormFieldFactory;
FormFieldFactory = {
    //makeField 方法使用以下两个选项
    //--type ：定义所创建的表单域对象的类型，列如text，email，button
    //--displayText ：基于表单的类型，定义表单域的占位符或按钮上所显示的文本
    makeField: function (options) {
        var options = options || {}, type = options.type || "text", displayText = options.displayText || "",
            field;
        //基于所提供的类型使用最合适的类来创建对象实例
        switch(type){
            case 'text':
                field = new TextField(displayText);
                break;
            case 'email':
                field = new EmailField(displayText);
                break;
            case 'button':
                field = new ButtonField(displayText);
                break;
            //如果不确定，则使用TextField类
            default :
                field = new TextField(displayText);
                break;
        }
        return field;
    }
};

//定义TextField '类'，用于创建<input type='text'/> 表单元素
function TextField(displayText){
    this.displayText = displayText;
}
//getElement方法将利用所提供的placeholder文本值来创建一个dom元素
TextField.prototype.getElement = function(){
  var textField = document.createElement('input');
  textField.setAttribute('type','text');
  textField.setAttribute('placeholder',this.displayText);
  return textField;
};

//定义EmailField '类'，用于创建<input type='email'/> 表单元素
function EmailField(displayText){
    this.displayText = displayText;
}
//getElement方法将利用所提供的placeholder文本值来创建一个dom元素
EmailField.prototype.getElement = function(){
    var emailField = document.createElement('input');
    emailField.setAttribute('type','email');
    emailField.setAttribute('placeholder',this.displayText);
    return emailField;
};


//定义ButtonField '类'，用于创建<button>表单元素
function ButtonField(displayText){
    this.displayText = displayText;
}
//getElement方法将利用所提供的在按钮上显示文本值来创建一个dom元素
ButtonField.prototype.getElement = function(){
    var button = document.createElement('input');
    button.setAttribute('type','submit');
    return button;
};

//使用工厂来创建一个文本输入表单域，一个email表单域和一个提交按钮
var textField = FormFieldFactory.makeField({
    type: 'text',
    displayText:'Enter the first line of your address'
}),
    emailField = FormFieldFactory.makeField({
        type:'email',
        displayText:'Enter your email address'
    }),
    buttonField = FormFieldFactory.makeField({
        type: 'button',
        displayText: 'submit'
    });

window.addEventListener('load',function(){
    var body = document.body;
    //使用每个对象的getElement()方法，获取DOM元素，将其添加至页面
    body.appendChild(textField.getElement());
    body.appendChild(emailField.getElement());
    body.appendChild(buttonField.getElement());
},false);