
//定义代表promise的类，使得我们可以写出可读性高，易于理解的代码，来支持实现执行异步方法以及他们的回调函数。由此
//‘类’创建的实例遵循Promise/A+规范，并且能通过所有的官方单元测试
var Promise = (function () {
   //定义promise对象可以拥有的3种可能状态：pending---默认值，‘等待’，表示该Promise尚未完成处理，fulfilled--成功完成，表示该
    //Promise已成功完成处理，Rejetced---失败，表示该promise处理失败并出现错误
    var state={
        PENDING:"pending",
        FULFILLED:"fulfilled",
        REJECTED:"rejected"
    };
    //定义表示promise的类，如果在初始化时传入一个异步函数，则此异步函数将立即执行
    function Promise(asyncFunction) {
        var that = this;
        //定义一个属性来表示该Promise对象的当前状态，默认为pending
        this.stat = state.PENDING;
        //定义一个属性，用于保存该异步方法执行完成后时所要调用的各个回调函数的清单
        this.callbacks=[];
        //定义一个属性，用于保存由该promise对象所表示的异步方法所返回的值
        this.value=null;
        //定义一个属性，用于保存执行该异步方法时所产生的任何错误的详细信息
        this.error=null;
        //定义2个函数，它们将会传入由此promise表示的异步函数。如果该异步函数成功执行，则执行第一个函数；如果该异步函数
        //不能成功执行，则执行第二个函数
        function success() {
            //执行此promise对象的resolve方法，他会确保当此promise对象的异步函数成功执行时，与此promise对象相连的
            //任何所要执行的函数都能被执行
            that.resolve();
        }

        function failure() {
            //执行此promise对象的reject方法，他将执行所有相连的回调函数，用于显示错误信息或对错误进行处理。与此promise
            //对象按链式相连的所有更深层promise对象将不会执行
            that.reject();
        }

        //如果此promise对象在初始化时被传入一个异步函数，则此异步函数会立即执行，上面所定义的success，failure函数
        //会作为参数传入。该异步函数必须根据其所尝试执行的行为的运行结果，来确保这两个函数中最合适的那个得到执行
        if (typeof asyncFunction === 'function'){
            asyncFunction(success,failure);
        }
    }
    //定义then()方法。这是Promise/A+规范的关键。它实现了基于异步函数是否成功的完成其执行任务来使callback对象关联至该异步函数
    //的运行结果。它使得多个promise可以在彼此之间实现链式连接。在当前的一个promise成功完成之后，将指行下一个，从而
    //实现了更进一步的异步函数的执行
    Promise.prototype.then = function (onFulfilled,onRejected) {
        //创建一个新的promise对象（在本方法的最后返回此promise），以通过then()实现链式调用
        var promise = new Promise(),
        //定义一个callback对象，将其保存在promise对象中，并把新的promise实例关联其上，作为任何callback对象的上下文
        callback={
            promise:promise
        };
        //如果提供了一个函数，他在该异步函数成功的完成时执行，则保存这个函数在callback对象中，callback对象还有
        //那个新创建的promise对象作为这个函数的运行上下文
        if(typeof onFulfilled ==='function'){
            callback.fulfill = onFulfilled;
        }
        //如果提供了一个函数，他在该异步函数不能成功的完成时执行，则保存这个函数在callback对象中，callback对象还有
        //那个新创建的promise对象作为这个函数的运行上下文
        if(typeof onRejected ==='function'){
            callback.reject = onRejected;
        }

        //把该callback对象添加至callbacks数组
        this.callbacks.push(callback);

        //尝试执行callbacks数组所保存的各个callback对象所代表的回调函数，其异步函数已经完成执行后才进行此操作。
        //如果异步函数没有执行完成，则当该类的其他代码调用executeCallbacks时，才执行executeCallbacks,来调用callbacks对象
        //中的回调函数
        this.executeCallbacks();
        //返回该新创建的promise对象，使得可以通过重复调用then()方法来实现链式连接连接其它各异步函数
        return promise;

    };

    //定义一个方法，用于在此promise对象所对应的异步函数的执行已经完成时，执行此promise相关的所有callback对象
    Promise.prototype.executeCallbacks = function () {
        var that = this,
            value,
            callback;
        //定义2个函数，如果此promise的callbacks数组中的所保存的callback对象尚未保存相等同的fulfill()和reject()方法
        //则默认使用这2个函数
        function fulfill() {
            return value;
        }
        function reject(reason) {
            throw reason;
        }

        //只有在该promise不处于未完成状态，才执行callbacks数组中的各个callback对象
        if (this.state!==state.PENDING){
            //Promises/A+规范的2.2.4节指出，promise对象的回调函数应当异步执行，而脱离出所有的对then()的可能
            //会发生的调用的这个流程。这样就确保了整个由各promise组成的链准备就绪后，对回调函数的调用才发生
            //使得oms的setTimeout可以给JavaScript引擎一个很短的时间来完成对整个promise链得处理，然后才是任何
            //回调函数的运行。对于setTimeout的调用，各种浏览器都会有一个最小延时可能值。因此，在实际运行中，promise
            //对象的回调函数通常会在4ms之后执行

            setTimeout(function () {
               //循环遍历此promise对象的callback数组中所有的callback对象，并依次执行每一个callback对象。如果
                //该promise能够成功完成（通过其异步函数成功地完成了执行），则选择使用callback对象的fulfill方法
                //如果其异步函数在执行期间返回错误，则选择reject方法
                while (that.callbacks.length){
                    callback = that.callbacks.shift();
                    //把callback对象的执行包裹在try/catch块中，以防它抛出错误。如果出现了错误，我们并不希望
                    //promise对象链停止执行，我们希望对该promise对象进行失败处理（reject方法），使得发起调用的代码可以自己来
                    //处理错误
                    try{
                        //基于该promise对象的状态，执行相应的callback对象方法。如果callback对象并没配置fulfill和
                        //reject()方法，则退而使用默认的fulfill和reject方法。这两个方法在executeCallbacks()方法一开始
                        //别定义
                        if(that.state==state.FULFILLED){
                            value = (callback.fulfill||fulfill)(that.value);
                        }else{
                            value = (callback.reject ||reject)(that.error);
                        }
                        //把该回调函数的执行结果传给resolve方法，resolve()方法将会把该promise对象标记为‘成功完成’或者继续进一步
                        //执行
                        callback.promise.resolve(value);
                    }catch (reason){
                        callback.promise.reject(reason);
                    }
                }
            },0);
        }
    };

    //如果此promise对象在之前尚未处于‘成功完成’或‘失败’状态，则fulfilled方法将会把此promise对象标记为"完成"。与此
    //promise对象相关联的所有回调函数将会在此时执行
    Promise.prototype.fulfill= function (value) {
        //如果此promise对象仍然处于‘未完成’状态，才可以转化此promise对象至‘完成’状态
        if(this.state===state.PENDING && arguments.length){
            this.state = state.FULFILLED;
            this.value = value;
            this.executeCallbacks();
        }
    };


    //如果此promise对象在之前尚未处于‘成功完成’或‘失败’状态，则fulfilled方法将会把此promise对象标记为"失败"。与此
    //promise对象相关联的所有回调函数将会在此时执行
    Promise.prototype.reject= function (value) {
        //如果此promise对象仍然处于‘未完成’状态，才可以转化此promise对象至‘失败’状态
        if(this.state===state.PENDING && arguments.length){
            this.state = state.REJECTED;
            this.error = value;
            this.executeCallbacks();
        }
    };
}());