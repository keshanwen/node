let fs = require('fs')
let path = require('path')
let b = req('./b.js')


/*

  核心思想是通过require方法来同步地加载依赖的其他模块，通过 module.exports 导出需要暴露的接口。

*/
function req(mod) {
  let filename = path.join(__dirname, mod)
  let content = fs.readFileSync(filename, 'utf-8')
  let fn = new Function('exports', 'require', 'module', '__filename', '__dirname', content + '\n return module.exports')
  let module = {
    exports: {}
  }

  return fn(module.exports, req, module,__filename,__dirname)
}

console.log(b)