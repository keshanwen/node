/*
buffer 与字符编码

const buf = Buffer.from('你好世界')

console.log(buf.toString())

console.log(buf.toString('hex')) */

/* 创建 buffer 类 */
// 创建一个长度为10，且用 0 填充的buffer
/* const buf1 = Buffer.alloc(10)

const buf2 = Buffer.alloc(10, 1)

const buf3 = Buffer.allocUnsafe(10)

const buf4 = Buffer.from([1, 2, 3])

const buf5 = Buffer.from('test')

const buf6 = Buffer.from('test', 'latin1')
 */


// 写入缓冲区
/* let buf = Buffer.alloc(256)
let len = buf.write('你好世界kebi') */


// 从缓冲区读取数据
/* let buf = Buffer.alloc(26)
for (var i = 0; i < 26; i++) {
  buf[i] = i + 97
}

console.log(buf.toString(undefined,0,5)) */

// 将  buffer 转换为 json
/* const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf)

console.log(json)
const copy = JSON.parse(json, (key, value) => {
  return value && value.type == 'Buffer' ? Buffer.from(value.data) : value
})

console.log(copy) */

// 缓冲区合并
/* let buf1 = Buffer.from('你好世界')
let buf2 = Buffer.from('www.runoob.com')
let buf3 = Buffer.concat([buf1, buf2])

console.log(buf3.toString()) */


// 缓冲区比较 按位比较的。buffer1.compare(buffer2)，这个方法是按位比较的。buffer1 的第一位比较 buffer2 的第一位，相等的话比较第二位以此类推直到得出结果。
/* let buf1 = Buffer.from('ABC')
let buf2 = Buffer.from('ABCD')
let res = buf1.compare(buf2)

console.log(res) */

// 拷贝缓冲区
/* var buf1 = Buffer.from('abcdefghijkl');
var buf2 = Buffer.from('RUNOOB');

// 将 buf2 插入到 buf1 指定的位置
buf2.copy(buf1, 2)
console.log(buf1.toString()) */

// 缓冲区裁剪
/* let buf1 = Buffer.from('hello wrold')
let buf2 = buf1.slice(0, 2)

console.log(buf2.toString())

let buf = Buffer.from('runoob')
let bufS = buf.slice(0, 2)

console.log(buf.toString())
console.log(bufS.toString())

bufS.write('write')
console.log(buf.toString())
console.log(bufS.toString())
// 可以看到对裁剪返回的 buffer 进行写操作同时，也对原始 buffer 进行了写操作。
*/

// 缓冲区长度
/* let buf1 = Buffer.from('hello wrold')
console.log(buf1.length) */

/*
// 一个中文3占3个字节，一个英文占一个字节
let buf = Buffer.from('你好世界')

console.log(buf.length) */