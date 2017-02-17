
//定义一个一般性的类，用于迭代/循环数组，或有对象特征的数据结构
function Iterator(data){
    var key;
    //在data属性中保存所提供的数据
    this.data = data||{};

    this.index=0;
    this.key=[];
    //使用一个指示符来表示所提供的数据究竟是数组还是对象
    this.isArray = Object.prototype.toString.call(data)==='[object Array]';

    if(this.isArray){
        //如果是数组，保存其length，以供快速访问
        this.length = data.length;
    }else{
        //如果所提供的是对象数组，则把每一项属性的名称保存至数组中
        for(key in data){
            if(data.hasOwnProperty(key)){
                this.key.push(key);
            }
        }
        //该用于保存属性名称的数组的项数就是对数据进行迭代的数据项数
        this.length  = this.key.length;
    }
}

//定义一个方法，用于重置序号，实际上就是把迭代器重置回数据的起始位置
Iterator.prototype.rewind=function(){
   this.index=0;
};

//定义一个方法，用于返回迭代器当前序号所保存的值
Iterator.prototype.current = function(){
    return this.isArray?this.data[this.index]:this.data[this.key[this.index]];
};

//定义一个方法，用于返回迭代器当前序号位置所保存的值，并将序号增加，指向数据的下一个数据项
Iterator.prototype.next = function(){
    var value = this.current();
    this.index+=1;
    return value;
};

//定义一个方法，用于指出当前位置是否为数据的末尾位置
Iterator.prototype.hasNext = function(){
    return this.index<this.length;
};

//定义一个方法，用于重置迭代器置数据的起始位置，并返回数据的第一个数据项
Iterator.prototype.first = function(){
    this.rewind();
    return this.current();
};

//定义一个方法，用于迭代访问每一项数据。每一个迭代都会执行回调函数，并把当前数据项作为第一个参数传入该回调函数
Iterator.prototype.each = function(callback){
    callback = typeof callback ==='function' ?callback:function(){};
    //使用for循环进行迭代，从数据的起始位置开始，一直循环，直至再也没有数据供迭代
    for(this.rewind();this.hasNext();){
        //在整个循环过程中每一轮都会执行该回调函数，使用next函数，把当前数据项的值传入并使循环递增入下一轮
        callback(this.next());
    }
};

//定义一个对象和一个数组，我们将对他们进行迭代访问
var user = {
    name:'mulei',
    occupation:'student',
    company:'AKQA'
},
    daysOfWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
//使用了2种不同类型的数据来创建该Iterator类的两个实例
    userIterator = new Iterator(user),
    daysOfWeekIterator = new Iterator(daysOfWeek),

    //创建3个数组保存这些数据的输出数据，以便进行显示
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