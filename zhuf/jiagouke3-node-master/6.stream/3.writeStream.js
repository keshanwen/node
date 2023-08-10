const fs = require('fs');
const path = require('path');

let ws = fs.createWriteStream(path.resolve(__dirname, 'a.txt'), {
    highWaterMark: 1 // 我期望只用一个字节的内存来做这件事
});
let index = 0;

function write() {
    let flag = true;
    while (index <= 9 && flag) {
        flag = ws.write(index++ + ''); // string / number
    }
}
write();
ws.on('drain',function () {
    write();
    console.log('干了'); // 配合读取操作来实现一个 读一点写一点的功能
})