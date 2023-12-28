const url = require('url')
const Layer = require('./layer')
const Route = require('./route')

function Router() {
  this.stack = []
}


Router.prototype.get = function (pathname, handlers) {
  const route = new Route()
  const layer = new Layer(pathname, route.dispatch.bind(route))
  layer.route = route // 标识每一个路由都匹配了一个 route 实例
  this.stack.push(layer)
  route.get(handlers) // 让 route 去存放用户真实的回调
}

Router.prototype.handle = function (req, res, out) {
  let { pathname } = url.parse(req.url);
  // 请求到来后 迭代外层的栈
  let idx = 0
  const next = () => { // 先执行第一个， 将第二个执行逻辑传入到 dispatch中， dispatch 调用此回调就从第一个走到第二个
    if (idx >= this.stack.length) return out()
    let layer = this.stack[idx++]
    if (layer.path === pathname) { // 如果路径一样说明就匹配到了
      layer.handler(req, res, next) // 调用 dispatch 方法
    } else {
      next() // 如果路径不匹配则跳过执行
    }
  }
  next()
}

module.exports = Router

/*
1, 创建应用会有一个路由系统 （存放的是一层层的） 每一层中存放的是路径和方法
2， 路由系统中的每一层我们都提供一个 Route 的实例， layer.route = new Route
3, Route 是一个类， 每一个路由都有这个实例， 实例中会创造一个 stack， 用来存放用户注册的回调 （我们
   把存的回调也封装成 layer）里面的layer 不需要在意路径
4, 外层的stack 需要匹配路径， 里层 stack 需要匹配方法


*/