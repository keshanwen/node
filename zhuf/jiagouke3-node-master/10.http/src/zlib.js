const zlib = require('zlib'); // 流
const path = require('path');
const fs = require('fs');
// zlib.gzip(fs.readFileSync(path.resolve(__dirname,'1.txt')),function (err,data) {
//     console.log(data.length)
// })


// zlib.unzip(fs.readFileSync(path.resolve(__dirname,'1.gz')),function (err,data) {
//     console.log(data.length)
// })