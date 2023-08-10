// let a = require('./a'); // 尝试添加.js .json
// console.log(a);

// 1.内部会先将a这个路径转化成绝对路径，并且尝试添加.js 和 .json , 如果文件无法找到则报错
// 2.查看这个文件是否被缓存过
// 3.创建这样一个模块 {id:绝对路径,exports:{}} exports对象存着对象最终导出的结果
// 4.将模块缓存起来 （主要缓存的就是exports对象）
// 5.最终返回module.exports对象


// 有了模块后会进行模块的加载 
// 1.解析文件的后缀，根据不同的策略来进行加载
// 2.可以直接读取文件，读取到文件后，会包装成一个函数
// 3.让函数执行，让用户把结果放到了 module.exports 上
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function Module(id) {
    this.id = id; // 模块里面最重要的两个属性 一个是路径 一个是导出对象
    this.exports = {}
}

// 前端实现模块化 需要通过script标签加载内容 

Module._wrapper = ['(function(exports,module,require,__dirname,__filename){','})']
Module._extensions = {
    '.js'(module) {
        let script = fs.readFileSync(module.id, 'utf8');
        script = Module._wrapper[0] + script + Module._wrapper[1];
        let fn = vm.runInThisContext(script);
        let exports = module.exports; // exports 是module.exports的别名
        let dirname = path.dirname(module.id);
        fn.call(exports,exports,module,req,dirname,module.id); // module.exports赋值这回是用户主动赋值的  
    },
    '.json'(module) {
        let jsonString = fs.readFileSync(module.id, 'utf8');
        module.exports = JSON.parse(jsonString); // =内部会将json赋予到module.exoorts
    }
}
Module._resolveFilename = function(id) { // __dirname 这个就是指代的当前文件所在的绝对路径
    let filepath = path.resolve(__dirname, id); // 文件在解析的过程中默认是根据当前执行的路径来做的
    // 查看文件路径是否存在
    let exists = fs.existsSync(filepath);
    if (exists) return filepath;

    // 需要尝试给路径添加后缀 ， 策略模式不同的后缀加载策略是不同的
    let exts = Object.keys(Module._extensions);
    for (let i = 0; i < exts.length; i++) {
        let newPath = filepath + exts[i]; // 尝试添加后缀进行路径查找 
        if (fs.existsSync(newPath)) return newPath; // 找到一个后就return了
    }
    throw new Error('module not found')
}
Module._cache = {}; // 造缓存
Module.prototype.load = function(id) {
    let ext = path.extname(id); // 找到文件的后缀名
    Module._extensions[ext](this); // 根据后缀名进行加载
}
function req(id) {
    let modulePath = Module._resolveFilename(id); // 根据用户传入的id 生成一个模块路径，用于缓存
    let existsModule = Module._cache[modulePath]
    if(existsModule) return existsModule.exports; // 由于用户已经在第一次加载完毕后将exports 放在了上面，下次加载的时候 用上一次的就可以了
    let module = new Module(modulePath); // {id:xxx,exports:xxff00 -> {a}}
    Module._cache[modulePath] = module;
    module.load(modulePath); // 用户会给module.exports 赋予结果
    return module.exports; // 最终就是返回module.exports 对象
}
let a = require('./a');
// a.n = 1000;
setInterval(() => {
    a = require('./a');
    console.log(a) 
}, 1000);

// 如果module.exports 导出的是一个具体的值对象，多次应用 不会发生变化
// 如果导出的是一个引用值，那么多次引用拿到的是同一个引用值，引用值的内部变化，我是可以监控到的


// >  文件模块的核心就是将文件读取出来 给module.exports 赋值