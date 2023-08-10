const fs = require('fs').promises
async function readContent(filePath) {
    let r1 = await fs.readFile(filePath , 'utf8');
    let r2 = await fs.readFile(r1, 'utf8');
    return r2;
}

readContent('a.txt').then(data=>{
    console.log(data)
})


// generator + co  = async + await(是generator + co 语法糖)
// 处理异步流程 还是会采用 async + await + promise的方式来使用


