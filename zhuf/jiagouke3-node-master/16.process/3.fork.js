const {fork} = require('child_process');
const path = require('path');


const cp = fork('sum1.js',{ // =  spawn  fork比spawn用起来更方便 提供了ipc的方式
    cwd: path.resolve(__dirname,'worker'),
    // stdio:[0,1,2,'ipc'] // 不希望复用 process.stdin stdout stderr 通过ipc来进行通信
})

cp.on('message',function(data){
    console.log('儿子给我的数据',data);
    // process.nextTick(()=>{
    //     process.kill(cp.pid); // pid 就是进程的唯一标识 kill 来杀死进程
    // })
    cp.send('welcome',function(){})
});

cp.on('exit',function(){
    console.log('exit')
})


// 主要用fork 就是为了 ipc  但是有的时候  我仅仅就是要拿到子进程的输出，不作别的事