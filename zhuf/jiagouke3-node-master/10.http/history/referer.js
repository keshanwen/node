// 1.个网站名字 a.zf.cn   b.zf.cn  
const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');
const {createReadStream } = require('fs')

// http://a.zf.cn:3000/1.webp  如果b网站应用了a的1.webp 会发生不孕访问
// http://a.zf.cn:3000/1.webp

const whiteList = ['b.zf.cn:3000'];
const server = http.createServer(async (req,res)=>{
    // a服务器提供了一张图片 不能在a不受权的情况下 在b离开访问
    const {pathname} = url.parse(req.url);
    const absPath = path.join(__dirname,pathname);
    try{
        let statObj = await fs.stat(absPath)
        if(statObj.isFile()){
            if(absPath.includes('webp') ||  /(\.png | (\.jpg))/.test(absPath)){ // referer这个字段被 谁引用就指向谁
               let referer =  req.headers['referer'] ||  req.headers['referrer'];
                if(referer){ // 直接打开图片不存在防盗链的问题
                    let hostname = req.headers.host;
                    referer = url.parse(referer).host;
                    if(hostname !== referer && !whiteList.includes(referer)){
                        const errorWebp = path.resolve(__dirname,'2.webp')
                        return createReadStream(errorWebp).pipe(res);
                    }
                }
            }
            createReadStream(absPath).pipe(res);
        }else{
            throw Error('not file')
        }
    }catch{
        res.statusCode = 404;
        res.end()
    }

})


{
    a:1,
    b:2,
    c:{
        a:1
    }
}


server.listen(3000);