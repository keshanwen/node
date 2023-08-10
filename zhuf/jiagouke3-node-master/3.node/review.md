- 1.什么是浏览器事件环？
- 2.宏任务和微任务的区别？
- 3.代码执行结果?
    ```js
    console.log(1);
    async function async () {
        console.log(2);
        await console.log(3);
        console.log(4)
    }
    setTimeout(() => {
        console.log(5);
    }, 0);
    const promise = new Promise((resolve, reject) => {
        console.log(6);
        resolve(7)
    })
    promise.then(res => {
        console.log(res)
    })
    async (); 
    console.log(8);
    ```
- 4.代码执行结果是？
    ```js
    Promise.resolve().then(() => { // then1
         console.log('then1');
         Promise.resolve().then(() => { 
            console.log('then1-1');
            return Promise.resolve(); 
        }).then(() => {
            console.log('then1-2')
        })
    })
    .then(() => { 
        console.log('then2');
    })
    .then(() => {
        console.log('then3');
    })
    .then(() => {
        console.log('then4');
    })
    .then(() => {
        console.log('then5');
    })
    ```

## 自己调试下require的源代码 弄清楚  this、exports、 module.exports 的区别
