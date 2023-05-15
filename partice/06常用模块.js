const url = require('url');
const querystring = require('querystring');

const urlString = 'http://www.test.com?orderId=12345';
const urlObject = {
  'host': 'www.test.com',
  'port': 80,
  'protocol': 'http',
  'search': '?order=12345',
  'query': 'order=12345',
  'path': '/'
};
const str = 'name=zhangsan&address=xiamen';
const obj = {
  name: 'zhangsan',
  address: 'xiamen'
};


//const urlAddress = url.resolve('http://www.test.com', 'order'); 拼接成url
//const urlObject = url.parse(urlString);  将字符串转换成url
//let realAddress = url.format(urlObject)  将对象拼接成url
//const obj = querystring.parse(str);  类比 JSON.parse()
//const result = querystring.stringify(obj); 类比JSON.stringfy()



