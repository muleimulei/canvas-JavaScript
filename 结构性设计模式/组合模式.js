
//����һ�����У������������ķ������Ի�ȡҳ���ϸ���Ԫ�ص����ã���Ϊ��ЩԪ�ص�class��ǩ��������class����
var element={
    //����һ����������tag���ƻ�ȡdomԪ�أ����ֻ����һ��Ԫ�أ�������Ϊһ�������Ľڵ�Ԫ�ط��أ���������ж��Ԫ�أ��򷵻�
    //��ЩԪ�ص�����
    get:function(tag){
        var elem = document.getElementsByTagName(tag),
        elemIndex= 0,
        elemLength = elem.length,
        output=[];

        //�����ҵ���Ԫ�ؽṹת��Ϊһ����׼������
        for(;elemIndex<elemLength;elemIndex++){
            output.push(elem[elemIndex]);
        }
        //���ֻ�ҵ�һ��Ԫ�أ��򷵻����ҵ�����Ԫ������ɵ�����
        return output.length===1?output[0]:output;
    },
    //����һ����Ϸ���������Ϊһ������Ԫ�����class��ǩ���ԣ�������ִ��ʱ�ж��ٸ�Ԫ�ر����붼��ʵ��
    addClass:function(elems,newClassName){
        var elemIndex= 0,
            elem;

        //�ж��������Ԫ�������黹��һ����������
        if(Object.prototype.toString.call(elems)==='[object Array]'){
            elemLength = elems.length;
            for(;elemIndex<elemLength;elemIndex++){
                elem = elems[elemIndex];
                elem.className+=(elem.className===''?'':" ")+newClassName;
            }
        }else{
            //���������ǵ���Ԫ�أ���Ϊ������class��ǩ����class����ֵ
            elem.className+=(elem.className===''?"":" ")+newClassName;
        }
    }
};
//ʹ�ø�elememt.get()�������ҳ���ǰҳ��ĵ�����<body>Ԫ�أ��Լ�<a>Ԫ��
var body = element.get('body'),
    links = element.get('a');
element.addClass(body,'has-js');
element.addClass(links,'custom-link');