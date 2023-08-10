const {execFile,spawn,fork,exec} = require('child_process');
const path = require('path');

// 用处比较小
const cp = spawn('node',['write.js'],{ 
    cwd:path.resolve(__dirname,'worker'),
    stdio:'ignore', // 忽略父子之间的所用通信
    detached:true
})
cp.unref(); // 彻底放弃和父进程的关系
cp.on('error',function(err){
    console.log(err)
})


// 10个项目 10个人 来做，每个做不同的项目 集群
// 10个项目 10个人 一个个来做 分布式
