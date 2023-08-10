## cookie和session localStorage sessionStorage的区别
- localStorage和sessionStorage不支持跨域 （将页面的js，css脚本采用localStorage进行存储）存储的空间5M  如果存储数据过大 浏览器中的数据库 indexDB, sessionStorage浏览器关闭后就会销毁，localStorage如果不销毁会一直存在
- cookie的特点： http默认是无状态的，每次请求不知道是谁来了。 每次请求都会默认携带 (并不是所有内容都放在cookie中) 浪费流量。 如果cookie内容过大会导致页面白屏, cookie大小是4k。 数据如果有一些隐私， 不能存放私密信息，因为存在浏览器里了。
- session基于cookie的但是更加安全，存放一些私密的内容。 存在服务端中，
