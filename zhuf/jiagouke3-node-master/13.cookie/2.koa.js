const Koa = require('koa');
const Router = require('@koa/router');
const querystring = require('querystring');
const crypto = require('crypto')
// TWz2cWOEAm8wPGpLl4gOBNBz8n0k6DllOJDOVsjqQjs
const app = new Koa();
app.keys = ['zfjg']; // 增加一个秘钥
const router = new Router();
app.use(router.routes());

router.get('/write', async (ctx, next) => {
    ctx.cookies.set('name', 'zf', { maxAge: 10, httpOnly: true });
    ctx.cookies.set('age', '12', { domain: '.zf.cn' ,  signed:true})
    ctx.body = 'write ok';
});
// 因为在a.zf.cn 下设置的cookie 是没法在b.zf.cn中获取的
// 如果设置了.zf.cn 表示 a.zf.cn 和 b.zf.cn 都是可以访问到的
// 多个域名 或者多个path 重名字段 都会被记录下来
router.get('/read', async (ctx, next) => {
    ctx.body = ctx.cookies.get('age',{signed:true}) || 'empty'
});
// 不能存敏感信息 ， 因为数据是暴露给用户的
router.get('/visit',async(ctx,next)=>{
    let visit = (ctx.getCookie('visit',{signed:true}) || 0) - 0;
    visit += 1;
    ctx.setCookie('visit',visit,{signed:true});
    ctx.body = `你是第${visit}次来访问我`
})

app.listen(3000, () => {
    console.log(`server start 3000`)
})