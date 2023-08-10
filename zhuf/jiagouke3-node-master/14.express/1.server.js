const express = require('./express'); // 获取express库
const app = express(); // 创建一个应用

// koa中将原生的req和res进行封装，封装成一个ctx上下文
// express中直接可以拿到原生的req和res， 内部对原生的req和res进行了封装
app.get('/', function(req, res, next) {
    res.end('home')
})
app.get('/about', function(req, res, next) {
    res.end('about')
})

app.listen(3000, () => {
    console.log('server start 3000')
})