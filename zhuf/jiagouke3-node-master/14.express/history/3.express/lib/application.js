const http = require('http')
const methods = require('methods')
const Router = require('./router/index.js');

// 我期望将应用和路由本身进行分离
function Application() {
   
}
Application.prototype.lazy_route = function(){
    if(!this.router){
        this.router = new Router;
    }
}
methods.forEach(method=>{
    Application.prototype[method] = function(path, ...handlers) { // 订阅路由
        this.lazy_route()
        this.router[method](path,handlers)
    }
})
Application.prototype.listen = function() {
    let server = http.createServer((req, res) => {
        // 如果路由匹配不到，应用应该主动的返回找不到
        function done(){ // 如果路由系统无法处理这个请求，那么就调用done方法 交给应用来处理
            res.end(`Cannot ${req.method} ${req.url}`)
        }
        this.lazy_route();
        this.router.handle(req, res,done)
    });
    server.listen(...arguments)
}
module.exports = Application