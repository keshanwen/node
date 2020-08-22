const http = require('http');

let responseData = '';

/** 
  http.request({
    'host': 'localhost',
    'port': '3000',
    'method': 'get'
  },function(response) {
    response.on('data',function(chunk) {
      responseData += chunk;
    })
    response.on('end',function() {
      console.log(responseData)
    })
  }).end()
*/


const options = {
  'host': 'localhost',
  'port': '3000'  
}

const request = http.request(options)

request.on('response', function(response) {
  response.on('data',function(chunk) {
    responseData += chunk
  })

  response.on('end',function() {
    console.log(responseData)
  })
}).end()