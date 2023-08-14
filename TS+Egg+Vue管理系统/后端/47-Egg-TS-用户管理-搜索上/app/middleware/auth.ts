const jwt = require('jsonwebtoken');
module.exports = (options, app) => {
    return async function (ctx, next) {
        // 1.获取需要权限控制的路由地址
        const authUrls = options.authUrls;
        // 2.判断当前请求的路由地址是否需要权限控制
        if(authUrls.includes(ctx.url)){
            // 需要权限控制
            // 3.获取客户端传递过来的JWT令牌
            // 注意点: 如果设置cookie的时候没有签名, 那么获取的时候也要告诉egg不需要签名, 否则会获取不到
            const token = ctx.cookies.get('token', {
                signed: false,
            });
            // 4.判断客户端有没有传递JWT令牌
            if(token){
                try {
                    await jwt.verify(token, app.config.keys);
                    await next();
                }catch (e) {
                    ctx.error(400, '没有权限');
                }
            }else{
                ctx.error(400, '没有权限');
            }
        }else{
            // 不需要权限控制
            await next();
        }
    }
};
