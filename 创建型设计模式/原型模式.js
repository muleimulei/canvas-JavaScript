
//ʹ��prototype�ؼ���ʵ��ԭ��ģʽ
var textField,
    emailField;

//����һ��field�࣬���ڴ���<input>��Ԫ��
function Field(type,displayText){
    this.type=type;
    this.displayText = displayText;
}

//ʹ��prototype������ʵ��ԭ��ģʽ��������ķ�������Ӧ�������м̳��ڴ���Ķ���
Field.prototype = {
    getElement:function(){
        var field = document.createElement('input');
        field.setAttribute('type',this.type);
        field.setAttribute('placeholder',this.displayText);
        return field;
    }
};

//����2������ʵ�������߶���prototype�л����getElement����
textField = new Field('text','Enter the first line of your address');
emailField = new Field('email','Enter your email address');

//ҳ�������ɣ�����Щ���󱣴��Ԫ���������ǰҳ��
window.addEventListener('load',function(){
    var bodyElement = document.body;
    bodyElement.appendChild(textField.getElement());
    bodyElement.appendChild(emailField.getElement());
},false);


/*******************ʹ��ecmascript 5ʵ��ԭ��ģʽ*****************/

//����һ���������󣬸ö������������ԣ�type��displayText������һ��getElement()�������˷�������һ��<input>Ԫ��
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

//ʹ�û������󴴽�һ���µĶ���,ʹ��ECMAScript 5 ��Object.create()��������¡ԭʼ���󣬲�Ϊtype��displayText������
//���Ը�ֵ��
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
