Promise.resolve().then(() => { // then1
    console.log('then1');
    Promise.resolve().then(() => { 
       console.log('then1-1');
        // promise A+ 规范中定义了 then中返回了一个promoise 那么会采用这个promise的状态， 在ECMAScript中 如果返回一个promise那么会生成一个微任务，保证这个promise一定是异步执行
       return Promise.resolve();  // Promise.resolve().then(()=>{}).then(()=>{}) 
   }).then(() => { // then1-2 要等待 then1-1 完成了 才能调用
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
// []
// then1,then1-1,then2，'then3'  then4  then1-2 then5


// then1 then2  then3  then1-1  then4   then1-2   then5￼
// then1 then1-1 then1-2 t2 t3 t4 t5