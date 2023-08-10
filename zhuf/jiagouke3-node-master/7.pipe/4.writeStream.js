const fs = require('fs');
const path = require('path')

const ReadStream = require('./ReadStream');
const WriteStream = require('./WriteStream')

const {Writable} = require('stream')

// let rs =  fs.createReadStream(path.resolve(__dirname,'a.txt'),{
//     highWaterMark:4
// })

// let ws = fs.createWriteStream(path.resolve(__dirname,'b.txt'),{
//     highWaterMark:1
// }); 

// ws.write('1')
// rs.pipe(ws); // 这个方法是同步还是异步？  内部会自动调用可读流的 on('data') on('end') 
// 会自动调用可写流的 ws.write() 和 ws.end()




// 1.可写流默认会创造一个可写流实例 new WriteStream
// 2.子类继承父类的Writable   父类提供一个方法 这个方法叫write
// 3.父类内部会调用子类的_write实现
// 4.子类可以自己实现_write的逻辑


class MyWriteStream extends Writable{
    _write(data,encoding,cb){ // 如果不调用cb 就无法写入第二个第三个
        console.log(data)
        cb(); // clearBuffer
    }
}
let ms = new MyWriteStream
ms.write('ok')
ms.write('ok')
ms.write('ok')


// 转化流 、 双工流
// 文件夹操作 树的遍历 文件删除方式
// tcp =>  http