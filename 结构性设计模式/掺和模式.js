
//����һ��mixin�����Խ�������ʵ�ֵ�����־��¼���ɽ���Ӧ�����κζ������
var loggingMixin= {
    //����һ���洢���飬���ڴ�Ÿ�����־��¼
    logs: [],
    //����һ�����������ڴ洢��Ϣ����־��
    log: function (message) {
        this.logs.push(message);
    },
    //����һ�����������ڴ洢���洢����־
    readLog: function () {
        return this.logs.join(',');
    }
},
    element,
    header,
    textField,
    emailField;
    //����һ�����������ڽ�һ�������еķ���������Ӧ�õ���һ�������У�
    //���ǽ�ʹ�øú�����Ӧ��mixin����������
    function extendObj(obj1,obj2){
        var obj2Key;
        for(obj2Key in obj2){
            if(obj2.hasOwnProperty(obj2Key)){
                obj1[obj2Key] = obj2[obj2Key];
            }
        }
        return obj1;
    }
//����extendObj���������ƻ��ڶ�������Զ�����ͨ������ָ������
/*function extendObj(obj1,obj2){
    var obj2key,
        value;
    for(obj2key in obj2){
        if(obj2.hasOwnProperty(obj2key)){
            value = obj2[obj2key];
            //��������Ƶ������飬��ʹ��slice()���������Ƹ�����ĸ���
            if(Object.prototype.toString().apply(value)==='[object Array]'){
                obj1[obj2key] = value.slice();
            }else if(typeof obj2[obj2key] ==='object'){
                obj1[obj2key] = extendObj({},value);
            }else{
                obj1[obj2] = value;
            }

        }
    }
}*/
//����һ�����������ǽ�Ӧ�õ�mixin������
    element={
        allElements:[],
        create:function(type){
            var elem = document.createElement(type);
            this.allElements.push(elem);
            //ʹ�ø�mixin��log������ȷ���÷������ڲŵ������������mixin��δӦ�ã���÷����Խ���������
            if(typeof this.log ==='function'){
                this.log('Create an element of type:'+type);
            }
            return elem;
        },
        getAllElements:function(){
            return this.allElements;
        }
    };
//����һ���򵥵��࣬���ǽ�Ӧ�ø�mixin������
var Field = function(type,displayText){
  this.type = type;
  this.displayText = displayText;
  if(typeof this.log ==='function'){
        this.log('Create an element of type:'+type);
  }
};

Field.prototype={
    getElement:function(){
        var field = document.createElement('input');
        field.setAttribute('type',this.type);
        field.setAttribute('placeholder',this.displayText);
        if(typeof this.log==='function'){
            this.log('Create a dom element with placeholder text :'+this.displayText);
        }
        return field;
    }
};

//ֱ��Ӧ�ø�mixin��element����ʵ���ǴӸ�mixin���Ƹ��������������õ���
element = extendObj(element,loggingMixin);
//Ӧ�ø�mixin��Field���࡯��prototype��ʹ�ø�mixin�ķ���Ϊÿһ���Ӹ���ʵ�����Ķ�����ӵ��
Field.prototype = extendObj(Field.prototype,loggingMixin);
//ʹ��element.create()����������һ���µ�domԪ��
header = element.create('header');

//������������ʵ�������߶���prototype�л����getElement����
textField = new Field('text','Enter the first line of your address');
emailField = new Field('email','Enter your address');

//����Щ�������������Ԫ���������ǰҳ��
document.body.appendChild(textField.getElement());
document.body.appendChild(emailField.getElement());

console.log(loggingMixin.readLog());