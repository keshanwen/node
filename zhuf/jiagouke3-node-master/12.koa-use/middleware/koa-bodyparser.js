const querystring = require('querystring')
const fs = require('fs');
const path = require('path')

Buffer.prototype.split = function(sep) {
    let arr = [];
    let len = Buffer.from(sep).length
    let offset = 0;
    let current = 0
    while (-1 !== (current = this.indexOf(sep, offset))) {
        arr.push(this.slice(offset, current));
        offset = current + len;
    }
    arr.push(this.slice(offset))
    return arr
}
// 所有的插件都编写成一个函数导出 ，最后返回一个中间件 
module.exports = () => { // 解析使用插件的参数
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            let arr = []
            ctx.req.on('data', function(chunk) {
                arr.push(chunk)
            });
            ctx.req.on('end', function() { // 可能没有请求体，如果没有请求体
                // 浏览器在发送请求的时候会自动带上请求格式

                if (ctx.request.type === 'application/json') { // json 格式
                    let body = Buffer.concat(arr).toString();
                    ctx.request.body = JSON.parse(body); // res.end(JSON.stringify())
                } else if (ctx.request.type === 'application/x-www-form-urlencoded') { // a=b&c=d
                    let body = Buffer.concat(arr).toString();
                    ctx.request.body = querystring.parse(body)
                } else if (ctx.request.type === 'multipart/form-data') {
                    let body = Buffer.concat(arr);
                    // 每次请求的时候 会在 content-type上增加一个 content-type="multipart/form-data";boundary="xxxx"
                    let r = {}
                    let boundary = '--' + ctx.get('content-type').split('=')[1];
                    let lines = body.split(boundary).slice(1, -1);
                    lines.forEach(line => {
                        let [head, body] = line.split('\r\n\r\n');
                        head = head.toString();
                        let key = head.match(/name="(.+?)"/)[1];
                        if (head.includes('filename')) {
                            if (!body.toString().replace(/\r\n/g,'')) { return }
                            let filename = head.match(/filename="(.+?)"/)[1];
                            let uploadDir = path.resolve(__dirname, '../upload/' + filename);
                            body = line.slice(head.length + 4, -2);
                            fs.writeFileSync(uploadDir, body)
                            r[key] = {
                                filename,
                                uploadDir,
                                size: line.slice(head.length + 4, -2).length
                            }
                        } else {
                            // 普通文本
                            let value = body.toString().slice(0, -2)
                            r[key] = value;
                        }
                    })
                    ctx.request.body = r
                }
                resolve();
            })
        });
        return next();
    }
}