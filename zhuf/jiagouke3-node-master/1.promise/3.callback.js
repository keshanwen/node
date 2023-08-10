// 1.before方法 对原函数进行扩展
// 2.curring方法 暂存变量 
// 3.after函数 函数返回函数 会造成函数嵌套

// 解决异步问题 
const fs = require('fs');
// 类似于柯里化的操作 
const after = (times, callback) => {
    let obj = {};
    return (key, value) => { // out函数
        obj[key] = value;
        if (--times == 0) {
            callback(obj);
        }
    }
}
let out = after(2, (obj) => {
    console.log(obj);
})

// 读取文件都采用绝对路径 ，相对路径会参考你执行文件的路径
fs.readFile('./a.txt', 'utf8', function(err, data) { // {a:'aaa',b:'bbb'}
    out('a', data)
})

fs.readFile('./b.txt', 'utf8', function(err, data) {
    out('b', data)
})