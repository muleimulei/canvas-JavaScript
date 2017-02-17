//����һ���򵥵��࣬����ʵ�ֱ���¼ģʽ��ʹ��������ʵ�ֱ���ͻָ��ڴ��еĶ�����յĹ���
function Memento(){
    //���ڴ��ж���һ������ֱ���������ض��ļ��洢��������Ŀ���
    this.storage={};
}
//����һ�����������ڰ�ĳ�����״̬������storage����ֱ�������ض���֮��
Memento.prototype.saveState = function(key,obj){
  //�����ṩ�Ķ���ת����json��ʽ���ַ�����ʾ��ʽ
    this.storage[key] = JSON.stringify(obj);
};

//����һ�����������ڻָ�������ĳ�ض���֮�µı���Ķ���״̬
Memento.prototype.restoreState = function(key){
    var output = {};
    //������ṩ�ļ��������ҳ�����������Ķ���
    if(this.storage.hasOwnProperty(key)){
        output = this.storage[key];
        output = JSON.parse(output);
    }
    return output;
};


//����һ��Memento��ʵ�������ڶ�Ŀ��״̬���б��漰�ָ�
var memento = new Memento(),
//����һ����������ϣ�����Զ�����״̬���б��漰�ָ�
    user={
        name:'mulei',
        age:20
    };
//ʹ��memento������user����ĵ�ǰ״̬
memento.saveState('user',user);
console.log(memento.storage['user']);

//���ڸĶ�user�����ֵ
user.name = 'John';
user.age = 21;

//���user�����״̬
console.log(JSON.stringify(user));

//ʹuser�ָ���һ�εı����״̬
user = memento.restoreState('user');
console.log(JSON.stringify(user));