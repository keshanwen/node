const express = require('./express');
const app = express();

// 1.和koa中的中间件类似 , 实现路由的中间件 。 类似promise.then链 每个中间件都可以做一件事
// 2.next方法可以决定是否向下执行,这里next方法返回的不是promise布局被等待的效果.代码执行依旧是栈型结构 （洋葱模型）
// app.route('/').get(function(req,res){
//     res.end('get')
// }).post(function(req,res){
//     res.end('post')
// }).delete(function(req,res){
//     res.end('delete')
// })

app.get('/',function(req,res,next){
    console.log(1);
    next();
},function(req,res,next){
    console.log(11);
    next();
},function(req,res,next){
    console.log(111);
    next();
},function(req,res,next){
    console.log(1111);
    next();
})
app.get('/',async function(req,res,next){
    console.log(2);
    res.end('ok')
})

app.listen(3000,function(){
    console.log(`server start 3000`)
})