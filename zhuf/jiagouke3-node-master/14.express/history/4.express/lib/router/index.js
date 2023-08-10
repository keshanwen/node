const url = require('url');
const Layer = require('./layer'); // 用来存放路径和处理函数的 , 在路由系统中的layer都配置一个route
const Route = require('./route');
const methods = require('methods')

function Router() { // 如果一个类返回了一个函数 那我们new的时候就会采用这个函数作为this
    let router =  (req,res,next)=>{ // 引用类型
        // 如果是article 应该交给article来处理 
        // 如果是user  交给user来处理
        router.handle(req,res,next)
    }
    router.stack = []; // 自定义属性
    router.__proto__ = proto
    return router;
}
let proto = {}
// 下午 讲中间件 正则路由 二级路由  参数解析 其他中间件
proto.use = function(path, handler) {
    if (typeof handler !== 'function') {
        // 没传递path
        handler = path;
        path = '/'
    }
    let layer = new Layer(path, handler);
    layer.route = undefined; // 我们判断这个layer是路由还是中间就可以看这个layer上是否有route属性
    this.stack.push(layer);
}
proto.route = function(path) { // 先创建route 在创建layer
    let route = new Route(); // 构建route
    let layer = new Layer(path, route.dispatch.bind(route)) // 构建layer
    layer.route = route; // 创建layer和route之间的关联
    this.stack.push(layer); // stach = [layer,layer]
    return route
}
methods.forEach(method => {
    proto[method] = function(path, handlers) {
        if(!Array.isArray(handlers)) handlers = [handlers]; // 不是数组就将handlers包装成数组
        let route = this.route(path);
        route[method](handlers); // 外层的路由栈中没有存放方法
    }
});
proto.handle = function(req, res, done) {
    // 需要匹配路由  根据请求路径来依次匹配
    let { pathname } = url.parse(req.url);  
    let idx = 0;

    let removed = ''; // 进到next之前需要把要删除的部分保留起来，走到下次的时候在加回来
    const next = (err) => { // 在中间件中调用next的时候传入错误
        if (idx >= this.stack.length) return done()
        let layer = this.stack[idx++]; // 获取栈中的第一个layer
        // 一种是路由的layer 另一种是中间件的layer

        if(removed.length > 0){ // 添加回去路径
            req.url = removed + req.url;
            removed = ''
        }

        if (err) { // 如果有错误要去找错误处理中间件
            if (layer.route) {
                next(err); // 遇到路由跳过 继续把错误向下传递
            } else {
                // 中间件
                layer.handle_error(err,req, res, next)
            }
        } else {
            if (layer.match(pathname)) { // 路径匹配到了  
                // 如果方法也匹配才执行
                // 如果是中间件 则不需要匹配方法 只有路由需要匹配方法
                req.params = layer.params;
                if (layer.route) {
                    if (layer.route.handle_method(req.method.toLowerCase())) {
                        layer.handle_request(req, res, next); // route.dispatch, dispatch中内部调用了next就会从里面出来
                    } else {
                        next();
                    }
                } else {
                    // 中间件
                    if(layer.handler.length == 4){ // 如果是正常情况执行遇到错误处理中间件 也需要跳过
                        next();
                    }else{
                        if(layer.path !== '/'){ // 在进入中间件之前把路径移除掉
                            removed = layer.path; // 保留要删除的部分    
                            req.url = req.url.slice(removed.length)
                        }
                        layer.handle_request(req, res, next);
                    }
                   
                }
            } else {
                next(); // 没有匹配到就找下一个
            }
        }



    }
    next()

}
module.exports = Router