const http = require('http');

const server = http.createServer(function(request,response) {
  response.writeHead(200,{'Content-Type': 'text/plain'});
  response.end('Hello Node.js');
})

server.listen(3000,'localhost');

server.on('listening',function() {
  console.log('server is listening')
  server.close()
})

server.on('connection',function() {
  console.log('client is connected')
})

server.on('close',function() {
  console.log('server is closed')
})

console.log('node server started on port 3000')