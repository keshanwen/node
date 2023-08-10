module.exports = function(){
    return async(ctx,next)=>{
        // cors 跨域 运行浏览器跨域访问
        ctx.set('Access-Control-Allow-Origin',ctx.headers.origin); // 等价*
        ctx.set('Access-Control-Allow-Headers','Content-Type'); // 运行浏览器设置自定义的header
        ctx.set('Access-Control-Max-Age','10'); // 10s内不要再次发送试探请求  
        ctx.set('Access-Control-Allow-Methods','PUT,DELETE,POST,GET,OPTIONS')
        ctx.set('Access-Control-Allow-Credentials',true); // 如果允许携带cookie 就不能配置*
        if(ctx.method === 'OPTIONS'){
            return ctx.body = ''; // 表示允许访问
        }
        return next();
    }
}