const jwt = require('jsonwebtoken');
module.exports = (options, app) => {
    return async function (ctx, next) {
        // 1.获取需要权限控制的路由地址
        const authUrls = options.authUrls;
        // 2.判断当前请求的路由地址是否需要权限控制
        if(authUrls.includes(ctx.url)){
            // 需要权限控制
            // 3.获取客户端传递过来的JWT令牌
            const token = ctx.get('authorization');
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
