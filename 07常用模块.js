const util = require('util');
const path = require('path');
const dns = require('dns');

const obj = {
  name: 'zhangsan',
  address: 'nanchang',
  age: 25,
  married: false,
  getAge: function () {
      return this.age;
  }
};

const str = util.inspect(obj,{
  'colors': true
})

const outputPath = path.join(__dirname,'myDir','hello.js')

const extInfo = path.extname(path.join(__dirname,'myDir','hello.js'))

const filePath = '/Users/helloworld/node/test.js';

const fileObj = path.parse(filePath);

const domain = 'www.sohu.com';

dns.resolve(domain,function(error,address){
  if (error) {
    console.log(error)
    return
  }
  console.log(address)
})

dns.reverse('114.114.114.114',function(error,domain){
  console.log(domain)
})