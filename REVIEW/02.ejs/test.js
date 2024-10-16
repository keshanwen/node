/*


事件环  每次执行会清空微任务队列  取出一个宏任务执行 
微任务 promise.then  MutationObserver (process.nextTick) 
宏任务 setTimeout setImmediate ui渲染 script执行 。。。。 （requestFrameAnimation, requestIdleClalback）

异步的
(requestFrameAnimation, requestIdleClalback） 这两个和ui渲染有关 （渲染是在微任务之后，其他的宏任务也是在微任务之后） 这俩方法就暂且算成宏任务 


node中概念 能做什么事。。。 ssr  中间层 工具
node中的global  和 浏览器的window 
node中实现了模块化机制  会给每个文件增加一个函数 函数中有五个参数 exports module require __dirname __filename

核心模块 fs (readFileSync exitsSync) path (resolve,join,dirname) vm (runInThisContext, eval , newFunction 在模板引擎中经常使用)

new Function 在模板引擎中的使用是非常多的 （实现一个自己的模板引擎）

vue 中的  {{}} 模板引擎  `${}`  ejs jade underscore handlebar pug nunjuncks。。
*/ 


