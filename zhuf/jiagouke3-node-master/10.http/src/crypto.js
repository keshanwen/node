const crypto = require('crypto'); // node中专门用来加密 摘要算法算法的

// md5 是一种摘要算法 （不是加密  加密算法是能解密 ）

let r = crypto.createHash('md5').update('hello1123123123').digest('base64');


let r1 = crypto.createHash('md5').update('hello').update('1123123123').digest('base64');
console.log(r,r1); // XUFAKrxLKna5cZ2REBfFkg==


// 1.相同的内容摘要的结果是相同 
// 2.如果主要的内容 有一点变化 输出的结果完全不同
// 3.不同的内容摘要的结果 长度是一致的

// 指纹：给内容生成一个指纹 作为标识


