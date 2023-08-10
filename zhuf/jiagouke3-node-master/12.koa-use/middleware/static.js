const fs = require('fs').promises;
const path = require('path');
const mime = require('mime')
function static(dirname) {
    return async (ctx, next) => {
        try{
            let filepath =  path.join(dirname,ctx.path);
            let statObj = await fs.stat(filepath);
            if(statObj.isDirectory()){
                filepath = path.join(filepath,'index.html');
            }
            // mime
            let type = mime.getType(filepath);
            ctx.type = type +'; charset=utf-8'
            // 需要拿到buffer响应给浏览器 不能转化成字符串（乱码）
            ctx.body = await fs.readFile(filepath)
     
        }catch(e){
            return next(); // 自己处理不了交给下个人来处理
        }
    }
}

module.exports = static