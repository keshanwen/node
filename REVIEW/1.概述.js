/*
    所有的异步任务都是每次清空微任务，在去取一个宏任务

    浏览器多进程模型
        渲染进程： 执行js引擎， 执行绘制ui线程（js线程和ui渲染线程是互斥的）
        网络进程 存储  请求
        插件
        gpu进程
    
    webwork 创建的叫工作线程（计算，不能操作DOM）
    
    js 特点是单线程异步的（异步任务进行分类，底层实现肯定基于线程的）
        事件触发线程
        宏任务：
            执行 js 脚本是一个宏任务，ui渲染 Ajax 定时器，事件， MessageChannel,setImmediate 宏任务队列 “队列每次只能用一个”
        微任务：
            promise mutationObserver
     
    宏任务队列只有一个（消息队列，宏任务队列）       
*/ 
/*
    
   node是啥？
    - 就是js的一个运行时 ，可以让js运行在服务端 （js由什么组成 3部分 BOM DOM EC , NODE中不能使用BOM和DOM 只有ECMASCRIPT + 内置的模块 自己写的功能 + 第三方模块）

    - node 依旧是“主线程是”单线程的  （通常情况下 单线程 好处就是如果做的事简单 并发量高）


    类似于java，php 多线程同步模型 （感觉可以一起做多件事） 会浪费很多线程(内存) 可以利用线程池来优化. 对于多线程而言 操作同一个资源会有锁的问题  (多线程感觉是一起执行 对于单核cpu而言) 通过切换时间片达到同时执行  （优点就是：适合cpu密集型）  


    对于node而言 单线程模型  如果是这种（I/O密集型 比较适合） 通常情况下 好处是异步非阻塞


    异步同步 指的是调用方法的本身 （被调用方决定是不是异步）  fs.readFile writeFile 异步api
    阻塞和非阻塞指代的就是调用方的状态  


    > 处理高并发 nginx 单线程非阻塞处理


    ------------------------------------------------------------------------
    》 node一般做中间层  服务端渲染  前端有工具webpack   服务端接口 
                
*/ 

/*
    浏览器中的全局对象 window
    服务端可以直接访问 global

    模块中的 this 不是 global, 原因在于 node 中有天生的模块化规范 commonjs
    把每个文件都当做模块

    模块化规范有哪些
    umd amd  commonjs es6Module SystemJS  iife  (requirejs) cmd(seajs)
    amd define
    commonjs node中自己实现的
    umd 支持 amd + commonjs + global
    es6Module import export
    iife 立即执行函数 
    SystemJS 微前端 

    commonjs规范是node的  特点就是定义了 如何导入模块 和导出模块 定义模块
    导出统一采用 module.exports 来导出
    导入 require
    每一个js文件就是一个模块  每次引用文件的时候 都会在外层添加一个函数 并且改变this指向
    默认这个函数中也提供了几个参数 5个参数 不是global上的属性，但是在文件中可以直接访问 
    console.log(require) // 可以引入其他模块 
    console.log(module) // 当前模块对象
    console.log(exports) // 模块导出的结果 
    console.log(__dirname); // 绝对路径， 当前文件所在的文件夹
    console.log(__filename)// 当前文件绝对路径   这两个路径都无法更改
    在使用require的时候就被包裹了一层 函数 这里就有这五个参数

    node中常用的模块 fs (文件系统)  /  path (路径系统)
    const fs = require('fs'); // 内置模块 、 核心模块  require怎么实现的

    同步读取文件  什么时候用同步 同步的性能好 （缺陷阻塞） 当程序刚刚运行前 都可以采用同步 
    后面用http服务端的时候 我们需要 在回调中采用异步
    读取文件的时候如果文件不存在会发生异常

*/ 

const fs = require('fs')
const path = require('path')
const vm = require('vm')


// let r = fs.readFileSync('./note.md','utf-8')
//let exits = fs.existsSync('./note.md') // 这个方法的异步方法被废弃了 （异步的回调中 存在不存在，node中要求 error-first）
// console.log(exits)


// console.log(path.join(__dirname,'a','b','c','/')); // a\b\c\ 拼接路径的
// console.log(path.resolve(__dirname,'a','b','c','/')); // 解析出绝对路 也具备拼接的功能
// join就是拼接认/ resolve解析绝对路径 （以当前运行文件的目录来解析） 不认/
// console.log(path.dirname(__filename)); // __filename __dirname  取父路径的
// console.log(path.extname('a.min.js')); // 取扩展名 都是最后一个
// console.log(path.basename('a.min.js','.js'))

// 以后读取文件操作路径 尽量采用绝对路径

// let r = fs.readFileSync('./note.md','utf8'); // 用相对路径 会由于执行的路径发生变化导致问题
// console.log(r);


// 如何将一个字符串执行？ 
// eval  会引用上级作用域的变量   适合简单的js执行  不依赖上下文变量

// new Function （） 会创造一个和全局平级的执行环境  也会引用上级变量



// const vm = require('vm'); // 虚拟机模块  a b 两个模块没有关系

// var a = 100; // 没有window
// vm.runInThisContext('console.log(a)'); // 实现一个 安全的执行，但是挂载全局上已经可以获取到
// 我期望执行代码的时候 在一个干净的环境下执行代码 而不依赖当前的上下文

// var a = 100
// global.a = 24
// vm.runInThisContext('console.log(a)')

// fs.readFileSync fs.existsSync
// path.resolve path.join path.extname path.basename


