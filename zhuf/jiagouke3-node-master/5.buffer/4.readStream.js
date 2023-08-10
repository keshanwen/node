const fs = require('fs');
const path = require('path');
// 可读流的用法
let rs = fs.createReadStream(path.resolve(__dirname,'test.js'),{

});