function Layer(path,handler){
    this.path = path;
    this.handler = handler;
}
// 层的匹配方法
Layer.prototype.match = function(pathname){
    // todo...
    return this.path == pathname
}
Layer.prototype.handle_request = function(req,res,next){ // 对外暴露的方法

    // todo...
    this.handler(req,res,next)
}
module.exports = Layer