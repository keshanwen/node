const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const body = require('./middleware/koa-bodyparser')
const cors = require('./middleware/koa-cors')
const app = new Koa();

// 当用户访问一个 http://localhost:3000/login  get  返回一个登录页面
// http://localhost:3000/login post 请求

app.use(cors());
app.use(body());
// app.use(async (ctx, next) => {
//     if (ctx.path == '/login' && ctx.method == 'GET') {
//         // 原生http中 可以使用 fs.createReadStream('文件路径').pipe(res)
//         // response._body  if(ctx.body)  if(ctx.body instanceof Strean) ctx.body.pipe(res)
//         // 默认返回一个二进制流 koa中会认为你需要做下载操作
//         ctx.type = 'text/html;charset=utf-8' // res.setHeader('Content-type')
//         ctx.body = fs.createReadStream(path.resolve(__dirname, 'login.html'))
//     } else {
//         return next(); // 这里必须要加await
//     }
// });

// 1.使用koa 必须每个next前面增加await 防止后续有异步逻辑
// 2.我们每个中间件中的逻辑 如果是异步需要等待异步成功后再执行 （把所有的异步方法变成promise的格式）
// 3.中间件的执行顺序 永远都是从第一个开始执行，依次向下执行 （可以扩展属性）
app.use(async (ctx, next) => {
    if (ctx.path == '/login' && ctx.method == 'POST') {
        ctx.body = ctx.request.body
    }
})
app.listen(3000);