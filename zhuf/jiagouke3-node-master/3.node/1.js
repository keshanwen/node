// 在浏览器中全局对象是 window
// 在服务器中全局对象是 global

// 全局对象意味着可以直接访问，不通过global.xxx
// console.dir(global,{showHidden:true}); // 默认js中的内容都可以正常访问,不能访问BOM和DOM

// console.log(this); // 这里的this是一个空对象 

// node中有五个属性可以直接访问到 但是不是global上的属性
// require module exports  __dirname __filename

// console.log(require)
// console.log(module)
// console.log(exports)
// console.log(__dirname); // 表示当前文件所在的文件夹 是一个绝对路径
// console.log(__filename) // 表示当前文件的路径  是一个绝对路径


// 这5个属性 都是通过函数参数传进来的 （node是基于commonjs规范的）

// 常用的模块规范有 ESModule （export import） 在node中默认是不支持的
//                commonjs Node中自己提出来的 为了实现模块共享和引用模块的
//                umd模块 统一模块
//                AMD / CMD 这两种模块规范已经是过去式了

// commonjs模块的定义  模块化
// 在没有es6模块， 如何实现模块化呢？ 模块化他解决了什么问题？
// 模块的特点 互不影响 还能互相调用 （高内聚 低耦合）  解决命名冲突。 如果通过单例模式不能完全解决，变量名过长, IIFE来实现解决命名冲突问题


// 我们使用的fs、其他模块都是内置模块，就是内部提供好的

// 我们自己编写模块要遵循着三个原则
// 1.别人想用我这个模块 就需要通过require语法
// 2.我要给别人使用就将模块导出 module.exports
// 3.每一个文件都是一个模块


// 内置模块 、核心模块（天生的） 文件模块（我们自己的写的） 第三方模块（安装别人的co）



// 三个需要的模块 fs模块  path模块  模块内部使用了vm模块
const fs = require('fs'); // 同步的、异步的

// 所有的相对路径指的是代码的运行路径, 指代不明确
let r = fs.readFileSync('./note.md', 'utf8'); // 读取文件， 判断文件是否存在
let exits = fs.existsSync('./note.md'); // fs.exists 此方法被废弃了，因为会导致规格不统一, fs.access  fs.stat


const path = require('path'); // 可以用来处理路径的

// 如果只是拼接路径可以用join 如果要绝对路径可以使用resolve，但是遇到/的时候只能用join

console.log(path.join(__dirname, 'a', 'b', 'c', '../d', '/')); // 把路径拼接上即可 ，遇到../ 可以走到上一级
console.log(path.resolve(__dirname, 'a', 'b', 'c', '../d', './d/')); // resolve解析出一个绝对路径来 相对于当前文件夹的
console.log(path.dirname(__filename)) // == __dirname 
console.log(path.extname('a.min.js')); // 取文件后缀名 
console.log(path.basename('b.js', '.js')); // 根据扩展名 取 基本名字


const vm = require('vm'); // 虚拟机模块可以帮我们提供一个运行环境

// 如何让一个字符串执行
// eval 会导致共享变量， 所以执行代码时不采用他
// new Function 可以让代码变成函数 
// node自己弄了一个模块可以运行字符串 （沙箱环境 不会影响外界变量）

var a = 100
vm.runInThisContext('console.log(a)'); // 在一个全新的上下文中运行代码




// 什么时候用同步方法，什么时候用异步方法？
// 默认在程序运行之前我们都可以采用同步， 如果运行起来了 我们不希望阻塞主线程这时候就用异步, 同步性能高阻塞

// 1.fs.readFileSync
// 2.fs.exitsSync

// 1.path.resolve
// 2.path.join
// 2.path.extname / path.basename