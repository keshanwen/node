// buffer 表示内存的，编码格式是16进制 （短小）  一个字节2进制是8个位 最大一个字节是255 , 用16进制来表示 ff

// buffer声明的方式  （buffer的特点是一旦声明不能修改大小） 在声明buffer时需要传递大小

let buffer1 = Buffer.alloc(5); // 在node中最小标识单位是字节

let buffer2 = Buffer.from('珠峰'); // 在node中编码采用的是utf8  1个汉字是三个字节一个字节一个16进制

let buffer3 = Buffer.from([22, 0x22, 0x32]); // 这种方式一般不使用

// console.log(buffer2); // buffer可以和字符串进行相互的转化

// 默认我们读取文件的时候读取到的结果都是buffer类型


// 我们客户端会给服务端发送数据  （传输数据都是分片传输） 
// 将多个buffer拼接起来  // e7 8f a0 e5 b3 b0

let buf1 = Buffer.from([0xe7, 0x8f]); // 珠
let buf2 = Buffer.from([0xa0, 0xe5, 0xb3, 0xb0]); // 希望拼接最终的结果, 出现乱码问题
let buf3 = Buffer.from('架构');
// 将buffer拼接起来在进行toString()

/*
Buffer.prototype.copy = function (targetBuffer,targetStart,sourceStart = 0,sourceEnd = this.length) { // buffer很像数组
    for(let i = 0 ; i < sourceEnd - sourceStart; i++){
        targetBuffer[targetStart + i] = this[sourceStart + i]; // 赋值的时候10进制也是可以的 会自动放到buffer中转化成16进制
    }
}
let bigBuffer = Buffer.alloc(12); // npm install @types/node
// 架*珠峰
buf1.copy(bigBuffer,6); // 将buf1 拷贝到bigBuffer上从第0个位置拷贝，把当前的buffer0-2的位置拷贝上去
buf2.copy(bigBuffer,8);
console.log(bigBuffer.toString())
*/


// 开发中会经常使用concat 核心就是造一个大buffer将buffer拷贝到上面去
Buffer.concat = function(list, length = list.reduce((a, b) => a + b.length, 0)) {
    let bigBuffer = Buffer.alloc(length);
    let offset = 0;
    list.forEach(buf => {
        buf.copy(bigBuffer, offset);
        offset += buf.length
    })
    return bigBuffer
}
// concat拼接出来的是buffer，因为数据可能是图片
let bigBuffer = Buffer.concat([buf1, buf3, buf2], 100); // 用于拼接多个buffer 深拷贝
console.log(bigBuffer)


// buffer表示的是内存所以可以截取  buffer.slice方法
let buf8 = Buffer.from('珠峰架构');
let buf9 = buf8.slice(0, 6); // 单位是字节索引 ，不是字符串索引 截取的是内存，有引用关系，如果改变了会影响原来的
buf9[0] = 100;
console.log(buf8); // 引用空间

let arr = [
    [1], 2, 3, 4
];
let newArr = arr.slice(0, 1);
newArr[0][0] = 100;
console.log(arr);
// 深拷贝就是拷贝出来的内容和原来的内容毫无关系， 浅拷贝就是拷贝的内容包含着原来的引用空间 (如何实现深拷贝：作业)


// Buffer.isBuffer() 判断一个buffer是不是buffer , 我们在处理数据的时候要保证数据类型统一，我们会把所有数据统一成buffer
Buffer.isBuffer(buf9) ? buf9 : Buffer.from(buf9); // 判断类型是不是buffer，统一在操作数据的时候全部转成buffer来操作

// Buffer.isBuffer / buf.slice / Buffer.concat()  / Buffer.alloc() / Buffer.from()

// 行读取器 遇到回车和换行就打印出来 、 分割数据  
let buffer10 = Buffer.from('*珠峰*珠峰*珠峰*珠峰*'); // 处理的时候不能直接转化成字符串
Buffer.prototype.split = function(sep){ // formdata 这种格式需要我们手动的将数据进行拆分，拆分后来使用
    sep = Buffer.isBuffer(sep) ? sep : Buffer.from(sep);
    let sepLen = sep.length; // 统计的长度就是正常的 统一按照buffer的长度来计算
    let arr = [];
    let offset = 0; // 从哪里开始进行查找
    let index = 0;// 找到*的位置 
    while (-1 != (index = this.indexOf(sep,offset))) {
        arr.push(this.slice(offset,index));
        offset = index + sepLen; // 跳过当前分隔符继续向下查找
    }
    arr.push(this.slice(offset))
    return arr;
}
console.log(buffer10.split('*'))