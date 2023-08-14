// const Koa = require('koa'); // Node Module导入
// import Koa from 'koa'; // ES Module导入
import Koa = require("koa"); // TS Module导入

const app = new Koa();

// response
app.use((ctx:any) => {
    ctx.body = 'Hello Koa';
});

app.listen(3000, ()=>{
    console.log('listen 3000 OK');
});
