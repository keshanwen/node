class Layer {
    constructor(path, callback, method) {
        this.path = path;
        this.callback = callback;
        this.method = method;
    }
    match(path, method) {
        return this.path == path && this.method == method
    }
}
class Router {
    constructor() {
        this.stack = []
    }
    compose(matchLayers, ctx, next) {
        const dispatch = (i) => {
            if (i === matchLayers.length) return next();
            let callback = matchLayers[i].callback;
            return Promise.resolve(callback(ctx, () => dispatch(i + 1)))
        }
        return dispatch(0)
    }
    routes() {
        return async (ctx, next) => { // 请求到来会执行此方法
            let path = ctx.path; // 请求路径
            let method = ctx.method.toLowerCase();

            let matchLayers = this.stack.filter(layer => layer.match(path, method));
            // 组合所有的layer 都匹配不到走原生koa中的下一个中间件
            this.compose(matchLayers, ctx, next)
        }
    }
}
;['get', 'post', 'put', 'delete'].forEach(method => {
    Router.prototype[method] = function(path, callback) {
        this.stack.push(new Layer(path, callback, method))
    }
})

module.exports = Router;


