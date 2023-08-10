const fs = require('fs');
const path = require('path')

const ReadStream = require('./ReadStream');
const WriteStream = require('./WriteStream')


let rs =  new ReadStream(path.resolve(__dirname,'a.txt'),{
    highWaterMark:4
})

let ws = new WriteStream(path.resolve(__dirname,'b.txt'),{
    highWaterMark:1
}); 

rs.pipe(ws); // 这个方法是同步还是异步？  内部会自动调用可读流的 on('data') on('end') 
// 会自动调用可写流的 ws.write() 和 ws.end()


