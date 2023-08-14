const jwt = require('jsonwebtoken');
import { v4 as uuidv4 } from 'uuid';

// app.js
module.exports = app => {
    app.passport.verify(async (ctx, user) => {
        // 从数据库中查找用户信息
        try {
            const existsUser = await ctx.service.oauth.getOAuthUser(user);
            const token = jwt.sign(existsUser, app.config.keys, {expiresIn: '7 days'});
            ctx.cookies.set('token', token, {
                path:'/',
                maxAge: 24 * 60 * 60 * 1000,
                // 注意点: 如果httpOnly: true, 那么前端是无法获取这个cookie
                httpOnly: false,
                signed:false,
            });
            return existsUser;
        }catch (e) {
            const userInfo = {
                username: uuidv4() ,
                password:'com.123456',
                github: 1
            };
            const newUser = await ctx.service.user.createUser(userInfo);
            const oauthInfo = {
                accessToken: user.accessToken,
                provider: user.provider,
                uid:user.id,
                userId:newUser ? newUser.id : -1
            };
            await ctx.service.oauth.createOAuth(oauthInfo);
            const token = jwt.sign(newUser, app.config.keys, {expiresIn: '7 days'});
            ctx.cookies.set('token', token, {
                path:'/',
                maxAge: 24 * 60 * 60 * 1000,
                // 注意点: 如果httpOnly: true, 那么前端是无法获取这个cookie
                httpOnly: false,
                signed:false,
            });
            return newUser;
        }
    });
};
