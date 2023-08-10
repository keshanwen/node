const fs = require('fs').promises;


// Promise.all 特点是全成功才成功，有一个失败就失败了
// Promise.race 特点是采用第一个人的结果作为结果

// 采用成功或失败的结果并不会中断其他人的执行,只是不采用他的结果了，promise没有中断效果
// Promise.all特点全成功才成功，有一个失败了，其他人还是在执行的
Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            let p = promises[i]; // 上次实现all的时候有判断类型
            // 1) 不是promise变成promise 2） 是promise会等待promise执行完成
            Promise.resolve(p).then(resolve, reject)
        }
    })
}
Promise.race([fs.readFile('./a.txt', 'utf8'), fs.readFile('./b.txt', 'utf8')]).then(data => {
    console.log(data)
}, err => {
    console.log(err)
});


// 实现放弃结果可以采用race方法 两个接口 采用快的那个作为结果 可以采用race
// 我们实现超时放弃也可以使用race
// let abort = null; // dfd
// let p = new Promise((resolve,reject)=>{
//     abort = reject;
//     setTimeout(() => {
//         resolve('ok');
//     }, 5000);
// });
// setTimeout(() => {
//     abort('超过了3s'); // 超时就不采用成功的结果了
// }, 3000);

// p.then(data=>{
//     console.log(data,'s')
// },err=>{
//     console.log(err,'f')
// })
const wrap = (p2) => {
    let abort = null
    let p1 = new Promise((resolve, reject) => {
        abort = reject
    })
    let r = Promise.race([p1, p2]); // 以p1 或者 p2 最先的状态为主  then异步的
    r.abort = abort
    return r;
}
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok');
    }, 5000);
});
let newP = wrap(p)
setTimeout(() => { // 过3s后 让promise走到失败里去
    //  newP.abort('超过了3s'); // 超时就不采用成功的结果了
}, 3000);
newP.then(data => {
    console.log(data, 's')
}, err => {
    console.log(err, 'f')
});

// 暴露promise的终止方法：借用race实现超时
// xhr.abort 可以中断请求

// 直接在promise内部写延时3秒reject可以吗 不通用：让代码变得更通用一些