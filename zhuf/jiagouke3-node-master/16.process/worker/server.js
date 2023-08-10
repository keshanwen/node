const http = require('http')

process.on('message',function(message,server){
    console.log(process.pid,'child')
    http.createServer((req,res)=>{  
        res.end('child'+ process.pid)
    }).listen(server);
})