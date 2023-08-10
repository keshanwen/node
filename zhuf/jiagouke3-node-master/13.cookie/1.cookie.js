const Koa = require('koa');
const Router = require('@koa/router');
const querystring = require('querystring');
const crypto = require('crypto')

const app = new Koa();
const router = new Router();
// 1.可以决定是否向下执行 2.可以实现权限校验  3.可以扩展公共的方法
const sign = (content) =>{  // 盐值 同样的盐值摘要同样的结果是一样的
    return crypto.createHmac('sha256','zfjg').update(content).digest('base64').replace(/\+/g,'').replace(/\=/g,'').replace(/\//,'')
}
app.use(async (ctx, next) => {
    const cookies = []
    ctx.setCookie = function(key, value, options = {}) {
        let args = [];
        if (options.maxAge) { // 个数有限
            args.push(`max-age=${options.maxAge}`)
        }
        if (options.httpOnly) {
            args.push(`httpOnly=${options.httpOnly}`)
        }
        if (options.domain) {
            args.push(`domain=${options.domain}`)
        }
        if(options.signed){ // 如果有这个字段 我需要增加一个签名 我们需要增加一个签名 
            cookies.push(`${key}.sign=${sign(`${key}=${value}`)}`)
        }
        cookies.push(`${key}=${value}; ${args.join('; ')}`)
        ctx.res.setHeader('Set-Cookie', cookies);
    }
    ctx.getCookie = function(key,options={}) {
        // key=value; key=value  ={a:1,b:2}
        const cookieObj = querystring.parse(ctx.req.headers.cookie, '; ')
        if(options.signed){
           let oldSign =  cookieObj[key+'.sign']; // 取出对应的签名信息
           let value = cookieObj[key]; // TWz2cWOEAm8wPGpLl4gOBNBz8n0k6DllOJDOVsjqQjs=
           if(sign(`${key}=${value}`) === oldSign){ // 相同的内容签名出的结果是一致的，如果一致说明没有被篡改过
               return value
           }else{
               return undefined
           }
        }
        return cookieObj[key]; // 获取你指定的字段对应的cookie
    }
    return next();
})
app.use(router.routes());


router.get('/write', async (ctx, next) => {
    // name , value 表示cookie的key和value
    // domain 这个cookie在哪个域下可以使用   默认以当前域名作为值 可以设置两个子域可以相互访问
    // a.zf.cn   b.zf.cn     domain=.zf.cn
    // path  指代的是在哪个路径下可以使用这个cookie  一般不采用 （不好用） 尽量不采用
    // expires 过期时间 绝对时间  max-age 相对时间 可以设置多少s内过期
    // httpOnly这个cookie能否让浏览器通过代码的形式获取到  (只是防止别人去恶意盗取你的cookie，cookie内容自己是可以看到和修改的  不能给放置一些敏感信息)
    // ctx.res.setHeader('Set-Cookie', ['name=zf; domain=zf.cn; httpOnly=true', 'age=12; domain=zf.cn']);
    ctx.setCookie('name', 'zf', { maxAge: 10, httpOnly: true });
    ctx.setCookie('age', '12', { domain: '.zf.cn' ,  signed:true})
    ctx.body = 'write ok';
});
// 因为在a.zf.cn 下设置的cookie 是没法在b.zf.cn中获取的
// 如果设置了.zf.cn 表示 a.zf.cn 和 b.zf.cn 都是可以访问到的
// 多个域名 或者多个path 重名字段 都会被记录下来
router.get('/read', async (ctx, next) => {
    ctx.body = ctx.getCookie('age',{signed:true}) || 'empty'
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