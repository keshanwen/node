const http = require('http')
const url = require('url');
// 1.koa采用的是es6类来编写的
// 2.express采用的是构造函数es5来编写的
let routes = [{
    path: '*',
    method: '*',
    handler(req, res) {
        res.end(`Cannot ${req.method} ${req.url}`)
    }
}]
function createApplication() {
    return {
        get(path, handler) { // 订阅路由
            routes.push({
                path,
                method: 'get',
                handler
            })
        },
        listen() {
            let server = http.createServer(function(req, res) {
                let { pathname, query } = url.parse(req.url, true);
                let requestMethod = req.method.toLowerCase();
                // 匹配路由
                for (let i = 1; i < routes.length; i++) {
                    let {path,method,handler} = routes[i];

                    if(path == pathname && method === requestMethod){
                        return handler(req,res)
                    }
                }
                // 如果找到对应的路由就执行默认路由
                routes[0].handler(req,res)

            });
            server.listen(...arguments)
        }
    }
}

module.exports = createApplication