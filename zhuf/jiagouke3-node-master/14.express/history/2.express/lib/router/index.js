const url = require('url');
function Router() { // 是类也是函数 es6无法实现的
    this.routes = []
}
Router.prototype.get = function(path,handler){
    this.routes.push({
        path,
        method: 'get',
        handler
    })
}
Router.prototype.handle = function(req, res,done){
    let { pathname, query } = url.parse(req.url, true);
    let requestMethod = req.method.toLowerCase();
    // 匹配路由
    for (let i = 1; i < this.routes.length; i++) {
        let { path, method, handler } = this.routes[i];

        if (path == pathname && method === requestMethod) {
            return handler(req, res)
        }
    }
    done()
}
module.exports = Router