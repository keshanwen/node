const {fork} = require('child_process');
const http = require('http')
const path = require('path');
console.log('main',process.pid)
const server = http.createServer((req,res)=>{  // 内部其实就是共享了处理函数，请求到来的时候会分配给每个进程 实现负载均衡  
    res.end('main'+ process.pid)
}).listen(3000);


// 多个进程来处理请求  他们可以共享同一个服务

const cpus  = require('os').cpus()
for(let i = 0; i < cpus.length ;i++){ // 一般开启的是 cpu内核格式 - 1
    let cp = fork('server.js',{cwd:path.resolve(__dirname,'worker')});
    cp.send('server',server);
}   
// node中有一个现成的解决方案 ，不用自己来实现