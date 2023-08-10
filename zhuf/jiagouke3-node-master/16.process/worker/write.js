const fs = require('fs');

setInterval(() => {
    fs.appendFileSync('./1.txt','abc')
}, 1000);

