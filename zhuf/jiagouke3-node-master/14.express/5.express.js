// 我们有两个模块 文章功能  用户功能

const express = require('./express');

const app = express();

const articleRouter = require('./routes/article');
const userRouter = require('./routes/user');



app.use('/article',articleRouter);
app.use('/user',userRouter) 





app.listen(4000, () => {
    console.log('server start 4000')
})