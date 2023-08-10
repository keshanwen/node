const path = require('path')
const fs = require('fs'); //  针对文件夹的


// function rmdir(dir, callback) { // 串行 将异步串在一起 做操作
//     // 1.先判断路径的状态 如果是文件删除即可
//     fs.stat(dir, (err, stats) => {
//         if (err) return callback(err);
//         if (stats.isFile()) {
//             return fs.unlink(dir, callback)
//         } else {
//             fs.readdir(dir, (err, dirs) => { // readdir 只能读取一层儿子
//                 dirs = dirs.map(d => path.join(dir, d));
//                 let index = 0;

//                 function next() { // co  geneator
//                     if (index == dirs.length) return fs.rmdir(dir, callback)
//                     let current = dirs[index++];
//                     rmdir(current, next)
//                 }
//                 next()
//             })
//         }
//     })
// }


// function rmdir(dir,callback){ // 并发删除
//     fs.stat(dir, (err, stats) => {
//         if (err) return callback(err);
//         if (stats.isFile()) {
//             return fs.unlink(dir, callback)
//         } else {
//             fs.readdir(dir, (err, dirs) => { // readdir 只能读取一层儿子
//                 // 都完成了删除自己
//                 if(dirs.length == 0){
//                     return fs.rmdir(dir, callback); // 空文件夹直接自己删除掉就可以了
//                 }
//                 dirs = dirs.map(d => path.join(dir, d));
//                 let idx = 0;
//                 function done(){ // 儿子同时删除 删除完毕后 通知我删除自己
//                     if(++idx === dirs.length){
//                         fs.rmdir(dir,callback)
//                     }
//                 }
//                 dirs.forEach(dir=>{
//                     rmdir(dir,done)
//                 })
//             })
//         }
//     })
// }

// async function rmdir(dir) {
//     let stats = await fs.stat(dir);
//     if (stats.isFile()) return fs.unlink(dir)
//     let dirs = await fs.readdir(dir)
//     dirs = dirs.map(d => rmdir(path.join(dir, d)));
//     await Promise.all(dirs)
//     return fs.rmdir(dir)
// }
// rmdir(path.resolve(__dirname, 'a')).then(() => {
//     console.log('删除成功');
// }).catch(err => {
//     console.log(err)
// });


// 层序遍历来实现
function wideRm(dir, callback) {
    let stack = [dir];
    let index = 0;
    let current;
    while (current = stack[index++]) {
        let stats = fs.statSync(current);
        if (stats.isDirectory()) { //  [a,a/b,a/e]
            stack = [...stack, ...fs.readdirSync(current).map(dir => path.join(current, dir))]
        }
    }
    // 倒叙删除列表
}
wideRm(path.resolve(__dirname, 'a');
        // fs.rmdir(path.resolve(__dirname,'a'),function(err){
        //     console.log(err)
        // })
        // fs.rmdir 默认只能删除空文件夹，如果有内容则不能删除

        // 1.readdir 可以读取文件夹中的目录 
        // 2.stat 判断文件的状态信息  state.isDirctory isFile (文件创建修改的信息)
        // 3.rmdir 删除文件夹
        // 4.rmdir 删除文件


        // fs.readdir(path.resolve(__dirname,'a'),function (err,dirs) {
        //     dirs = dirs.map(dir=> path.join(path.resolve(__dirname,'a'),dir));
        //     dirs.forEach((dirOrFile=>{
        //         fs.stat(dirOrFile,function (err,stat) { // 如果文件不存在就会出错
        //             if(stat.isDirectory()){  // state.isFile()
        //                 fs.rmdir(dirOrFile,function(err){
        //                    console.log(err)
        //                 })
        //             }else{
        //                 fs.unlink(dirOrFile,function(err){
        //                     console.log(err)
        //                 })
        //             }
        //         })
        //     }))
        // })