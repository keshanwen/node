const http = require('http');
const querystring = require('querystring');
const url = require('url');
const userService = require('./userService');

const server = http.createServer(function(request,response) {
  let data = '';

  request.on('data',function(chunk) {
    data += chunk
  })

  request.on('end',function() {
    const requestUrl = request.url;
    const requestMethod = request.method;

    if (requestUrl.includes('login') && requestMethod === 'GET') {
      const requestParams = url.parse(requestUrl);
      console.log(requestParams);

      const queryObject = querystring.parse(requestParams.query)
      console.log(queryObject)

      const loginResult = userService.login(queryObject.username, queryObject.passwrod)
      console.log(loginResult,'loginResult')
      // 如果登录成功了，则输出200,
      response.writeHead(200,{'Content-Type': 'text/plain'});
      response.end('username: '+ queryObject.username+ 'password: '+ queryObject.passwrod)
    }
  })
})

server.listen(3000,function() {
  console.log('server is listening 3000')
})