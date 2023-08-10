
const fs = require('fs');
const path = require('path')

// 内部肯定是基于 fs.open fs.write fs.close 来实现的 
let ws = fs.createWriteStream(path.resolve(__dirname,'./a.txt'),{
    flags:'w', // 写入的时候如果文件不存在会创建文件，如果文件中有内容 需要清空文件
    encoding:'utf8',
    start:0, // 从哪开始写
    emitClose:true,
    autoClose:true,
    highWaterMark: 3, // 定义一个预期的值，超过或等于预期就返回false，但是内容还是可以写入的 （缓存区的大小）
});

// 我告诉我的妈妈 我能吃饭 我能吃 5口饭 （超过后我会将他放到地上） ，如果你按照我的预期来，那么地下的饭就少， 我就不用浪费空间来存他

let flag = ws.write('abc','utf8',function () { // true
    console.log('写入成功')
}); 
console.log(flag)
flag = ws.write('cd','utf8',function () { // false
    console.log('写入成功')
});
console.log(flag)
flag = ws.write('ef','utf8',function () { // false
    console.log('写入成功')
});
// 有个前提是必须写入的数据达到了预期，被消费掉才会触发drain
ws.on('drain',function () {
    console.log('drain')
})


// 多个异步操作防止错乱可以采用队列的方式来实现
// 可写流有两个方法 ws.write() 写入  ws.end() 结束写入 

// 我们期望读一点写一点的时候 可以采用flag作为标识，一般情况下都是读取的快 64k  写预期16k， 你需要等待我写入完成后再读取