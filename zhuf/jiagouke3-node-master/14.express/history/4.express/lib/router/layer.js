const pathToRegExp = require('path-to-regexp')
function Layer(path, handler) {
    this.path = path;
    this.handler = handler;

    this.regExp = pathToRegExp(path,(this.keys = []));
    this.keys = this.keys.map(item=>item.name)
    
}
// 层的匹配方法
Layer.prototype.match = function(pathname) {
    if (this.path == pathname) { // 路径一样就执行
        return true;
    }
    let matches = pathname.match(this.regExp);
    if(matches){
       let values = matches.slice(1);
       // layer.params
       this.params = this.keys.reduce((memo,key,index)=>(memo[key]=values[index],memo),{});
       return true
    }



    // 如果是中间件的话 只要路径是 /就能匹配到
    if (!this.route) { // app.use('/a/')   /a/b    pathname.startsWith(this.path+'/')
        if (this.path === '/') {
            return true;
        }
        return pathname.startsWith(this.path + '/')
    }
    return false
}
Layer.prototype.handle_error = function(err,req, res, next) {
    if (this.handler.length === 4) {
        this.handler(err,req, res, next)
    } else {
        next(err);
    }
}
Layer.prototype.handle_request = function(req, res, next) { // 对外暴露的方法

    // todo...
    this.handler(req, res, next)
}
module.exports = Layer