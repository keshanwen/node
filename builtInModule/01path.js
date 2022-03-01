/*

1,获取路径,文件名,扩展名
path.dirname()
path.basename()
path.extname()

2,路径组合
path.join()
path.resolve()


3,路径解析
path.normaile()


4,文件路径分解/组合
path.format()
path.parse()

5,获取相对路径
path.relative()


6,平台相关接口/属性


*/ 


// **********获取路径/文件名/扩展名

// 获取所在路径
var path = require('path')
var filepath = '/tmp/demo/js/test.js';
var log = function(args) {
    return console.log(args)
}

//console.log(path.dirname(filepath))

// 获取文件名（严格上说，path.basename(filepath)只是输出路径的最后一部分，并不会判断是否是文件名）
// console.log(path.basename('/tmp/demo/js/test.js'))
// console.log(path.basename('/tmp/demo/js/test/'))
// console.log(path.basename('/tmp/demo/js/test'))
// 如果只想获取文件名，单不包括文件扩展呢，可以用第二个参数
// console.log(path.basename('/tmp/demo/js/test.js','.js'))


// 获取文件扩展名
// log(path.extname('/tmp/demo/js/test.js'))


/*
更详细的规则是: 假设path.basename(filepath) === B

从B的最后一个.开始截取，直到最后一个字符
如果B中不存在.或者B的第一个字符就是.,那么返回空字符串
*/ 

// log(path.extname('index.html'))
// log(path.extname('index.coffe.md'))
// log(path.extname('index.'))
// log(path.extname('index'))
// log(path.extname('.index'))

// **********路径组合
//log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')) //  '/foo/bar/baz/asdf'


//log(path.resolve('/foo/bar', './baz'))  // 理解为 cd /foo/bar  cd ./baz


// *************路径解析

// var index = 0;

// var compare = function(desc, callback){
//   console.log('[用例%d]：%s', ++index, desc);
//   callback();
//   console.log('\n');
// };

// compare('路径为空', function(){
//   // 输出 .
//   console.log( path.normalize('') );
// });

// compare('路径结尾是否带/', function(){
//   // 输出 /tmp/demo/js/upload
//   console.log( path.normalize('/tmp/demo/js/upload') );

//   // /tmp/demo/js/upload/
//   console.log( path.normalize('/tmp/demo/js/upload/') );
// });

// compare('重复的/', function(){
//   // 输出 /tmp/demo/js
//   console.log( path.normalize('/tmp/demo//js') );
// });

// compare('路径带..', function(){
//   // 输出 /tmp/demo/js
//   console.log( path.normalize('/tmp/demo/js/upload/..') );
// });

// compare('相对路径', function(){
//   // 输出 demo/js/upload/
//   console.log( path.normalize('./demo/js/upload/') );

//   // 输出 demo/js/upload/
//   console.log( path.normalize('demo/js/upload/') );
// });

// compare('不常用边界', function(){
//   // 输出 ..
//   console.log( path.normalize('./..') );

//   // 输出 ..
//   console.log( path.normalize('..') );

//   // 输出 ../
//   console.log( path.normalize('../') );

//   // 输出 /
//   console.log( path.normalize('/../') );
  
//   // 输出 /
//   console.log( path.normalize('/..') );
// });

// *************文件路径分解/组合


// ┌─────────────────────┬────────────┐
// │          dir        │    base    │
// ├──────┬              ├──────┬─────┤
// │ root │              │ name │ ext │
// " C:\      path\dir   \ file  .txt "
// └──────┴──────────────┴──────┴─────┘

// root 后不会自动添加  / 而 dir 会
// base vs  name+ext两者可以相互替换

// log(path.format({
//     root: '/tmp/', 
//     base: 'hello.js'
// })) // /tmp/hello.js

// log(path.format({
//     dir: '/tmp', 
//     name: 'hello',
//     ext: '.js'  
// })) //   /tmp/hello.js


// log(path.parse('/home/user/dir/file.txt'))
// {
//    root : "/",
//    dir : "/home/user/dir",
//    base : "file.txt",
//    ext : ".txt",
//    name : "file"
// }


// ****************获取相对路径

// ptah.relative(from,to)
// 如果 from to 指向同个路径，那么返回空字符串
// 如果 from to 中任一者为空，那么返回当前工作路径
//log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'))  // "../../impl/bbb"

//log(path.relative('/data/demo', '/data/demo'))  // ""

//log(path.relative('/data/demo', '')) // ..\..\ParticeCode\github\node\builtInModule





// *******************平台相关接口/属性
// 以下属性、接口，都跟平台的具体实现相关。也就是说，同样的属性、接口，在不同平台上的表现不同。

/*
path.posix: path 相关属性，接口的linux实现
path.win32: path 相关属性，接口的 win32实现
path.sep: 路径分隔符。在linux上是 / ，在window上是 \
path.delimiter path设置的分隔符。linux上是 : window上是 ;

注意，当使用 path.win32 相关接口时，参数同样可以使用/做分隔符，但接口返回值的分割符只会是\。
*/ 

//log(path.win32.join('/tmp', 'fuck')) // tmp\fuck
//log(path.win32.sep)  //    \
// log(path.win32.join('\tmp', 'demo'))

// log(path.win32.join('/tmp', 'demo'))
// console.log(process.env.PATH)
// log(process.env.PATH.split(path.delimiter))