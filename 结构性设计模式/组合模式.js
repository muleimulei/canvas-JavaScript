
//定义一个单列，当中所包含的方法可以获取页面上各个元素的引用，并为这些元素的class标签特性增加class名称
var element={
    //定义一个方法来按tag名称获取dom元素，如果只发现一个元素，则它作为一个单独的节点元素返回，如果发现有多个元素，则返回
    //这些元素的数组
    get:function(tag){
        var elem = document.getElementsByTagName(tag),
        elemIndex= 0,
        elemLength = elem.length,
        output=[];

        //把所找到的元素结构转化为一个标准的数组
        for(;elemIndex<elemLength;elemIndex++){
            output.push(elem[elemIndex]);
        }
        //如果只找到一个元素，则返回所找到各个元素所组成的数组
        return output.length===1?output[0]:output;
    },
    //定义一个组合方法，用于为一个或多个元素添加class标签特性，无论在执行时有多少个元素被传入都可实现
    addClass:function(elems,newClassName){
        var elemIndex= 0,
            elem;

        //判断所传入的元素是数组还是一个单独对象
        if(Object.prototype.toString.call(elems)==='[object Array]'){
            elemLength = elems.length;
            for(;elemIndex<elemLength;elemIndex++){
                elem = elems[elemIndex];
                elem.className+=(elem.className===''?'':" ")+newClassName;
            }
        }else{
            //如果传入的是单独元素，则为其增加class标签特性class名称值
            elem.className+=(elem.className===''?"":" ")+newClassName;
        }
    }
};
//使用该elememt.get()方法来找出当前页面的单独的<body>元素，以及<a>元素
var body = element.get('body'),
    links = element.get('a');
element.addClass(body,'has-js');
element.addClass(links,'custom-link');