//����һ�������г�ϵͳ��־��¼�Ĳ�ͬ����---��ͨ��Ϣ��������Ϣ�ʹ�����Ϣ��ÿһ�ּ������������һ�ּ�������ʾ�����
//��Ϊ����

var LogLevel = {
    INFO:'INFO',
    WARN:'WARN',
    ERROR:'ERROR'
},
    log;

//����һ���࣬����Ϊ��ͬ��־�������־��Ϣ������Ӧ�ĸ�ʽ����־��Ϣ
function LogFormatter(logLevel){
    this.logLevel = logLevel;
}
LogFormatter.prototype={
    //����һ�����ԣ����ڱ���˶���ʵ����ְ�����еĺ����
    nextChain:null,
    //����һ���������������ô˶���ʵ�����������еĺ����
    setNextChain:function (next){
        this.nextChain = next;
    },
    //����һ�����������ڵ�ǰ����־��¼����������Ӧ��ʽ����־��Ϣ
    createLogMessage:function(message,logLevel){
        var returnValue;
        if(this.logLevel===logLevel){
            //������־��¼��������Ӧ�ĸ�ʽ������־��Ϣ
            if(logLevel===LogLevel.ERROR){
                returnValue = logLevel +":"+message.toUpperCase();
            }else if(logLevel===LogLevel.WARN){
                returnValue = logLevel +":"+message;
            }else{
                returnValue = message;
            }
            //�����ǰ����ʵ������ָ�ɵ���־��¼�����봫��Ĳ�����ͬ����Ѹ���Ϣ���ݸ�����������һ������ʵ��
        }else if(this.nextChain){
            returnValue = this.nextChain.createLogMessage(message,logLevel);
        }
        return returnValue;
    }
};

//����һ�����������ڱ�������ϵͳ����־��Ϣ��¼
log = (function(){
    //����һ���洢�����Դ����־��Ϣ
    var logs=[],
        //����3������ʵ�����ֱ��ʾ3�ּ������־��¼����ͨ��Ϣ��������Ϣ��������Ϣ
        infoLogger = new LogFormatter(LogLevel.INFO),
        warnLogger = new LogFormatter(LogLevel.WARN),
        errorLogger = new LogFormatter(LogLevel.ERROR),
        //���á�������Ϣ����־����Ϊ�������ĵ�һλ����߼�λ�ã����ǽ��䱣����logger������
        logger = errorLogger;
    //ʹ��ÿ������ʵ���е�setNextChain()�����������������Ĳ㼶�����Ǽ���'������Ϣ'��Ϊ��Ҫ����λ������������λ
    errorLogger.setNextChain(warnLogger);
    warnLogger.setNextChain(infoLogger);

    return{
          //����һ�����������ڶ�ȡ���������־��Ϣ
        getLogs:function(){
            return logs.join('\n');
        },
        //����һ�����������ڸ�����Ϣ����־��¼�������Ϣ������Ӧ�ĸ�ʽ��
        message:function(message,logLevel){
            //����ֻ����ò㼶�е���λ����ʵ����createLogMessage()����������÷��������ܴ�����ض���־�������
            //��һ����ְ�������ε�����Ӧ�ķ���������Ϣ��־����ְ������һ�����ݣ�ֱ����Ϣ�������ܹ������ʵ������
            var logMessage = logger.createLogMessage(message,logLevel);
            logs.push(logMessage);
        }
    };
}());


//ִ��log������message����������һ����Ϣ�Լ���־�����������е���λ��������ǡ�������Ϣ���������־��Ϣ�����
//������־��Ϣ������ְ������һ���´�����־��Ϣ��errorLogger���󷵻�
log.message('something very bad happened',LogLevel.ERROR);

//��ΪerrorLogger����ֻ�ܴ���������Ϣ���������־��Ϣ������������Ϣ��ͨ��ְ��������errorLogger������warnLogger����
log.message('something bad happened',LogLevel.WARN);

//������Ϣ�ᾭ��errorLogger������warnLogger���󣬲���������infoLogger���󣬸ö�����Դ�����ͨ��Ϣ�������־��Ϣ
log.message('something happened',LogLevel.INFO);

//������洢����־��¼
console.log(log.getLogs());