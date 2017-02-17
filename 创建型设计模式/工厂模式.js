//����һ�������������������������ݣ�ʹ�ú��ʵ��࣬��Ϊ���Ǵ�������Ӧ�ı������
var FormFieldFactory;
FormFieldFactory = {
    //makeField ����ʹ����������ѡ��
    //--type �������������ı����������ͣ�����text��email��button
    //--displayText �����ڱ������ͣ���������ռλ����ť������ʾ���ı�
    makeField: function (options) {
        var options = options || {}, type = options.type || "text", displayText = options.displayText || "",
            field;
        //�������ṩ������ʹ������ʵ�������������ʵ��
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
            //�����ȷ������ʹ��TextField��
            default :
                field = new TextField(displayText);
                break;
        }
        return field;
    }
};

//����TextField '��'�����ڴ���<input type='text'/> ��Ԫ��
function TextField(displayText){
    this.displayText = displayText;
}
//getElement�������������ṩ��placeholder�ı�ֵ������һ��domԪ��
TextField.prototype.getElement = function(){
  var textField = document.createElement('input');
  textField.setAttribute('type','text');
  textField.setAttribute('placeholder',this.displayText);
  return textField;
};

//����EmailField '��'�����ڴ���<input type='email'/> ��Ԫ��
function EmailField(displayText){
    this.displayText = displayText;
}
//getElement�������������ṩ��placeholder�ı�ֵ������һ��domԪ��
EmailField.prototype.getElement = function(){
    var emailField = document.createElement('input');
    emailField.setAttribute('type','email');
    emailField.setAttribute('placeholder',this.displayText);
    return emailField;
};


//����ButtonField '��'�����ڴ���<button>��Ԫ��
function ButtonField(displayText){
    this.displayText = displayText;
}
//getElement�������������ṩ���ڰ�ť����ʾ�ı�ֵ������һ��domԪ��
ButtonField.prototype.getElement = function(){
    var button = document.createElement('input');
    button.setAttribute('type','submit');
    return button;
};

//ʹ�ù���������һ���ı��������һ��email�����һ���ύ��ť
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
    //ʹ��ÿ�������getElement()��������ȡDOMԪ�أ����������ҳ��
    body.appendChild(textField.getElement());
    body.appendChild(emailField.getElement());
    body.appendChild(buttonField.getElement());
},false);