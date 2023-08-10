const Promise = require('./promise')
const fs = require('fs');
// 回调需要每个都处理错误，处理需要嵌套处理
// fs.readFile('./a.txt','utf8',function (err,data) {
//     if(err) return
//     fs.readFile(data,'utf8',function (err,data) {
//         if(err) return
//         console.log(data)
//     })
// })
const readFile = (filePath) => {
    return new Promise((resolve,reject)=>{
        resolve(100)
        // fs.readFile(filePath,'utf8',function (err,data) {
        //     if(err) {// 失败了调用reject
        //         return reject(err);
        //     } 
        //     resolve(data); // 成功调用resolve
        // })
    })
}
// 将promise嵌套进行简化 
// 1.如果promise中的then的回调(成功或者失败) 返回一个普通值（不是promise，也不是抛出错误）. 会将结果传递到下一次then的成功回调中
// 2.如果发生了异常，那么会把这个异常抛出到外层then的失败的回调中去
// 3.如果返回的是一个promise 那么需要判断这个promise的状态。如果promise是成功 就继续将成功的结果传递到外层的成功，如果是失败就将promise传递给外层的失败

// 只有抛出异常，或者返回一个失败的promise才会走失败 其他的都是成功
let promise2 = readFile('./a.txt').then(data => {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve(new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve(500)
            }, 2000);
        }))
    }, 1000);
  })
})
promise2.then((data)=>{
    console.log(32,data)
},(err)=>{
    console.log(err)
})

