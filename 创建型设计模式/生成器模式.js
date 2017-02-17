//定义一个生成器类，用于构建简单的表单元素。此表单元素可以根据终端开发者的需要进行配置
//终端开发者将实例化该生成器，并根据应用程序整个运作过程的需要，把各项表单域添加至该表单元素，
//最后，调用一个方法来返回一个包含着所有添加的表单域的<form>元素

function FormBuilder(){}
FormBuilder.prototype={
	//定义一个属性，用于保存所创建的各个表单域
	fields:[],
	//定义一个方法，用于向表单实例添加表单域
	addField:function(type,displayText){
		var field;
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
			default:
				throw new Error('Invalid field type specified :'+type);
		}
		//把所创建的表单域对象添加至存储数组中
		this.fields.push(field);
	},
	
	//定义一个方法，用于返回所生成的<form>元素
	getForm:function(){
		//创建一个新的<form>元素
		var formm = document.createElement('form');
		index = 0,
		numFields = this.fields.length;
		var f;
		//遍历fields属性中所存储的每个表单域，从每项中获取Dom元素，并将其添加至<form>元素
		for(;index<numFields;index++){
			f = this.fields[index];
			formm.appendChild(f.getElement());
		}
		//返回经填充的<form>元素
		return formm;
	}
};

function TextField(displayText){
	this.displayText = displayText || "";
}
TextField.prototype.getElement = function(){
	var textField = document.createElement('input');
	textField.setAttribute('type','text');
	textField.setAttribute('placeholder',this.displayText);
	return textField;
};

function EmailField(displayText){
	this.displayText = displayText || '';
}

EmailField.prototype.getElement = function(){
	var emailField = document.createElement('input');
	emailField.setAttribute('type','email');
	emailField.setAttribute('placeholder',this.displayText);
	return emailField;
}

function ButtonField(displayText){
	this.displayText = displayText || '';
}

ButtonField.prototype.getElement=function(){
	var button = document.createElement('button');
	button.setAttribute('type','submit');
	button.innerHTML = this.displayText;
	return button;
};


//实例化表单生成器
var formBuilder = new FormBuilder(),formm;

//在应用程序中，以任意顺序，在任意时间都可以添加表单域，所需要的是类型与内容，
//实际上的对象创建已经在生成器内进行了抽象

formBuilder.addField('text','Enter the first line of your address');
formBuilder.addField('email','Enter your email address');
formBuilder.addField('button','submit');

formm = formBuilder.getForm();

window.addEventListener('load',function(){
	document.body.appendChild(formm);
},false);