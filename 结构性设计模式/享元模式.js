/*
//创建一个类来保存员工数据，这些员工工作于一个或多个不同公司
function Employee(data) {

    //表示组织机构内员工的ID
    this.employeeId = data.employeeId || 0;
    //表示员工的社会安全号码

    this.ssId = data.ssId || '0000-0000-0000';
    //表示员工的名称
    this.name = data.name || '';
    //表示员工的职业
    this.occupation = data.occupation || '';
    //表示员工的公司名称，地址和国籍
    this.companyName = data.companyName || '';
    this.companyAddress = data.companyAddress || '';
    this.companyCountry = data.companyCountry ||'';
}

//建立3个方法，用于从保存数据的对象中获取员工的名称，职业和公司详细信息
Employee.prototype.getName=function(){
    return this.name;
};
Employee.prototype.getOccupation = function(){
    return this.occupation;
};
Employee.prototype.getCompany = function(){
    return [this.companyName, this.companyAddress,this.companyCountry].join(',');
};

//创建2个员工对象。注意：员工对象具有相同的公司信息，而且有相同的ssid和name，随着创建对象的增加，数据出现
//重复的数量也将增加，这种实现方法的低效消耗了更多的内存
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
实现享元模式的第一步，从我们想要实现更高效的内存存储的对象的原来的外部状态数据中提取出要成为内部状态的数据
*/
//person对象表示独立的社会安全号码以及人员的名称
function Person(data){
    this.ssId = data.ssId||'';
    this.name = data.name||'';
}
//company对象表示公司的名称，地址和国家详细内容
function Company(data){
    this.name=data.name||'';
    this.address = data.address||'';
    this.country = data.country||'';
}

/*
实现享元模式的第二阶段是，要确保代表唯一外部状态数据的对象只被创建一次并被保存起来以供后续使用，这是通过对每一个
新的外部状态数据‘类’应用工厂模式来抽象对象实例的创建过程实现的
这样，如果找到一个已经存在的对象，就会返回该对象而不是创建一个新的实例
 */

var personFactory=(function(){
    //创建一个变量，用于按照ssId保存Person'类'的所有对象
    var people={},
        personCount=0;
    return{
      //建立一个方法，根据输入数据所提供得给定ssId,如果还不存在该ssId对应的Person类的实例，则创建一个实例；
      //如果已经存在，则返回该对象而不是创建一个对象
      createPerson:function(data){
          var person = people[data.ssId],
              newPerson;
          //如果该给定的ssId所对应的人员已经存在于本地数据存储区中，则返回对象实例，否则，使用所提供的数据创建一个新的数据
          if(person){
              return person;
          }else{
              newPerson  = new Person(data);
              people[newPerson.ssId] = newPerson;
              personCount++;
              return newPerson;
          }
      },
      //建立一个方法，以便获取对象个数
      getPersonCount:function(){
          return personCount;
      }
    };
}()),
    //为company类的对象创建一个相似的工厂，按name保存公司数据
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
    创建一个对象，当中提供了保存员工数据的方法以及按员工的employeeID来返回每个对象的方法
     */
employee = (function(){
    //声明一个变量，作为数据存储区来存放所有创建的员工对象
    var employees={},
        employeeCount = 0;
    return{
        //建立一个方法，用于往数据存储区添加员工对象，把参数所提供的数据传入Person和Company所对应的工厂，保存所生成的对象至本地数据存储区
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
        //建立一个方法，用于根据员工的employeeID来返回员工的名称--从相关的Person对象中获取人名数据
        getName:function(employeeId){
            return employees[employeeId].person.name;
        },
        //建立一个方法，用于根据员工的employeeId来返回员工的职位
        getOccupation:function(employeeId){
            return employees[employeeId].occupation;
        },
        //建立一个方法，用于返回员工所任职的公司的地址---从相关的company对象获取有关的数据
        getCompany:function(employId){
            var company = employees[employId].company;
            return [company.name,company.address,company.country].join(',');
        },
        //建立一个功能性方法来获取已经创建员工的数量
        getTotalCount:function(){
            return employeeCount;
        }
    };
}());

//创建四个员工对象
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