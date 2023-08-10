let Application  = require('./application')
const Router = require('./router')
// 1.koa采用的是es6类来编写的
// 2.express采用的是构造函数es5来编写的


//1.我们期望将express创建应用的过程和应用本身进行分离

function createApplication() {
    return new Application
}
createApplication.Router = Router
module.exports = createApplication