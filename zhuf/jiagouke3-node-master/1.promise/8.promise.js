const Promise = require('./promise')
const fs = require('fs');



// const readFile = (filePath) => {
//     return new Promise((resolve,reject)=>{
//         fs.readFile(filePath,'utf8',function (err,data) {
//             if(err) {// 失败了调用reject
//                 return reject(err);
//             } 
//             resolve(data); // 成功调用resolve
//         })
//     })
// }
// let promise2 = readFile('./a.txt').then(data => {
//    return readFile(data);
// })
// promise2.then((data) => {
//     console.log('s', data)
// }, (err) => {
//     console.log('f',err)
// })


// 1. promise为什么能.then .then .then()  返回的并不是this ？  一个promise一旦成功了就不能失败，如果不停的返回this，状态就没有办法扭转了


// 2. x === promise2 typeError

// let p = new Promise((resolve,reject)=>{
//     resolve();
// })
// let promise2 = p.then((data=>{
//     return promise2 // 我们在这里会调用promoise2 的resolve、reject吗？
// }))
// promise2.then(()=>{
//     console.log('成功')
// },(e)=>{
//     console.log('失败',e)
// })

// 3. 如果取then的时候出错了就抛异常，因为有可能人家的写的对象上定义了一个取then就出错的情况

// 4.then方法中的回调可以忽略 , 如果不是函数就会透传给下一个then
new Promise((resolve,reject)=>{
    reject(1000)
}).then().then().then(null,function(data){
    console.log(data)
})