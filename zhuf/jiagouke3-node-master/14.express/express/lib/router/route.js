const Layer = require('./layer')
const methods = require('methods')

function Route() {
    this.stack = []
    this.methods = {}; // 用来标识这个route里面有哪些方法
}
Route.prototype.handle_method = function(method) {
    return this.methods[method]
}
Route.prototype.dispatch = function(req, res, out) {
    let idx = 0;
    const next = (err) => {
        if (err) {
            return out(err); // 最终的错误处理都交给路由层来处理
        }
        if (idx >= this.stack.length) return out();
        let layer = this.stack[idx++];
        if (layer.method === req.method.toLowerCase()) {
            layer.handle_request(req, res, next); // 匹配到后调用用户自己的逻辑
        } else {
            next(); // 无法匹配就跳过
        }
    }
    next()
}
methods.forEach(method => {
    Route.prototype[method] = function(handlers) { // 这里存放所有的处理函数 用户真实的处理函数
        handlers.forEach(handler => {
            let layer = new Layer('', handler);
            layer.method = method; // 内部的layer需要记录自己是什么方法
            this.methods[method] = true;
            this.stack.push(layer); // 将用户真实的回调组装成layer 放到栈中
        })

    }
});

module.exports = Route