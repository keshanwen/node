const url = require('url');
const Layer = require('./layer'); // 用来存放路径和处理函数的 , 在路由系统中的layer都配置一个route
const Route = require('./route');
const methods = require('methods')

function Router() { // 是类也是函数 es6 class无法实现的
    this.stack = []
}
Router.prototype.route = function(path) { // 先创建route 在创建layer
    let route = new Route(); // 构建route
    let layer = new Layer(path, route.dispatch.bind(route)) // 构建layer
    layer.route = route; // 创建layer和route之间的关联
    this.stack.push(layer); // stach = [layer,layer]
    return route
}
methods.forEach(method => {
    Router.prototype[method] = function(path, handlers) {
        let route = this.route(path);
        route[method](handlers); // 外层的路由栈中没有存放方法
    }
});

Router.prototype.handle = function(req, res, done) {
    // 需要匹配路由  根据请求路径来依次匹配
    let { pathname } = url.parse(req.url);
    let idx = 0;
    const next = () => {    
        if(idx >= this.stack.length) return done()
        let layer = this.stack[idx++]; // 获取栈中的第一个layer
        if(layer.match(pathname)){ // 路径匹配到了
            // 如果方法也匹配才执行
            if(layer.route.handle_method(req.method.toLowerCase())){
                layer.handle_request(req, res, next); // route.dispatch, dispatch中内部调用了next就会从里面出来
            }else{
                next();
            }
           
        }else{
            next(); // 没有匹配到就找下一个
        }
    }
    next()

}
module.exports = Router