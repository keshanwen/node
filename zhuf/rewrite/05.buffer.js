/*
import { Form } from 'element-ui';

  缓冲区Buffer是暂时存放输入输出数据的一段内存。
  JS语言没有二进制数据类型，而在处理TCP和文件流的时候，必须要处理二进制数据。
  NodeJS提供了一个Buffer对象来提供对二进制数据的操作
  是一个表示固定内存分配的全局对象，也就是说要放到缓存区中的字节数需要提前确定
  Buffer好比由一个8位字节元素组成的数组，可以有效的在JavasScript中表示二进制数据

  字节(Byte)是计算机存储时的一种计量单位，一个字节等于8位二进制数
  一个位就代表一个0或1，每8个位（bit）组成一个字节（Byte）
  字节是通过网络传输信息的基本单位
  一个字节最大值十进制数是255(2**8-1)

  0b 2进制
  0x 16进制
  0o 8进制

  将任意进制转为10进制

  parseInt("11", 2); // 3 2进制转10进制
  parseInt("77", 8); // 63 8进制转10进制
  parseInt("e7", 16); //231 16进制转10进制

  // 将 10 进制转为其他进制字符串
  (3).toString(2) // "11" 十进制转2进制
  (17).toString(16) // "11" 十进制转16进制
  (33).toString(32) // "11" 十提制转32进制


*/

/*
    定义 buffer 的三种方式

    1. 通过长度定义 buffer
    // 创建一个长度为 10、且用 0 填充的 Buffer。
    const buf1 = Buffer.alloc(10);
    // 创建一个长度为 10、且用 0x1 填充的 Buffer。
    const buf2 = Buffer.alloc(10, 1);
    // 创建一个长度为 10、且未初始化的 Buffer。
    const buf3 = Buffer.allocUnsafe(10);

  2. 通过数组定义 buffer
  // 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
  const buf4 = Buffer.from([1, 2, 3]);

  3.字符串创建
  const buf5 = Buffer.from('你好世界');

*/

/* const buf1 = Buffer.alloc(10)
const buf2 = Buffer.alloc(10, 1)
const buf3 = Buffer.allocUnsafe(10)

const buf4 = Buffer.from([1, 2, 3])

const buf5 = Buffer.from('你好世界') */

/*
  buffer 常用的方法

  buf.fill(value[, offset[, end]][, encoding])

  buf.fill(1)

  buf.write(string[, offset[, length]][, encoding])

  let buffer = Buffer.allocUnsafe(6);
  buffer.write('珠',0,3,'utf8');
  buffer.write('峰',3,3,'utf8'); //珠峰

  通过指定的 offset 将 value 写入到当前 Buffer 中。
  这个 value 应当是一个有效的有符号的8位整数
  buf.writeInt8(value, offset[, noAssert])

  let buf = Buffer.alloc(4);
  buf.writeInt8()
  buf.writeInt8(0,0);
  buf.writeInt8(16,1);
  buf.writeInt8(32,2);
  buf.writeInt8(48,3);
  console.log(buf);// <Buffer 00 10 20 30>
  console.log(buf.readInt8(0));//0
  console.log(buf.readInt8(1));//16
  console.log(buf.readInt8(2));//32
  console.log(buf.readInt8(3));//48

  不同的CPU有不同的字节序类型，这些字节序是指整数在内存中保存的顺序。

  Big-endian：将高序字节存储在起始地址（高位编址）
  Little-endian：将低序字节存储在起始地址（低位编址）

  let buffer = Buffer.alloc(4);
  buffer.writeInt16BE(2**8,0);//256
  console.log(buffer);//<Buffer 01 00 00 00>
  console.log(buffer.readInt16BE(0));//256

  buffer.writeInt16LE(2**8,2);//256
  console.log(buffer);//<Buffer 01 00 00 01>
  console.log(buffer.readInt16LE(2));//256

  buf.toString([encoding[, start[, end]]])

  let buffer = Buffer.from('珠峰架构');
  console.log(buffer.toString('utf8',3,6));//峰

  let buffer = Buffer.from('珠峰架构');
  let subBuffer = buffer.slice(0,6);
  console.log(subBuffer.toString());

  截取乱码问题
  let {StringDecoder}  = require('string_decoder');
let sd = new StringDecoder();
let buffer = Buffer.from('珠峰');
console.log(sd.write(buffer.slice(0,4)));
console.log(sd.write(buffer.slice(4)));

copy
复制Buffer 把多个buffer拷贝到一个大buffer上
buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])

let buffer = Buffer.from('珠峰架构');
let subBuffer = Buffer.alloc(6);
buffer.copy(subBuffer,0,0,4);//珠
buffer.copy(subBuffer,3,3,6);//峰
console.log(subBuffer.toString());//珠峰

Buffer.prototype.copy = function(targetBuffer,targetStart,sourceStart,sourceEnd){
    for(let i=sourceStart;i<sourceEnd;i++){
        targetBuffer[targetStart++] = this[i];
    }
}
let buffer = Buffer.from('珠峰');
let subBuffer = Buffer.alloc(6);
buffer.copy(subBuffer,0,0,4);//珠
buffer.copy(subBuffer,3,3,6);//峰
console.log(subBuffer.toString());//珠峰

concat

Buffer.concat(list[, totalLength])

let buffer1 = Buffer.from('珠');
let buffer2 = Buffer.from('峰');
let buffer = Buffer.concat([buffer1,buffer2]);
console.log(buffer.toString());

Buffer.concat = function (list) {
    let totalLength = list.reduce((len, item) => len + item.length, 0);
    if (list.length == 0)
        return list[0];
    let newBuffer = Buffer.alloc(totalLength);
    let pos = 0;
    for (let buffer of list) {
        for (let byte of buffer) {
            newBuffer[pos++] = byte;
        }
    }
    return newBuffer;
}
let buffer1 = Buffer.from('珠');
let buffer2 = Buffer.from('峰');
let buffer = Buffer.concat([buffer1, buffer2]);
console.log(buffer.toString());

isBuffer
Buffer.isBuffer();

let buf = Buffer.alloc(10)
console.log(Buffer.isBuffer(buf))


length
let str = '珠峰';
console.log(str.length);//2
let buffer = Buffer.from(str);
console.log(Buffer.byteLength(buffer));//

Base64是网络上最常见的用于传输8Bit字节码的编码方式之一
Base64就是一种基于64个可打印字符来表示二进制数据的方法
Base64要求把每三个8Bit的字节转换为四个6Bit的字节（38 = 46 = 24），然后把6Bit再添两位高位0，组成四个8Bit的字节

const CHARTS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function transfer(str){
  let buf = Buffer.from(str);
  let result = '';
  for(let b of buf){
      result += b.toString(2);
  }
  return result.match(/(\d{6})/g).map(val=>parseInt(val,2)).map(val=>CHARTS[val]).join('');
}
let r = transfer('珠');
console.log(r);//54+g
*/


