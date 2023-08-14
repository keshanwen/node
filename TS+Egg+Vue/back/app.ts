import Koa = require('koa')
import index from './routers/index'


const app = new Koa()


app.use(index.routes())

app.listen(1234, () => {
  console.log('listen 1234 ok')
})