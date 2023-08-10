 // 在发送文件之前 我们可以给文件设置一个缓存时间，如果没有超过缓存时间，那就直接用缓存就好了，不用每次都访问服务器

 // 强制缓存：让浏览器在某个时间内 不在请求服务器了
 // res.setHeader('Expires', new Date(Date.now() + 2 * 1000).toGMTString()); // http1.0中 这种方式可以让引用的资源在某一段时间内不在发送请求了. 首次访问的页面能走强制缓存。 强制缓存不能让首次访问的内容缓存。 因为这个东西存到了浏览器上  拿自己家里的日期 和 服务端返回的日期做对比 判断是否过期，但是用户如果更改了本地时间可能会导致缓存失效
 // res.setHeader('Cache-Control', `max-age=10`); // http1.1中可以使用  .js  .png 

 res.setHeader('Cache-Control', 'no-cache'); // no-store (压根就没缓存) / no-cache (有缓存只是不走)

 // last-modified -> if-modified-since
 // etag -> if-none-match
 // expires + cache-control

 let Etag = crypto.createHash('md5').update(readFileSync(absPath)).digest('base64')
 let ifNoneMatch = req.headers['if-none-match']

 if (Etag === ifNoneMatch) {
     res.statusCode = 304;
     return res.end(); // 准确度高但是浪费性能  lastModifed + 文件长度
 }
 res.setHeader('ETag', Etag);

 // let ifModifiedSince = req.headers['if-modified-since'];
 // let lastModified = statObj.ctime.toGMTString();
 // if (ifModifiedSince === lastModified) {
 //     res.statusCode = 304;
 //     return res.end(); // 直接告诉浏览器找缓存去
 // }
 // res.setHeader('Last-Modified', lastModified); // 当你第一次来的时候 我给一个文件的最后修改时间
 // last-modified 不够准确  1s内更改了100次 无法监控 会导致缓存出问题
 // 有可能最后修改时间变化了 但是内容没发生变化 也出现缓存失效的问题
 // 为了保证靠谱 我可以直接就对比文件的内容 （需要全部看一遍 ）



 // 1.第一次访问服务器我们可以采用强制缓存（浏览器不要在找我来了）  10s  + 最后修改时间
 // 2.10s内再次访问，就不会发送请求了
 // 3.超过10s后会再次向服务器发送请求（会携带最后的修改时间）， 但是此时服务器会做对比缓存（拿服务器的文件和携带的内容做比较） 如果时间一致 认为这个文件没有修改 返回304
 // 4.浏览器会根据状态码 走自己的缓存，过一会又超过10s了 再去走第二步

 // 如果在强制缓存的10s内访问资源， 不会返回最新（缓存的是旧的）




 // 我们期望浏览器访问的内容没有变化 就走缓存的内容