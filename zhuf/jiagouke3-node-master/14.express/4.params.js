const express = require('./express');
const app = express();
const pathToRegExp = require('path-to-regexp'); // 第三方插件 安装express的时候会安装这个包

app.get('/user/:name/:id/a',function(req,res){
    console.log(req.params)
    res.end(JSON.stringify(req.params))
})
app.listen(3000,()=>{
    console.log(`server start 3000`)
})

// /user/jw/123/a  /user/:name/:id/a  => {name:'jw',id:123}

// 我们可以将/user/:name/:id/a路径转化成正则 用这个正则来匹配请求的路径

// let requestUrl = '/user/jw/123/a';
// let configUrl = '/user/:name/:id/a'
// let keys = [];
// let regExp = pathToRegExp(configUrl,keys)
// console.log(keys.map(item=>item.name),regExp)

// [name,id]   [jw,123]
// let keys = [];
// let regExpStr = configUrl.replace(/:([^\/]+)/g,function(){
//     keys.push(arguments[1]);
//     return '([^\/]+)'
// });
// let [,...values] = requestUrl.match(new RegExp(regExpStr))

// console.log(keys.reduce((memo,key,index)=>{
//     memo[key] = values[index];
//     return memo
// },{}))



