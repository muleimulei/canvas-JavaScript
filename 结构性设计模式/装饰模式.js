//����һ���࣬���ڹ���һ����������ʾһ���򵥵ı���
var FormField = function(type,displayText){
    //ʹ�ù��캯�������������ȷ���ñ�������ͣ�Ĭ��Ϊһ���򵥵��ı����Լ�����placeholder�ı�
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

//����װ���ߣ���ʵ������formfield��ͬ�Ĺ�������
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