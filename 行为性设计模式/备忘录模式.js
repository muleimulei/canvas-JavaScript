//定义一个简单的类，用于实现备忘录模式，使用它可以实现保存和恢复内存中的对象快照的功能
function Memento(){
    //在内存中定义一个对象直接量，以特定的键存储其它对象的快照
    this.storage={};
}
//定义一个方法，用于把某对象的状态保存在storage对象直接量的特定键之下
Memento.prototype.saveState = function(key,obj){
  //把所提供的对象转换成json格式的字符串表示形式
    this.storage[key] = JSON.stringify(obj);
};

//定义一个方法，用于恢复并返回某特定键之下的保存的对象状态
Memento.prototype.restoreState = function(key){
    var output = {};
    //如果所提供的键存在则找出当中所保存的对象
    if(this.storage.hasOwnProperty(key)){
        output = this.storage[key];
        output = JSON.parse(output);
    }
    return output;
};


//定义一个Memento的实例，用于对目标状态进行保存及恢复
var memento = new Memento(),
//定义一个对象，我们希望可以对他的状态进行保存及恢复
    user={
        name:'mulei',
        age:20
    };
//使用memento来保存user对象的当前状态
memento.saveState('user',user);
console.log(memento.storage['user']);

//现在改动user对象的值
user.name = 'John';
user.age = 21;

//输出user对象的状态
console.log(JSON.stringify(user));

//使user恢复上一次的保存的状态
user = memento.restoreState('user');
console.log(JSON.stringify(user));