const http = require('http');

// 我们为了提高性能可以在node中开启子进程 专门做一些运算的处理，最后再将结果传递给主进程
const server = http.createServer((req,res)=>{
    if(req.url === '/sum'){ // node中的线程交互 可以利用事件环 回调
        let sum = 0;
        for(let i = 0; i < 100  * 10000;i++){
            sum += i;
        }
        res.end('total', sum)
    }else{
        res.end('other')
    }
});

server.listen(5000);


// npm install pm2 -g
// pm2 start 1.server.js --name xxx
// pm2 restart 1.server.js / pm2 restart xxx
// pm2 stop 编号
// pm2 delete 0
// pm2 start 1.server.js --watch 监控文件变化
// pm2 logs 可以查看日志 
// pm2 start 1.server.js -i max


// 初始化配置文件 pm2 init 可以初始化配置文件  cluster:4

