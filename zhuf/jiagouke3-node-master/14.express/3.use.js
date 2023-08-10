const express = require('./express');
const app = express();

// 路径只要开头匹配就会执行 =》 cookie (path)
// 中间件一般放在路由的上面 可以做过滤操作，


// 1.可以决定是否向下执行
// 2.可以做权限处理
// 3.可以扩展req和res


// 路由中间件需要匹配方法
// 普通的中间件只需要匹配路径
// 这个中间件一般放在页面的最底部

// callback  和 promise的区别
app.use('/a',(req,res,next)=>{ // 这个方法和koa中的用法是一样的， 唯一不一样的是可以添加路径 
    console.log('1');
    next();
})
app.use('/a',(req,res,next)=>{  
    console.log('2'); // 出错了
    next();
})
app.use('/a',(req,res,next)=>{  
    console.log('1');
    next(); 
})
app.get('/a',function(req,res,next){
    console.log(2);
    next()
},function(req,res,next){
    res.end('a')
})
app.get('/b',function(req,res,next){
    console.log(2);
    res.end('b')
})
app.use((err,req,res,next)=>{ // fn.length == 4
    res.end(err + 'abc')
})



app.listen(3000,function(req,res){
    console.log('server start 3000')
})

