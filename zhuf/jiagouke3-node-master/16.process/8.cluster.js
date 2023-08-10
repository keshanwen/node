const cluster = require('cluster'); // 多个人做同一件事  多个进程
const http = require('http')
const path = require('path');
const cpus  = require('os').cpus()

if(cluster.isMaster){ // 默认执行肯定是主进程
    for(let i = 0 ; i < cpus.length;i++){
        cluster.fork(); // child_process.fork
    }
}else{
    // 调用fork的时候 会默认让此文件再次执行 但是这时候isMaster为false
    const server = http.createServer((req,res)=>{  
        res.end('child'+ process.pid)
    })
    server.listen(4000); // 不是同一个服务 被监听多次，而是只有一个服务，负责分发
}
// 集群如何实现的？
// 多个进程监听同一个端口 不会导致端口重用吗
// 内部是如何实现控制负载均衡  （默认采用轮训， window比较特殊）

// 1.实现的时候 内部创建子进程用的是fock
// 2.如何判断是子进程还是父进程的 NODE_UNIQUE_ID 如果有这个值则是子进程 否则是父进程
// 3.node中创建服务时 会调用listen方法，那么这个listen方法会方法listenInCluster
// 4.创建服务时 会判断，如果是主进程直接就正常的创建服务，如果是子进程那么不能去创建真实的服务，因为会导致端口重复占用， 子进程会将创建的信息传递给父进程让父进程创建一个应用 ， 稍后请求到来的时候会访问到主应用中，主应用在分配给每个子进程  (只是起了一个服务，之后主进程将任务分配给每个子进程)



// pm2 进程管理