import Koa = require("koa"); // TS Module导入
import index from './routers/index';

const app = new Koa();

// response
// app.use((ctx:any) => {
//     ctx.body = 'Hello Koa';
// });
app.use(index.routes());

app.listen(3000, ()=>{
    console.log('listen 3000 OK');
});
