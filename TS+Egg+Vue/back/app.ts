const Koa = require('koa');
const app = new Koa();

// response
app.use((ctx: any) => {
  ctx.body = 'Hello Koa';
});

app.listen(3456, () => {
  console.log('listen 3456 OK');
});
