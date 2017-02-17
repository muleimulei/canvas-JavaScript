//定义一个对象，列出系统日志记录的不同级别---普通消息，警告消息和错误消息。每一种级别相比于其上一种级别，所表示的情况
//更为严重

var LogLevel = {
    INFO:'INFO',
    WARN:'WARN',
    ERROR:'ERROR'
},
    log;

//定义一个类，用于为不同日志级别的日志消息生成相应的格式化日志消息
function LogFormatter(logLevel){
    this.logLevel = logLevel;
}
LogFormatter.prototype={
    //定义一个属性，用于保存此对象实例在职责链中的后继者
    nextChain:null,
    //定义一个方法，用于设置此对象实例在责任链中的后继者
    setNextChain:function (next){
        this.nextChain = next;
    },
    //定义一个方法，基于当前的日志记录级别生成相应格式的日志消息
    createLogMessage:function(message,logLevel){
        var returnValue;
        if(this.logLevel===logLevel){
            //根据日志记录级别来相应的格式化该日志消息
            if(logLevel===LogLevel.ERROR){
                returnValue = logLevel +":"+message.toUpperCase();
            }else if(logLevel===LogLevel.WARN){
                returnValue = logLevel +":"+message;
            }else{
                returnValue = message;
            }
            //如果当前对象实例所被指派的日志记录级别与传入的参数不同，则把该消息传递给责任链的下一个对象实例
        }else if(this.nextChain){
            returnValue = this.nextChain.createLogMessage(message,logLevel);
        }
        return returnValue;
    }
};

//定义一个单例，用于保存和输出系统的日志消息记录
log = (function(){
    //定义一个存储数组以存放日志消息
    var logs=[],
        //创建3个对象实例，分别表示3种级别的日志记录：普通消息，警告消息，错误消息
        infoLogger = new LogFormatter(LogLevel.INFO),
        warnLogger = new LogFormatter(LogLevel.WARN),
        errorLogger = new LogFormatter(LogLevel.ERROR),
        //设置‘错误消息’日志级别为责任链的第一位和最高级位置，我们将其保存在logger变量中
        logger = errorLogger;
    //使用每个对象实例中的setNextChain()方法来设置责任链的层级。我们假设'错误消息'最为重要，其位于责任链的首位
    errorLogger.setNextChain(warnLogger);
    warnLogger.setNextChain(infoLogger);

    return{
          //定义一个方法，用于读取所保存的日志消息
        getLogs:function(){
            return logs.join('\n');
        },
        //定义一个方法，用于根据消息的日志记录级别把消息进行相应的格式化
        message:function(message,logLevel){
            //我们只需调用层级中的首位对象实例的createLogMessage()方法。如果该方法本身不能处理该特定日志级别，则会
            //进一步按职责链依次调用相应的方法。该消息日志会向职责链进一步传递，直至消息到达了能够处理的实例对象
            var logMessage = logger.createLogMessage(message,logLevel);
            logs.push(logMessage);
        }
    };
}());


//执行log单例的message方法，传入一个消息以及日志级别。责任链中的首位对象处理的是“错误消息”级别的日志消息，因此
//以下日志消息不会向职责链进一步下传，日志消息由errorLogger对象返回
log.message('something very bad happened',LogLevel.ERROR);

//因为errorLogger对象只能处理‘错误消息’级别的日志消息，所以以下消息会通过职责链经过errorLogger对象传至warnLogger对象
log.message('something bad happened',LogLevel.WARN);

//以下消息会经过errorLogger对象至warnLogger对象，并继续传至infoLogger对象，该对象可以处理普通消息级别的日志消息
log.message('something happened',LogLevel.INFO);

//输出所存储的日志记录
console.log(log.getLogs());