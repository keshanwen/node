/*
  CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个模块文件lib.js的例子。

*/
let mod = require('./b')


console.log(mod.counter)
mod.incCounter()
console.log(mod.counter)