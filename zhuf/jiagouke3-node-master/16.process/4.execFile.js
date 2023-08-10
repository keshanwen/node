const {execFile,spawn,fork,exec} = require('child_process');
const path = require('path');

// 在node里启动子进程 定时爬数据， 批量执行打包操作， 执行一些sh脚本 会用到

// execFile 执行的时候会传递一个最大的输出限制 maxBuffer 
// shell 这个命令不在命令行中执行  shell：false ,传递的参数的方式是数组

// const cp = execFile('node',['--version'],{
//     cwd:path.resolve(__dirname,'worker')
// },function(err,stdout,stderr){ // 回调不支持大的输出，大的输出得用流
//     console.log(err)
//     console.log(stdout)
// })

const cp = exec('path',{ // 注意这种方式不要直接将用户的输入作为结果，可能会导致危险操作
    cwd:path.resolve(__dirname,'worker')
},function(err,stdout,stderr){ // 回调不支持大的输出，大的输出得用流
    console.log(err)
    console.log(stdout)
})

// cp.stdout.on('data',function(chunk){
//     console.log(chunk.toString())
// })

// process 中就这5个方法 spawn fork execFile exec  execFileSync
// 父进程如果挂了 子进程一定会终止