const {Readable} =  require('stream');

// fs.createReadStream => fs.open fs.close (有这两个事件)
class MyReadStream extends Readable{
    constructor(){
        super()
        this.index = 0;
    }
    _read(){
        if(this.index == 10) return this.push(null); // 触发end事件
        this.push(this.index++ + '')
    }
}
// 当我们监听了data事件 就会开启读取操作
let rs = new MyReadStream();
rs.on('data',function(data){
    console.log(data)
})
rs.on('end',function(){
    console.log('end')
})

// 文件可读流 和 可读流 （文件可读流是基于可读流实现的）
// http tcp 