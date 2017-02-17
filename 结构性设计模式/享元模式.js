/*
//����һ����������Ա�����ݣ���ЩԱ��������һ��������ͬ��˾
function Employee(data) {

    //��ʾ��֯������Ա����ID
    this.employeeId = data.employeeId || 0;
    //��ʾԱ������ᰲȫ����

    this.ssId = data.ssId || '0000-0000-0000';
    //��ʾԱ��������
    this.name = data.name || '';
    //��ʾԱ����ְҵ
    this.occupation = data.occupation || '';
    //��ʾԱ���Ĺ�˾���ƣ���ַ�͹���
    this.companyName = data.companyName || '';
    this.companyAddress = data.companyAddress || '';
    this.companyCountry = data.companyCountry ||'';
}

//����3�����������ڴӱ������ݵĶ����л�ȡԱ�������ƣ�ְҵ�͹�˾��ϸ��Ϣ
Employee.prototype.getName=function(){
    return this.name;
};
Employee.prototype.getOccupation = function(){
    return this.occupation;
};
Employee.prototype.getCompany = function(){
    return [this.companyName, this.companyAddress,this.companyCountry].join(',');
};

//����2��Ա������ע�⣺Ա�����������ͬ�Ĺ�˾��Ϣ����������ͬ��ssid��name�����Ŵ�����������ӣ����ݳ���
//�ظ�������Ҳ�����ӣ�����ʵ�ַ����ĵ�Ч�����˸�����ڴ�
var denOdell = new Employee({
    employeeId:3241,
    ssId:'123-45-654',
    name:'Den odell',
    occupation:'head of web development',
    companyname:'SDFE',
    companyAddress:'1 st ',
    companyCountry:'GB'
}),
    stevballer= new Employee({
    employeeId:3,
    ssId:'123-232-654',
    name:'steve ballmer',
    occupation:'EX-ceo',
    companyname:'microsoft',
    companyAddress:'2 st ',
    companyCountry:'US'
});
*/

/*
ʵ����Ԫģʽ�ĵ�һ������������Ҫʵ�ָ���Ч���ڴ�洢�Ķ����ԭ�����ⲿ״̬��������ȡ��Ҫ��Ϊ�ڲ�״̬������
*/
//person�����ʾ��������ᰲȫ�����Լ���Ա������
function Person(data){
    this.ssId = data.ssId||'';
    this.name = data.name||'';
}
//company�����ʾ��˾�����ƣ���ַ�͹�����ϸ����
function Company(data){
    this.name=data.name||'';
    this.address = data.address||'';
    this.country = data.country||'';
}

/*
ʵ����Ԫģʽ�ĵڶ��׶��ǣ�Ҫȷ������Ψһ�ⲿ״̬���ݵĶ���ֻ������һ�β������������Թ�����ʹ�ã�����ͨ����ÿһ��
�µ��ⲿ״̬���ݡ��࡯Ӧ�ù���ģʽ���������ʵ���Ĵ�������ʵ�ֵ�
����������ҵ�һ���Ѿ����ڵĶ��󣬾ͻ᷵�ظö�������Ǵ���һ���µ�ʵ��
 */

var personFactory=(function(){
    //����һ�����������ڰ���ssId����Person'��'�����ж���
    var people={},
        personCount=0;
    return{
      //����һ�����������������������ṩ�ø���ssId,����������ڸ�ssId��Ӧ��Person���ʵ�����򴴽�һ��ʵ����
      //����Ѿ����ڣ��򷵻ظö�������Ǵ���һ������
      createPerson:function(data){
          var person = people[data.ssId],
              newPerson;
          //����ø�����ssId����Ӧ����Ա�Ѿ������ڱ������ݴ洢���У��򷵻ض���ʵ��������ʹ�����ṩ�����ݴ���һ���µ�����
          if(person){
              return person;
          }else{
              newPerson  = new Person(data);
              people[newPerson.ssId] = newPerson;
              personCount++;
              return newPerson;
          }
      },
      //����һ���������Ա��ȡ�������
      getPersonCount:function(){
          return personCount;
      }
    };
}()),
    //Ϊcompany��Ķ��󴴽�һ�����ƵĹ�������name���湫˾����
companyFactory = (function(){
    var companies={},
        companyCount=0;
    return{
        createCompany:function(data){
            var company = companies[data.name],
                newCompany;
            if(company){
                return company;
            }else{
                newCompany = new Company(data);
                companies[newCompany.name] = newCompany;
                companyCount++;
                return newCompany;
            }
        },
        getCompanyCount:function(){
            return companyCount;
        }
    };

}()),
    /*
    ����һ�����󣬵����ṩ�˱���Ա�����ݵķ����Լ���Ա����employeeID������ÿ������ķ���
     */
employee = (function(){
    //����һ����������Ϊ���ݴ洢����������д�����Ա������
    var employees={},
        employeeCount = 0;
    return{
        //����һ�����������������ݴ洢�����Ա�����󣬰Ѳ������ṩ�����ݴ���Person��Company����Ӧ�Ĺ��������������ɵĶ������������ݴ洢��
        add:function(data){
            var person = personFactory.createPerson({
                ssId:data.ssId,
                name:data.name
            }),
                company = companyFactory.createCompany({
                    name:data.companyName,
                    address:data.companyAddress,
                    country:data.companycountry
                });
            employees[data.employeeId]={
                employeeId:data.employeeId,
                occupation:data.occupation,
                person:person,
                company:company
            };
            employeeCount++;
        },
        //����һ�����������ڸ���Ա����employeeID������Ա��������--����ص�Person�����л�ȡ��������
        getName:function(employeeId){
            return employees[employeeId].person.name;
        },
        //����һ�����������ڸ���Ա����employeeId������Ա����ְλ
        getOccupation:function(employeeId){
            return employees[employeeId].occupation;
        },
        //����һ�����������ڷ���Ա������ְ�Ĺ�˾�ĵ�ַ---����ص�company�����ȡ�йص�����
        getCompany:function(employId){
            var company = employees[employId].company;
            return [company.name,company.address,company.country].join(',');
        },
        //����һ�������Է�������ȡ�Ѿ�����Ա��������
        getTotalCount:function(){
            return employeeCount;
        }
    };
}());

//�����ĸ�Ա������
var denOdell = employee.add({
    employeeId:1456,
    ssId:'1234-567-900',
    name:'Den Odell',
    occupation:'Head of Web Develop',
    companyName:'AKQA',
    comapnyAddress:'1 st',
    companyAddress:'GB'
}),
    steveBallmer = employee.add({
    employeeId:3,
    ssId:'8376-940-1673',
    name:'Steve Ballmer',
    occupation:'Ex-CEO',
    companyName:'Microsoft',
    comapnyAddress:'1 Microsoft Way, Redmod, WA',
    companyAddress:'US'
}),
    billGates = employee.add({
    employeeId:1,
    ssId:'7754-342-7584',
    name:'Bill Gates',
    occupation:'Founder',
    companyName:'Microsoft',
    comapnyAddress:'1 microsoft Way, Redmod, WA',
    companyAddress:'US'
}),
    billGatesPhilanthropist = employee.add({
        employeeId:2,
        ssId:'7754-342-7584',
        name:'Bill Gates',
        occupation:'Philanthropist',
        companyName:'Gates Foundation',
        comapnyAddress:'500 Fifth Avenue North, Seattle, WA',
        companyAddress:'US'
    });

console.log(personFactory.getPersonCount());//3
console.log(companyFactory.getCompanyCount());//3
console.log(employee.getTotalCount());//4