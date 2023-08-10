// const fs = require('fs'); // node中的核心模块
const newFs = require('fs').promises; // 将fs中的方法变化成promise
 
// const { promisify } = require('util'); // 针对某个需要的api进行转化
// const readFile = (filePath) =>{
//     return new Promise((resolve,reject)=>{
//         fs.readFile(filePath,'utf8',function (err,data) { // node中的api异步方法都有回调,回调的第一个参数是错误信息 error-first
//             if(err) return reject(err);
//             resolve(data)
//         })
//     })
// }

// 1.promisify 可以直接将nodeApi转换成promise的形式
// function promisify(fn) {
//     return function(...args) {
//         return new Promise((resolve, reject) => { //let  dfd = Promise.deferred
//             // fs.readFile('./a.txt','utf8')
//             fn(...args, function(err, data) {
//                 if (err) return reject(err);
//                 resolve(data)
//             })
//         })
//     }
// }
// fs中有很多api都是异步回调的方式 需要转换成promise的形式
// function promisifiAll(obj){
//     for(let key in obj){
//         if(typeof obj[key] === 'function'){
//             obj[key] = promisify(obj[key])
//         }
//     }
//     return obj
// }

// let readFile = promisify(fs.readFile);
// let newFs = promisifiAll(fs)
newFs.readFile('./a.txt', 'utf8').then(data => {
    console.log(data)
})