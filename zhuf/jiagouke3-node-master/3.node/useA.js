let r = require('./a'); // 内部会自动添加后缀来查找 .js, 如果没有会加.json
console.log(r)

console.log(MY); //污染了全局变量


// 在require的时候就会读取文件，将文件包裹成一个函数，并且返回module.exoorts结果
// let r = function(module,exports,require,__dirname,__firname){
//     const a = 100;
//     module.exports = a;
//     global.MY = 'xxx'
//     return module.exports
// }(module,exports,require,__dirname,__firname)


// 分析源代码： 调试
// 1.直接在浏览器中进行调试  node  --inspect-brk useA.js   chrome://inspect/#devices  调试一些包为了方便 我们可以采用这种 
// 2.在命令行中调试  X 
            
// 3.直接在编辑器中调试  1.找到运行和调试 2.创建一个launch.json 3.删除 skip internal 否则调试源代码

// require方法最后返回的是module.exports
// 1.断点到require方法  Module._load 进行模块的加载
// 2. 根据路径 解析Module._resolveFilename 就是将一个文件解析成一个绝对路 并且尝试添加后缀
// 3.为了防止重复加载模块 实现了缓存的功能，缓存是根据路径来缓存的，没有缓存跳过
// 4.判断是不是原生模块， 不是跳过
// 5.new Module 创建模块 （id：文件名 , exports 默认空对象）
// 6.缓存模块
// 7.加载模块 （目的是读取文件，将文件的结果放到module.exports上）
//    1.取出文件的后缀名
//    2.通过Module._extensions查找对应的加载策略
//    3.读取文件的内容 并且包装了一个函数
//    韩式执行 const a = 100;module.exports = a;
// 最终返回module.exports 对象   最终返回的就是module.exports对象

// module.exports  和 exports 关系是 等价的


// 模块中的this指向exports对象
// exports 是module.exports 的别名 指向了同一个人
// this = exports = module.exports = {}

// 周末 ： eventLoop 手写commonjs模块实现 ，内置模块， npm 。 buffer ，fs 