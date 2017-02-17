//定义一个类，用于构建一个对象来表示一个简单的表单域
var FormField = function(type,displayText){
    //使用构造函数的输入参数来确定该表单域的类型，默认为一个简单的文本域以及他的placeholder文本
    this.type = type||"text";
    this.displayText = displayText||"";
};

FormField.prototype={

    createElement: function(){
      this.element = document.createElement('input');
      this.element.setAttribute('type',this.type);
      this.element.setAttribute('placeholder',this.displayText);
      return this.element;
    },
    isValid:function(){
        return this.element.value!=="";
    }
};

//表单域装饰者，它实现了与formfield相同的公共方法
var FormFieldDecorator = function (formfield){
    this.formfield = formfield;
};
FormFieldDecorator.prototype={
    createElement:function(){
        return this.formfield.createElement();
    },
    isValid:function(){
        return this.formfield.isValid();
    }
};

var MaxlengthFieldDecorator = function(formfield,maxlength){
    FormFieldDecorator.call(this,formfield);
    this.length = maxlength;
};
MaxlengthFieldDecorator.prototype = FormFieldDecorator.prototype;
MaxlengthFieldDecorator.prototype.createElement = function(){
        var ele = this.formfield.createElement();
        ele.setAttribute('maxlength',this.length);
        return ele;
};

var AutoCompleteFieldDecorator = function(formField,autocomplete){
    FormFieldDecorator.call(this,formField);
    this.autocomplete = autocomplete||'on';
};

AutoCompleteFieldDecorator.prototype = FormFieldDecorator.prototype;
AutoCompleteFieldDecorator.prototype.createElement= function(){
        var ele = this.formfield.createElement();
        ele.setAttribute('size',this.autocomplete);
        return ele;
};

var form = document.createElement('form'),
    formField = new FormField('search','Enter your search term'),
    submit = new FormField('submit','ok');


formField = new MaxlengthFieldDecorator(formField,4);
//formField = new AutoCompleteFieldDecorator(formField,'40');

form.appendChild(formField.createElement());
form.appendChild(submit.createElement());

window.onload = function() {
    document.body.appendChild(form);
};



form.addEventListener('submit',function(e){
    e.preventDefault();
    if(formField.isValid()){
        form.submit();
    }else{
        alert('Please correct the issue in the form field');
    }
});