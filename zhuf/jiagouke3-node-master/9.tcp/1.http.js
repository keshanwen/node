const http = require('http'); // node中内置创建http服务的包，内部封装了net模块

// 实现原理是将tcp中的socket（套接字 用于实现双工流的通信） ， http内部将tcp进行包装强制的将socket 转化成了 request（用于客户端的请求）和 response（用于服务端的响应）

// http 一个请求中包含三部分      请求行 （自定义的信息）， 请求头 ， 请求体 
// 服务端会进行响应 响应也是三部分 响应行  响应头    响应体

/*
/user  get
/user  post
/user  put
/user  delete
/user  options  跨域资源共享才有的  （当我们发送一些复杂的请求时默认会先发送options请求）  默认get和post都是简单请求（如果自定义了请求头也算成复杂请求） 自几发的 （设置间隔时间）
*/


// uri (能标识位置)  url （定位到具体的位置） 需要获取对应的资源  
// url的组成 http://username:password@www.baidu.com:port/xxx?a=1  #xxx(锚点不算路径)

// 请求行 
// 获取数据的风格 restful 
// 请求类型（可以根据请求的方法不同做不同的处理 方法名都是大写的）  请求的资源路径（url /xxx?a=1）  协议版本号 默认是1.1
// 请求头就是key:value形式 http中内置了很多头部（内置头 学http就是学各种各样的header） 自定义头我们可以自己添加头 （数据）
// 请求体 也是存放数据的 里面包含着用户的数据 （一般情况下 get请求是没有请求体的）

// 一般是使用规定好的状态 但是也可以创造
// 响应行  版本号 状态码（可以设置 一般要设置的有含义） 响应短语（node中会维护一个状态码对应的相应短语）
- 1 101 websocket
- 2 204 没有响应体  200成功 206范围请求 获取资源的某一个部分
- 3 3开头的大多数是重定向 301(永久重定向)  302临时  304 http缓存
- 4 401（没登录无权限） 403 （登录了没权限） 404 405 （我请求的方法服务端不支持）
- 5 501 服务器不支持此功能  502 网关错误  503 宕机 负载均衡挂了

// 响应头 描述响应的信息 （响应的类型是什么 ，长度多少，有没有压缩过，语言是什么...） 添加自己的响应头
// 响应体中返回数据


// http主要就是学习 如何解析请求头 请求行 请求体 、 响应行 、响应头 、响应体 
// 每个header有什么用途，怎么去使用