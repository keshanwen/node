const path = require('path');
const fs = require('fs');


function pipe(source, target) {
    const rs = fs.createReadStream(source, { highWaterMark: 4 }); // 64k : 16k
    const ws = fs.createWriteStream(target,  { highWaterMark: 1 }); // 4:1
    // rs.on('data',function(data){
    //     let flag = ws.write(data);
    //     if(!flag) rs.pause(); // 暂停读取
    // })
    // ws.on('drain',function () {
    //     rs.resume(); // 恢复读取
    // })
    // // 读取完毕后 会触发close事件
    // rs.on('end',function(){
    //     ws.end(); // 结束了 关闭文件 = ws.write('end') + close
    // })
    rs.pipe(ws)
}
// 周日咱们会实现以下可写流的原理 （链表）
// 实现pipe 
// 文件夹操作 （树的基本概念）
// http开头
// tcp 概念 三次握手 四次握手 滑动窗口 拥塞控制

pipe(path.resolve(__dirname, 'a.txt'), path.resolve(__dirname, 'b.txt'))