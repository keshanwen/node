const http = require('http')
const methods = require('methods')
const Router = require('./router/index.js');
// 我期望将应用和路由本身进行分离
function Application() {
   
}
Application.prototype.lazy_route = function(){
    if(!this.router){
        
        this.router = new Router;

        // 这里会内置中间件 路由加载完毕后 就会默认添加一个中间件
        this.use((req,res, next) => {
            req.path = require('url').parse(req.url).pathname
            req.query = require('url').parse(req.url,true).query
            res.mySend = function(data){
                if(typeof data === 'object'){
                    res.setHeader('Content-Type','application/json');
                    res.end(JSON.stringify(data))
                }else if(typeof data === 'string' || Buffer.isBuffer(data)){
                    res.end(data);
                }
            }
            res.sendFile = function(filePath){
                // mime模块增加header
                require('fs').createReadStream(filePath).pipe(res);
            }
            next(); // 扩展后执行后面的逻辑
        })
    }
}
methods.forEach(method=>{
    Application.prototype[method] = function(path, ...handlers) { // 订阅路由
        this.lazy_route()
        this.router[method](path,handlers)
    }
})
Application.prototype.param = function(key,cb){
    this.lazy_route()
    this.router.param(key,cb); // 订阅函数
}
Application.prototype.use = function(){
    this.lazy_route(); // 实现一个路由懒加载
    this.router.use(...arguments)
}
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