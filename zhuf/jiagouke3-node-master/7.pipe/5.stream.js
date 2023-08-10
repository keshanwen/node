// 默认我们比较常用的流有4种  1） 可读流 继承Readable接口 2） 可写流 继承Writable接口
// 3) 双工流 同时继承了Readable Writable  3） 转化流
// socket 两个人通信 传递数据  a->b  (b中需要读取出a中的数据来)  b-> a 发送消息

const {Duplex,Transform} = require('stream')
class MyDuplex extends Duplex{ // 一般情况下 双工流 默认读和写是没有关系  双工流既是可读流 又是可写流
    constructor(){
        super();
        this.index = 0;
    }
    _read(){
        if(++this.index == 3){
            this.push(null);
        }else{
            this.push(this.index + '');
        }
    }
    _write(data,encoding,clearBuffer){
        console.log(data);
    }
}
let duplex  = new MyDuplex();
// duplex.on('data',function(data){
//     console.log(data)
// })

// duplex.write('abc')


// 转化流和双工流 其实本质上是一样的， 转化流也是双工流但是读和写是有关的

// process.stdin.on('data',function(chunk){ // 可读流
//     console.log('chunk',chunk); // 命令行交互
//     process.stdout.write(chunk); // 可写流
// })
const zlib = require('zlib');
class MyTransform extends Transform{
    _transform(data,encoding,cb){
        this.push(data.toString().toUpperCase())
        cb()
    }
}
// let mt = new MyTransform();
// 压缩 、 加密
// 客户端请求一个html, 读取对应的文件  -》 gzip 压缩 -》  压缩后的结果返回给浏览器
process.stdin.pipe(zlib.createGzip()).pipe(process.stdout);

