// console.log(1);
// async function async () {
//     console.log(2);
//     // await 一个结果代码会被延迟到下一个队列中
//     await console.log(3); // Promise.resolve(console.log(3)).then(()=>{console.log(4)})
//     console.log(4)
// }
// setTimeout(() => { // 最后执行的
//     console.log(5);
// }, 0);
// const promise = new Promise((resolve, reject) => { // new Promise会立即执行
//     console.log(6); // 6
//     resolve(7)
// })
// promise.then(res => {
//     console.log(res)
// })
// async (); // async执行就是让这个函数立即执行 
// console.log(8);


// async + await 本质上就是promise



// async function async1() {
//     console.log('async1 start');
//     await async2(); // async2().then(()=>'async1 end')  // Promise.resolve(async2()).then(()=>'async1 end')
//     console.log('async1 end');
// }
async function async2() {
    console.log('async2');
}
// console.log('script start');
// setTimeout(function() {
//     console.log('setTimeout');
// }, 0)
// async1();
// new Promise(function(resolve) {
//     console.log('promise1');
//     resolve();
// }).then(function() {
//     console.log('promise2');
// });
// console.log('script end');

// 浏览器会优化 Promise.resolve中放置的如果是一个promise那么，会直接将这个promise解析出来
Promise.resolve(async2()).then(()=>console.log('async1 end  !!!!!'))
async2().then(()=>console.log('async1 end  222222'))

// script  as1  as2    p1  end   asend  p2￼

 
// script start    async1 start   async2          promise1       'script end         async1 end，promise2            setTimeout


// （）