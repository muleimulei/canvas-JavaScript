
//����һ��һ���Ե��࣬���ڵ���/ѭ�����飬���ж������������ݽṹ
function Iterator(data){
    var key;
    //��data�����б������ṩ������
    this.data = data||{};

    this.index=0;
    this.key=[];
    //ʹ��һ��ָʾ������ʾ���ṩ�����ݾ��������黹�Ƕ���
    this.isArray = Object.prototype.toString.call(data)==='[object Array]';

    if(this.isArray){
        //��������飬������length���Թ����ٷ���
        this.length = data.length;
    }else{
        //������ṩ���Ƕ������飬���ÿһ�����Ե����Ʊ�����������
        for(key in data){
            if(data.hasOwnProperty(key)){
                this.key.push(key);
            }
        }
        //�����ڱ����������Ƶ�������������Ƕ����ݽ��е�������������
        this.length  = this.key.length;
    }
}

//����һ������������������ţ�ʵ���Ͼ��ǰѵ��������û����ݵ���ʼλ��
Iterator.prototype.rewind=function(){
   this.index=0;
};

//����һ�����������ڷ��ص�������ǰ����������ֵ
Iterator.prototype.current = function(){
    return this.isArray?this.data[this.index]:this.data[this.key[this.index]];
};

//����һ�����������ڷ��ص�������ǰ���λ���������ֵ������������ӣ�ָ�����ݵ���һ��������
Iterator.prototype.next = function(){
    var value = this.current();
    this.index+=1;
    return value;
};

//����һ������������ָ����ǰλ���Ƿ�Ϊ���ݵ�ĩβλ��
Iterator.prototype.hasNext = function(){
    return this.index<this.length;
};

//����һ���������������õ����������ݵ���ʼλ�ã����������ݵĵ�һ��������
Iterator.prototype.first = function(){
    this.rewind();
    return this.current();
};

//����һ�����������ڵ�������ÿһ�����ݡ�ÿһ����������ִ�лص����������ѵ�ǰ��������Ϊ��һ����������ûص�����
Iterator.prototype.each = function(callback){
    callback = typeof callback ==='function' ?callback:function(){};
    //ʹ��forѭ�����е����������ݵ���ʼλ�ÿ�ʼ��һֱѭ����ֱ����Ҳû�����ݹ�����
    for(this.rewind();this.hasNext();){
        //������ѭ��������ÿһ�ֶ���ִ�иûص�������ʹ��next�������ѵ�ǰ�������ֵ���벢ʹѭ����������һ��
        callback(this.next());
    }
};

//����һ�������һ�����飬���ǽ������ǽ��е�������
var user = {
    name:'mulei',
    occupation:'student',
    company:'AKQA'
},
    daysOfWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
//ʹ����2�ֲ�ͬ���͵�������������Iterator�������ʵ��
    userIterator = new Iterator(user),
    daysOfWeekIterator = new Iterator(daysOfWeek),

    //����3�����鱣����Щ���ݵ�������ݣ��Ա������ʾ
    output1 = [],
    output2 = [],
    output3 = [],
    output4 = [];
while(userIterator.hasNext()){
    output1.push(userIterator.next());
}

for(;daysOfWeekIterator.hasNext();){
    output2.push(daysOfWeekIterator.next());
}

console.log(output1.join(','));
console.log(output2.join(','));




userIterator.each(function(item){
    output3.push(item);
});

daysOfWeekIterator.each(function(item){
    output4.push(item);
});

console.log(output3.join(','));
console.log(output4.join(','));