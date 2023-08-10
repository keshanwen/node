const fs = require('fs');
const path = require('path')
// 如果文件很大，而且我们希望做拷贝的逻辑
// fs.readFile(path.resolve(__dirname,'./package.json'),(err,data)=>{
//     if(err) return console.log(err)
//     fs.writeFile(path.resolve(__dirname,'a.json'),data,()=>{
//         console.log('ok')
//     })
// })

// readFile适合读取一些小的文件 js css,html 
// 视频 音频 （如果采用readFile这种方式会淹没可以用内存）
// 边读边写， 读一点写一点，我们可以控制读写的速率 （流）

// fs.open()  fs.read()  fs.open()  fs.write()  fs.close()

// 我希望读取一个写一个 产生的文件叫 newTest.js

// flags 标识位 我打开文件要做什么事
// flags: 'w'  写  'r' 读  'a' 追加
// 如果在r的情况读取的文件不存在就会报错
// fd 文件描述符 用来代表我操作哪个文件以什么方式来操作

// 读取其实是写入 将文件中的内容写入到内存中 写入其实是读取 需要将文件读取出来才能写入

/*
let buf = Buffer.alloc(1);// node中默认认为64k 就需要分片读取
fs.open(path.resolve(__dirname,'test.js'),'r',function(err,rfd){ // fd数字类型
    // 读取test.js中的数据 ， 将数据写入到buf中， 从buffer的第几个位置开始写入， 写入1个，从文件的第0个位置开始读取
    fs.read(rfd,buf,0,1,0,function (err,bytesRead) {
         // 为啥是31 -》 16进制 =》 49 =》 单字节的采用的都是ASCII 1个字节最大是255 （表示英语和符号够用）

        // mode表示的是权限 0o666  -> chomd -R 777   自己的操作权限 ， 我所在组的权限， 别人的权限
        // 读取 4 + 写入 2 + 执行 1
        fs.open(path.resolve(__dirname,'newTest.js'),'w',function (err,wfd) {
            // 像文件中写入buffer，但是需要从buffer的第0个位置进行读取操作，读取1个写入到文件的第0个位置
            fs.write(wfd,buf,0,1,0,function (err,written) {
                console.log('写入成功')
            })
        })
    })
})
*/
// 读取数据默认展现给我们的是buffer类型如果文件不存在则报错， 写入数据默认会清空文件，如果文件不存在会创建文件


function copy(source, target, cb) {
    const BUFFER_SIZE = 3;
    let buffer = Buffer.alloc(BUFFER_SIZE);
    let readOffset = 0;
    let writeOffet = 0;
    fs.open(source, 'r', function(err, rfd) {
        if (err) return cb(err);
        fs.open(target, 'w', function(err, wfd) {
            if (err) return cb(err);
            // co
            function next() {
                fs.read(rfd, buffer, 0, BUFFER_SIZE, readOffset, function(err, bytesRead) {
                    if (err) return cb(err);
                    if(bytesRead == 0){
                        let index = 0;
                        let done = () =>{
                            if(++index == 2){
                                cb();
                            }
                        }
                        fs.close(rfd,done);
                        fs.close(wfd,done);
                        return
                    }
                    // 读取到几个就写几个
                    fs.write(wfd, buffer, 0, bytesRead, writeOffet, function(err, bytesWritten) {
                        readOffset += bytesRead;
                        writeOffet += bytesWritten;
                       setTimeout(() => {
                        next();
                       }, 1000);
                    })
                })
            }
            next();
        })
    })
}
// 读是读 写是写 要做的是拆分，将读写分离开， 用发布订阅来进行解耦合
copy('./test.js', 'newTest.js', function(err) {
    if (err) return console.log(err);
    console.log('成功')
})