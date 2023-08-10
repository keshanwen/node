let sum = 0;
for(let i = 0; i < 100 * 100 * 10000;i++){
    sum += i;
}
// console.log  process.stduout.write 是调用的同一个方法
// process.stderr.write


process.send('hello',function(){
    console.log('子进程给父进程发送消息成功')
})

process.on('message',function(data){
    console.log('收到了父亲的消息',data.toString());

    process.exit();
})