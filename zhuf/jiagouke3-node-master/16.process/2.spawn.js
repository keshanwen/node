// node中提供了 child_process 作为创建子进程的模块s

const { spawn } = require('child_process'); // 产卵
const path = require('path')
// 使用流的好处就是可以输出一点拿到一点，坏处就是写起来麻烦

// process.stdin  // 用户的标准输入  0
// process.stdout // 用户的标准输出  1
// process.stderr // 用户的错误输出  2  fs.open(function(fd){})

// node ./worker/sum.js  
const cp = spawn('node', ['sum.js','a','b','c'], { // fs.createReadStream
    cwd: path.resolve(__dirname, 'worker'),
    // stdio:'ignore' // 忽略子进程的输出
    // stdio: 'inherit' // 将子进程中的process 改为了父进程的process 方便输出
    // 我们可以通过数组的方式指定stdio  也可以通过 inherit来默认指定
    stdio:['pipe','pipe',2] // 共享错误输出 但是标准输入和标准输出之间建立一个管道
});
cp.stdout.on('data',function(data){
    console.log(data.toString())
})
cp.stdin.write('父给子数据')

cp.on('error', function(err) {
    console.log(err)
})
cp.on('exit', function() {
    console.log('子进程退出了')
})
cp.on('close', function() {
    console.log('子进程关闭')
})