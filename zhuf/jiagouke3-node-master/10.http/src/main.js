const http = require('http')
const path = require('path')
const os = require('os');
const url = require('url');
const fs = require('fs').promises;
const ejs = require('ejs');
const { createReadStream, readFileSync } = require('fs');
const template = readFileSync(path.resolve(__dirname, 'template.html'), 'utf8')
const crypto = require('crypto')
const zlib = require('zlib');

const chalk = require('chalk');
const mime = require('mime');

let interfaces = os.networkInterfaces();
interfaces = Object.values(interfaces).flat().filter(item => item.family === 'IPv4');

class Server {
    constructor(opts) {
        this.port = opts.port;
        this.directory = opts.directory;
        this.template = template
    }
    handleRequest = async (req, res) => {
        // 当请求到来时  我需要判断 你的访问路径 是文件则显示文件的内容， 如果是文件夹则显示文件夹中的列表 fs.stat  fs.readdir
        let { pathname } = url.parse(req.url);

        // 根据用户访问的路径生产一个绝对路径 
        let absPath = path.join(this.directory, pathname);
        try {
            let statObj = await fs.stat(absPath);
            if (statObj.isFile()) {
                // 将文件直接读取出来返回即可
                this.sendFile(absPath, req, res, statObj)
            } else {
                // 我们需要 用目录的信息去渲染默认 返回给用户 
                const dirs = await fs.readdir(absPath);
                let template = ejs.render(this.template, {
                    dirs: dirs.map(dir => ({
                        dir,
                        href: path.join(pathname, dir) // 作为a链接的路径
                    }))
                }); // async:false
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                res.end(template);
            }
        } catch (e) {
            console.log(e)
            this.sendError(absPath, req, res);
        }
    }
    cache(absPath, req, res, statObj) {
        // 强制缓存 缓存时间 取决于你自己
        res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toGMTString());
        res.setHeader('Cache-Control', 'max-age=10');

        let lastModified = statObj.ctime.toString();
        let eTag = new Date(lastModified).getTime().toString(16) + '-' + statObj.size.toString(16);

        res.setHeader('last-modified', lastModified)
        res.setHeader('ETag', eTag);

        let ifNoneMatch = req.headers['if-none-match'];
        let ifModifiedSince = req.headers['if-modified-since'];

        if (lastModified !== ifModifiedSince) { //先比对
            return false;
        }

        if (ifNoneMatch !== eTag) { // 在比对 ，不要比内容 内容大读出来浪费性能
            return false;
        }
        return true; // 304 和 200 （200的时候可能是强制缓存）
    }
    sendError(absPath, req, res) {
        res.statusCode = 404;
        res.end(`Not Found`)
    }
    gzip(absPath, req, res, statObj){ // 压缩都是经过gzip ？ webpack插件打包的时候实现gzip (我们不需要服务端再次gzip)
        let ecoding = req.headers['accept-encoding'];
        if(ecoding.includes('gzip')){
            // 需要根据支持的压缩编码 进行压缩 ，并且返回content-encoding 来表示如何压缩的
            res.setHeader('Content-Encoding','gzip'); // 告诉你这gzip 压缩过了
            return zlib.createGzip()
        }
    }
    sendFile(absPath, req, res, statObj) {
        if (this.cache(absPath, req, res, statObj)) {
            res.statusCode = 304;
            return res.end();
        }
        // 压缩 ，我们不希望把文件 整个发给客户端  服务端开启gzip压缩 可以降低文件传输大小
        // gzip 对重复性较高的内容 进行替换  11111111... -> 15k1
        let createGzip = null;
        res.setHeader('Content-Type', `${mime.getType(absPath) || 'text/plain'};charset=utf-8`);
        if(createGzip = this.gzip(absPath, req, res, statObj)){
            createReadStream(absPath).pipe(createGzip).pipe(res);
        }else{
            createReadStream(absPath).pipe(res);
        }
    }
    start() {
        let server = http.createServer(this.handleRequest);
        server.listen(this.port, () => {
            console.log(
                chalk.yellow(`Starting up http-server, serving ${chalk.green(path.relative(process.cwd(),this.directory) || './')}  \r\nAvailable on:`)
            )
            // 192.168.1.1  是为了局域网通信    
            // 自己访问自己 可以使用 127.0.0.1
            interfaces.forEach(item => {
                console.log(`  http://${item.address}:${chalk.green(this.port)}`)
            })
            console.log(`Hit CTRL-C to stop the server`)
        })
    }
}
module.exports = Server