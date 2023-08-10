// promise还有一些其他的常见方法 

// 1.catch
const MyPromise = require('./promise')
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
// let promise2 = readFile('./a1.txt').then(data => {
//    return readFile(data);
// })
// promise2.then((data) => {

// }).then(data=>{
//     console.log('s2:',data);
// }).catch(e=>{ // 没有第一个参数的then就是catch
//     console.log(e); // catch的实现
// })



// 2.将一个普通值转化成promise, resolve方法遇到promise会对promise进行解析
// Promise.reject(new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         resolve('ok');
//     }, 1000);
// })).then(data=>{
//     console.log(data)
// }).catch(err=>{
//     console.log(err);
// })

// 3.Promise.finally
// 我们有些流程，需要无论成功和失败都能执行 (流程会需要一定的时间) finally = then
// Promise.prototype.finally = function(cb){
//     return this.then((y)=>{
//         return Promise.resolve(cb()).then(()=>y)
//     },(r)=>{
//         return Promise.resolve(cb()).then(()=>{throw r}); // 因为finally的promise执行出错, 会导致不会执行Promise.resolve的正常逻辑 ，所以以finally错误为结果
//     })
// }
// Promise.resolve('ok').finally(() => { // finally 并不会影响最终的结果
//     return new Promise((resolve,reject)=>{
//         setTimeout(() => {
//             resolve('inner ok')
//         }, 1000);
//     })
// }).then((data) => {
//     console.log('成功', data)
// }, (err) => {
//     console.log('失败', err)
// })


// Promise.all 多个异步同时获取结果


const readFile = (filePath) => {
    let dfd = MyPromise.deferred()
    fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) { // 失败了调用reject
            return dfd.reject(err);
        }
        dfd.resolve(data); // 成功调用resolve
    })
    return dfd.promise
}
// Promise.all的特点 就是全成功才成功，有一个失败就是失败。 执行结果是有顺序的
MyPromise.all = function(promises) {
    return new Promise((resolve, reject) => {
        const arr = [];
        let times = 0;
        const processResult = (i,val) =>{
            arr[i] = val; // 计数器就是解决异步并发问题
            if(++times === promises.length){
                resolve(arr);
            }
        }
        for (let i = 0; i < promises.length; i++) {
            let val = promises[i]; // 怎么让一个promise执行？  p.then
            if(typeof val.then === 'function'){ // 是promise
                val.then(val=> processResult(i,val),reject)
            }else{
                processResult(i,val)
            }
        }
    })
}
MyPromise.all([readFile('./a.txt'), readFile('./b.txt'), 1,false]).then(data => {
    console.log(data)
}).catch(err => {
    console.log(err);
})


// 1.高阶函数 函数扩展 before方法
// 2.函数的柯里化 （防抖、节流、反柯里化）
// 3.高阶函数来处理异步问题 after 实现异步并发统计。 发补丁订阅再来简化流程
// 发布订阅和观察者模式的区别
// 4.promise处理的问题有哪些 1） 回调地狱  2） 多个请求并发问题  缺点：还是基于回调的
// promise的实现原理掌握 （能写出来） （防抖、节流、反柯里化）