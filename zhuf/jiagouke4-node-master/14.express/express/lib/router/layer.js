const pathToRegExp = require('path-to-regexp')
function Layer(path, handler) {
    this.path = path;
    this.handler = handler;

    // 所有的layer中都会存放路径 ， 我就将这个路径转成正则
    this.keys=[]

    this.regExp = pathToRegExp(this.path,this.keys,true);

}
Layer.prototype.match = function (pathname) {

    // 如果是路由 恒等是可以的 /a  /a
    // 中间件只要是/ 就都满足
    // 中间件 /a   访问的是/a/b  也是可以的

    if (this.path === pathname) {
        return true; // 写的路径和访问的路径一致都是可以访问的
    }

    let matches = pathname.match(this.regExp); // 用请求的路径和正则进行匹配

    if(matches){
        let params = this.keys.reduce((memo,key,index)=>(
            memo[key.name] = matches[index+1],memo
        ),{});

        this.params = params;
        
        
        return true;
    }


    if (!this.route) { // 中间件
        if (this.path == '/') {
            return true
        }
        // /a/b    /a/
        return pathname.startsWith(this.path + '/')
    }

    // 都可以在这里维护 路径的匹配流程
    return false;
}
Layer.prototype.handle_error = function(err,req,res,next){
    if(this.handler.length === 4){ // 错误中间件
        this.handler(err,req,res,next)
    }else{
        next(err); // 不是错误就向下执行
    }
}
Layer.prototype.handle_request = function (req, res, next) {
    // todo..
    return this.handler(req, res, next)
}
module.exports = Layer;