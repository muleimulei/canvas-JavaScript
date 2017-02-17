//定义一个基础工厂‘类’，创建表单域，其它更明确地表单域创建工厂‘类’将继承与此类
function FormFieldFactory(){
    //定义所支持的表单域类型的清单，他们将会应用于所有的继承与此类的表单域工厂类
    this.availableTypes = {
        TEXT :'text',
        EMAIL:'email',
        BUTTON:'button'
    };
}

FormFieldFactory.prototype={
    //定义makeField()方法，他将被各子类利用多态性进行重写。
    //因此，该方法不应在父类中直接调用，如果出现这种情况，则抛出错误
    makeField:function(){
        throw  new Error('this method should not  be called directly');
    }
};

//定义一个工厂类，继承于基础工厂类，用于HTML5表单域创建
function Html5FormFieldFactory(){}
//Html5FormFieldFactory.prototype = new FormFieldFactory();
Html5FormFieldFactory.prototype = Object.create(new FormFieldFactory());
//针对于此工厂使用明确的代码来重写makeField()方法
Html5FormFieldFactory.prototype.makeField = function(options){
    var options  = options || {},type = options.type || this.availableTypes.TEXT,displayText = options.displayText || '',
        field;

    //基于所提供的options，选择合适的域类型
    switch (type){
        case this.availableTypes.TEXT:
            field = new Html5TextField(displayText);
            break;
        case this.availableTypes.EMAIL:
            field = new Html5EmailField(displayText);
            break;
        case this.availableTypes.BUTTON:
            field = new ButtonField(displayText);
            break;
        default :
            throw new Error('Invalid field type specified :'+type);
    }
    return field;
};

function Html5TextField(displayText){
    this.displayText = displayText || '';
}
Html5TextField.prototype.getElement = function(){
    var textField = document.createElement('input');
    textField.setAttribute('type','text');
    textField.setAttribute('placeholder',this.displayText);
    return textField;
};
function Html5EmailField(displayText){
    this.displayText = displayText || '';
}
Html5EmailField.prototype.getElement = function(){
    var emailField = document.createElement('input');
    emailField.setAttribute('type','email');
    emailField.setAttribute('placeholder',this.displayText);
    return emailField;
};

//定义一个工厂类，他也继承于相同的基础工厂类，用于老式的HTML4表单域创建
function Html4FormFieldFactory(){}
Html4FormFieldFactory.prototype = new FormFieldFactory();

//针对于此工厂，使用明确地代码重写makeField()方法
Html4FormFieldFactory.prototype.makeField = function(options){
    var options = options||{},
        type = options.type || this.availableTypes.TEXT,
        displayText = options.displayText || '',
        field;
    switch(type){
        case this.availableTypes.TEXT:
        case this.availableTypes.EMAIL:
            field = new Html4TextField(displayText);
            break;
        case this.availableTypes.BUTTON:
            field = new ButtonField(displayText);
            break;
        default :
            throw new Error('Invalid field type specified :'+type);
    }
    return field;
};

//因为HTML4不支持placeholder标签特性，作为代替，我们将创建并返回一个<div>元素，当中包含着文本域和
//一个相关联的包含着placeholder文本的<label>
function Html4TextField(displayText){
    this.displayText = displayText;
}
Html4TextField.prototype.getElement = function(){
  var wrapper = document.createElement('div'),
      textFieldId = "text-field-"+Math.floor(Math.random()*999),
      textField = document.createElement('input'),
      label = document.createElement('label'),
      labelText = document.createTextNode(this.displayText);
  textField.setAttribute('type','text');
  //使用label的for标签特性与input的ID标签特性把<label>与该<input> 相关联
  label.setAttribute('for',textFieldId);
  label.appendChild(labelText);

  wrapper.appendChild(textField);
  wrapper.appendChild(label);
  return wrapper;
};

function ButtonField(displayText){
    this.displayText = displayText;
}
ButtonField.prototype.getElement = function(){
    var button = document.createElement('button');
    button.setAttribute('type','submit');
    button.innerHTML=this.displayText;
    return button;
};


//使用抽象工厂模式 
//确定浏览器是否支持HTML5，并选择合适的表单域工厂
var supportsHtml5FormFields = (function(){
	//此自执行函数尝试创建一个HTML5表单域类型的元素<input type='email'>
	var field = document.createElement('input');
	field.setAttribute('type','email');
	//如果该表单域返回了正确的域类型
	return field.type==='email';
}()),
	formFieldFactory = supportsHtml5FormFields? new Html5FormFieldFactory(): new Html4FormFieldFactory(),
	
	//使用该工厂创建一个文本框表单域，一个email表单域和一个提交按钮
	textField = formFieldFactory.makeField({
		type : 'text',
		displayText : 'Enter the first line of your address'
	}), 
	emailField = formFieldFactory.makeField({
		type : 'email',
		displayText:'Enter your email address'
	}),
	buttonField = formFieldFactory.makeField({
		type:formFieldFactory.availableTypes.BUTTON,
		displayText:'submit'
	});
	
	//等到浏览器的onload事件触发后，将DOM元素添加至当前页面
	window.addEventListener('load',function(){
		var body = document.body;
		body.appendChild(textField.getElement());
		body.appendChild(emailField.getElement());
		body.appendChild(buttonField.getElement());
	},false);