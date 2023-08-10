// promise的缺陷：就是不能中断 （如何中断promise链）, promise已经是基于回调的，写起来还是有各种各样的回调方法
// Promise.resolve('abc').then(function() {
//     return new Promise((resolve, reject) => {}); // 状态一直是pending，代码执行完毕后就停止了
// }).then().then(data => {
//     console.log(data)
// }, err => {
//     console.log(err, 'e')
// })


// 最早是回调 -》 promise -》 generator (解决回调问题的)


// function* say() { // generator函数 中间+*  拆分开来执行 
//     // say方法在执行的过程中遇到yield 就停止执行
//     let a = yield 'h';
//     console.log(a,'a');
//     let b = yield 'ell';
//     console.log(b);
//     //return b // 函数执行完毕后 done :true
// }
// let it = say(); // 生成器返回的是迭代器
// let o1 = it.next(); // {value:'h',done:false}  第一次的next不需要传参，传了没有意义
// console.log(it.next(o1.value));
// console.log(it.next());
// // 当前调用next的时候传递的参数 会作为上一次yield的返回值


// generator的应用 
const fs = require('fs').promises
// const co = require('co'); // 别人写好的 需要npm install co

function co(it){
    return new Promise((resolve,reject)=>{
        // 异步迭代就采用回调函数的方式 
        function next(data){
            let { value, done } = it.next(data);
            if(done){
                return resolve(value)
            }
            Promise.resolve(value).then(next,(err)=>{
                it.throw(err);
            })
        }
        next();
    })
}
function* readContent(filePath) {
    try{
        let r1 = yield fs.readFile(filePath+'1', 'utf8');
        let r2 = yield fs.readFile(r1, 'utf8');
        return r2;
    }catch(e){
        console.log(e,'eee');
    }
}
let it = readContent('a.txt');
co(it).then(data => {
    console.log(data)
})

// let { value, done } = it.next(); // 默认执行
// value.then(data => { // 执行第一次readFile
//     let { value, done } = it.next(data);
//     value.then(data => { // 执行r2 
//         let { value, done } = it.next(data); // 第二次readFile执行完毕后给r2
//         console.log(value,done);
//     })
// })