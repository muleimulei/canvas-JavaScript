/*
var myData={};
myData = (function(myNamespace,undefined){
    //�������ռ����һ��cookie�������ԣ���ʹ����ط�����ʵ������
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
//Ϊ�˶Դ����嵥6-13�е�myData.cookies.get()����ʵ�ִ��������Ȱѵ�ǰ����������һ��������
var proxiedGet = myData.cookies.get;

//ʹ��һ���µĺ�������дget()��������ԭ���ķ���ʵ�ִ���
myData.cookies.get=function(){
  //���ñ�����ķ�������ȡ�����ܲ�����ֵ
    var value = proxiedGet.apply(this,arguments);
    //�Ա�����ķ��������ص�ֵʵʩĳ�ֲ���
    value = value.toUpperCase();
    return value;
};
*/
/********�������ģʽ***********/

//����һ���࣬���ڹ���һ����������ʾһ���򵥵ı���
function FormField(type,displayText){
    this.type = type;
    this.displayText = displayText;
    this.element = document.createElement('input');
    this.element.setAttribute('type',this.type);
    this.element.setAttribute('placeholder',this.displayText);
}
//����2�������Թ�����ʵ�����̳�
FormField.prototype={
    getElement:function(){
        return this.element;
    },
    isValid:function(){
        return this.element.value!=='';
    }
};

//���ڣ�ʹ��ʵ������ͬ�����Ĵ��������FormField�ࡣ�����ӳٵ���ԭ���Ĺ��캯����ֱ����Щ������������á���������ʡ���ڴ�
//��Դ�����������ܣ�������Ҫ����ʹ��ģ��ģʽ��ʹ�á��࡯��������ʵ�־ֲ���������ԭ����FormField�࣬���������������Ĵ����
//�汾

FormField = (function(FormField){
    //��������캯����������ԭ����FormField'��'
    function FormFieldProxy(type,displayText){
        this.type = type;
        this.displayText = displayText;
    }

    FormFieldProxy.prototype = {
        //����һ���µ�initialize������������FormField�Ķ�����δ����ʱִ��ԭ������Ĺ��캯�����Դ������ö���
        //ʵ��
        initialize:function(){
            if(!this.formfield){
                this.formfield = new FormField(this.type,this.displayText);
            }
        },
        //ʹ��һЩ�·�����ԭ���ĸ����������д���ֻ�е���Щ�·�������ĳһ��������ʱ���Ż����initialize������ʵ����FormField��
        getElement:function(){
            this.initialize();
            return this.formfield.getElement();
        },
        isValid:function(){
            this.initialize();
            return this.formfield.isValid();
        }
    };

    //���ظô����࣬�滻ԭ������
    return FormFieldProxy;
}(FormField));

//����2��ʵ����������ʵ�ʵ��õĶ��Ǵ����࣬����ζ�ţ��ڴ˽׶Σ�domԪ�ز����ᱻ�������������ʡ���ڴ�ռ�ò�����������
var textField = new FormField('text','Enter the first line of your address'),
    emailField = new FormField('email','Enter your email address');

//��ҳ��������ʱ���ѱ�������Щ�����е�Ԫ���������ǰҳ�档getElement()�����ڴ�ʱ�����á������ȵ���initialize��Ȼ��
//����ԭ�������ʵ����ִ�и���Ĺ��캯�����˺�����������ʵʩdomԪ�ش������̵ĺ�����������ȷ������������domԪ��
//���ڴ�ֻ����Ҫ��Ԫ�ص�ȷ��ʱ�̲ű�ռ��

window.onload=function(){
    document.body.appendChild(textField.getElement());
    document.body.appendChild(emailField.getElement());
};
