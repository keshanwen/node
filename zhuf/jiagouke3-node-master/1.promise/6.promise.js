// Promise 为了解决异步的编程问题 1.异步嵌套问题（异步回调）  2. 并发操作获取最终的结果 (同步异步的并发结果)
// Promise有三个状态 ： 默认状态是等待态  成功态  失败态


// 获取用户的id -》 通过 id 拿到用户所在的部门 => ...
// 早期IE不支持

// 1. promise是一个类 用的时候 就new这个类
// 2. promise中需要传入一个执行器executor ， executor默认会立即执行
// 3.如果调用resolve 会让状态变成成功态，调用reject 会让状态变成失败态
// 4. newPromise会产生一个promise实例, promise实例拥有一个then方法，第一个参数是成功的回调，第二个参数是失败的回调
// 5.promise的状态一旦发生了改变 就不会在发生变化了
// 成功有成功的原因value ，失败有失败的原因reason
// 6.如果new Promise中发生了 异常也会执行失败态
// 7.如果出现异步逻辑我们就采用 发布订阅模式，缓存回调，发布时一次执行
let Promise = require('./promise')
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功')
    }, 1000);
})
p.then(value => {
    console.log(value, '成功')
}, reason => {
    console.log(reason, '失败')
})
p.then(value => {
    console.log(value, '成功')
}, reason => {
    console.log(reason, '失败')
})
