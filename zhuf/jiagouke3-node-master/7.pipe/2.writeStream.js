const fs = require('fs');
const path = require('path');
const WriteStream = require('./WriteStream');
let ws = new WriteStream(path.resolve(__dirname, 'a.txt'), {
    highWaterMark: 3 // 
});
let index = 0;

function write() {
    let flag = true;
    while (index <= 9 && flag) { // 3
        flag = ws.write(index++ + ''); // string / number
    }
}
write();
ws.on('drain',function () {
    write();
    console.log('干了'); // 配合读取操作来实现一个 读一点写一点的功能
})


// 多个异步操作 通过回调和队列的方式将操作串联起来