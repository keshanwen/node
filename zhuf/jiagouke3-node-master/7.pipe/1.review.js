const fs = require('fs');
const path = require('path')
// let rs = fs.createReadStream(path.resolve(__dirname,'a.txt'),{
//     start:0,
//     end:4,
//     highWaterMark:3
// }) // fs.open() fs.read() fs.write();

// let arr = []
// rs.on('data',function (chunk) {
//     // 将读取到的数据 进行处理
//     arr.push(chunk)
// })
// rs.on('end',function(){
//     console.log(Buffer.concat(arr).toString())
// })

// fs.readFile 缺陷就是要将数据全部放到内存中， 浪费可用内存
// 范围请求 start , end   highWaterMark (为了表示每次读取多少个字节  64*1024)
// 可读流两个方法 on('data')  on('end')  pause() resume()  控制速率的目的是为了让用户可以有时间去消费

// 链表
let ws = fs.createWriteStream(path.resolve(__dirname, 'b.txt'), {
    highWaterMark: 3 // 我期望能用多少个字节来写入
});

let flag = ws.write('1',()=>console.log('write')); // fs.open('w')
console.log(flag)
flag = ws.write('1',()=>console.log('write')); // fs.open('w')
console.log(flag)
flag = ws.write('1',()=>console.log('write')); // fs.open('w')  达到预期了，如果在写入那么就会超过预期 -》 false
console.log(flag)
flag = ws.write('1',()=>console.log('write')); // fs.open('w')
console.log(flag)
flag = ws.write('1',()=>console.log('write')); // fs.open('w')
console.log(flag)
flag = ws.write('1',()=>console.log('write')); // fs.open('w')
console.log(flag)
flag = ws.write('1',()=>console.log('write')); // fs.open('w')
console.log(flag)


ws.on('drain',function () { // 当我们写入的内达到highWaterMark的时候，并且写入的数据被清空。 触发drain事件
    console.log('drain'); // 知道达到highWaterMark 并且清空了 就要触发drain事件
})

// ws.write('1'); // fs.open('w')
// ws.end() // ws.write() + ws.close()


// 可写流多次操作 只有第一次是真实的像文件中写入, 后面的会放到缓存中， 等待第一次写入完毕后依次处理后续的逻辑



// 数组的缺陷 就是操作头部的时候回让后续的节点向前移动 