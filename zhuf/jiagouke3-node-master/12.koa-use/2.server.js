const Koa = require('koa');
const path = require('path');
const body = require('./middleware/koa-bodyparser')
const cors = require('./middleware/koa-cors');
const static = require('./middleware/static')
const Router =require('./middleware/koa-router');
const app = new Koa();
const router = new Router();

app.use(cors());
app.use(body());
app.use(static(path.resolve(__dirname)))
app.use(static(path.resolve(__dirname,'upload')))
app.use(router.routes())// 注册路由中间件 
router.post('/login',async (ctx, next) => { // 声明请求方法和路径
        ctx.body = ctx.request.body;
        console.log(1)
       await next();
})
router.post('/login',async (ctx, next) => { // 声明请求方法和路径
    ctx.body = ctx.request.body
    console.log(2)
    await next();
   
})
app.use(()=>{
    console.log(3);
})
app.listen(3000);