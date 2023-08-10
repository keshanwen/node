const http = require('http');
const url = require('url')
// node的服务默认都是单线程的， 如果当前请求时间过长，后面的请求需要等待这个请求处理完毕

const server = http.createServer((request,response)=>{ // 请求到来时会执行此回调
    // 解析请求行的内容


    // 请求行
    console.log(request.method); // 获取请求的方法 方法的类型是大写的
    let {pathname,query} = url.parse(request.url,true)
    console.log(pathname,query); // 我们需要将url中的路径 和查询参数分离开
    console.log(request.httpVersion)

    // 请求头
    console.log(request.headers['user-agent']); // header的key 都是小写的

    // 请求体  传输靠的是tcp -》 socket.on('data')
    let arr = []
    request.on('data',function (chunk) {
        console.log('on~data'); // 如果有数据就会监听数据的到来
        arr.push(chunk);
    });
    request.on('end',function () { // 将数据转化成字符串
        console.log('on~end'); // 内部会看如果你传递的没有数据 直接 request.push(null)
        console.log(Buffer.concat(arr).toString())
    })


    // 响应行 http/1.1 status status_message
    response.statusCode = 200;
    //  response.statusMessage = 'sisisis';
    response.setHeader('Content-Type','text/plain;charset=utf-8')
    // 响应头  response.write()  response.end()
    response.end('中文'); // 可写流，可写流需要调用end方法

    // http1.0中为了实现传递不同的数据 就增加了头的概念


    // let urlObj = new URL('http://localhost:3000/sum?a=1'); //global.URL
    // console.log(urlObj)



    // GET url HTTP/VERSION   node不适合cpu密集型，否则会阻塞线程
    // if(request.url === '/sum'){
    //     let sum = 0; 
    //     for(let i = 0 ; i < 10000000000;i++){
    //         sum+=i;
    //     }
    //     response.end(sum+'');
    // }else{
    //     response.end('other')
    // }
})




// 当端口监听成功后 会触发此回调方法
// 内部http的实现是基于net模块，会将socket解析后生成req和res
let port = 3000;
server.listen(port,()=>{
    console.log('server start ' + port)
});
server.on('error',function(err){
    if(err && err.code == 'EADDRINUSE'){
        server.listen(++port)
    }
})
// 如果端口号被占用 需要自己监听错误信息重新监听。 如果修服务端代码，需要重新启动服务器
// nodemon 文件名 （如果希望监控的不是本文件，可以配置noodeman的配置文件）


// server.on('request',(request,response)=>{
//     console.log('request 2')
// })