//����һ�������������࡯������������������ȷ�ر��򴴽��������࡯���̳������
function FormFieldFactory(){
    //������֧�ֵı������͵��嵥�����ǽ���Ӧ�������еļ̳������ı��򹤳���
    this.availableTypes = {
        TEXT :'text',
        EMAIL:'email',
        BUTTON:'button'
    };
}

FormFieldFactory.prototype={
    //����makeField()���������������������ö�̬�Խ�����д��
    //��ˣ��÷�����Ӧ�ڸ�����ֱ�ӵ��ã��������������������׳�����
    makeField:function(){
        throw  new Error('this method should not  be called directly');
    }
};

//����һ�������࣬�̳��ڻ��������࣬����HTML5���򴴽�
function Html5FormFieldFactory(){}
//Html5FormFieldFactory.prototype = new FormFieldFactory();
Html5FormFieldFactory.prototype = Object.create(new FormFieldFactory());
//����ڴ˹���ʹ����ȷ�Ĵ�������дmakeField()����
Html5FormFieldFactory.prototype.makeField = function(options){
    var options  = options || {},type = options.type || this.availableTypes.TEXT,displayText = options.displayText || '',
        field;

    //�������ṩ��options��ѡ����ʵ�������
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

//����һ�������࣬��Ҳ�̳�����ͬ�Ļ��������࣬������ʽ��HTML4���򴴽�
function Html4FormFieldFactory(){}
Html4FormFieldFactory.prototype = new FormFieldFactory();

//����ڴ˹�����ʹ����ȷ�ش�����дmakeField()����
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

//��ΪHTML4��֧��placeholder��ǩ���ԣ���Ϊ���棬���ǽ�����������һ��<div>Ԫ�أ����а������ı����
//һ��������İ�����placeholder�ı���<label>
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
  //ʹ��label��for��ǩ������input��ID��ǩ���԰�<label>���<input> �����
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


//ʹ�ó��󹤳�ģʽ 
//ȷ��������Ƿ�֧��HTML5����ѡ����ʵı��򹤳�
var supportsHtml5FormFields = (function(){
	//����ִ�к������Դ���һ��HTML5�������͵�Ԫ��<input type='email'>
	var field = document.createElement('input');
	field.setAttribute('type','email');
	//����ñ��򷵻�����ȷ��������
	return field.type==='email';
}()),
	formFieldFactory = supportsHtml5FormFields? new Html5FormFieldFactory(): new Html4FormFieldFactory(),
	
	//ʹ�øù�������һ���ı������һ��email�����һ���ύ��ť
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
	
	//�ȵ��������onload�¼������󣬽�DOMԪ���������ǰҳ��
	window.addEventListener('load',function(){
		var body = document.body;
		body.appendChild(textField.getElement());
		body.appendChild(emailField.getElement());
		body.appendChild(buttonField.getElement());
	},false);