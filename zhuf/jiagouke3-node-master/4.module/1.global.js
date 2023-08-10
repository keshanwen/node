// 默认情况下在文件中可以直接使用 module,exports,require,__filename,__dirname 都可以直接使用， 模块在加载的时候会将这些参数传入

// process  setImmediate  Buffer


// 我们的node程序是运行在进程上的

// console.log(Object.keys(process)) // nextTick 'cwd', 'env', 'argv',



// cwd 当前进程执行命令所在的目录   当前工作目录 current working directory
const path = require('path');
// console.log(path.resolve('a.js'))
// console.log(process.cwd()); // 这个工作目录是可以变的  __dirname 死的


// 运行webpack的时候会在当前运行的目录下查找配置文件 （cwd（） 返回的是一个绝对路径）

// 环境变量  (全局环境变量 （一般情况下不会使用全局）  临时的环境变量 （开发的时候会针对不同的环境去打包）)
const env = process.env; // cross-env (第三方的 帮我们做了兼容性处理， 因为window下和mac下定义临时环境变量方法不一样  SET XXX=100 ,  export XXX=200)

// 根据环境变量的设置去判断不同的环境
// if(process.env.NODE_ENV === 'production'){
//     console.log('生产环境'); // vue中弄的环境变量就是把.env 文件读取出来放到process.env上
// }else{
//     console.log('开发环境')
// }
// 运行完毕后，关掉命令行窗口环境变量就消失了



// 除了通过环境变量来区分环境，还可以通过执行命令参数来区分

// node 1.global.js --target test

// 我们希望将结果变成对象
// let args = process.argv.slice(2).reduce((memo,current,index,arr)=>{
//     if(current.startsWith('--')){
//         memo[current.slice(2)] = arr[index+1]
//     };
//     return memo
// },{});
// 在开发的时候 想获取用的参数，是通过一些第三方包来使用的
// commander 命令行管家，专门来解析命令行参数的
// yargs webpack使用的命令行解析包
// minimist 实现参数解析


// const { program } = require('commander');
// program
//     .name("my-zf")
//     .usage("[options] ");

// program.version('2.0.0')
// program.option('-p|--port <v>', 'set port')
// program.option('-t|--target <v>', 'set target')
// program.command('create [projectname]').action((args) => {
//     console.log(args)
// })
// program.parse(process.argv); // 解析用户执行时携带的参数
// console.log(program.opts())

// 可以帮我们解析参数 和 生成命令行文档


// node中新增了两个方法 nextTick， 另一个是 setImmediate
// node中的事件环 浏览器的事件环是 一个宏任务队列，每次执行的时候还会产生一个微任务队列。 执行的过程中就是每次清空所有的微任务，执行一个宏任务  i/o操作  关闭事件 socket.close()  setTimeout

// 和浏览器执行结果是一致的  node10以上


// 1.默认第一个宏任务执行完毕后会调用nextTick中的所有方法
// 2.当执行下一个宏任务之前会清空微任务队列
// 3.依次取出队列中的宏任务执行，如果队列为空会进入到node事件环的下一个队列
// 4.当走到poll阶段的时候 默认会检测后续是否有setImmediate 如果没有就在这个poll 阶段里阻塞，等待定时器到达在继续执行


const fs = require('fs');
fs.readFile('./a', function() {
    setTimeout(() => { // 受到了node性能的约束，
        console.log('timer')
    }, 0);
    setImmediate(() => {
        console.log('setimmediate')
    })
})
// poll 阶段执行完毕后会检测check 阶段中是否有内容，如果有则先执行check阶段

// EventLoop
// timer 定时器的
// poll 轮训阶段 主要执行i/o操作，如果没有其他逻辑会再次阻塞，等待时间到达，开启下一轮轮训
// check setImmeidate  


Promise.resolve(100).then(()=>{
    console.log('promise-then')
})
process.nextTick(()=>{ // 这个的执行时机 是高于promise的
    console.log('nextTick')
})