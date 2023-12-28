const Layer = require('./layer')

function Route() {
  this.stack = []
}

Route.prototype.dispatch = function (req,res,out) { // 里层想走到外层的下一个layer就调用 out
  let idx = 0;
  const next = () => {
    if (idx >= this.stack.length) return out()
    let layer = this.stack[idx++]
    if (layer.method === req.method.toLowerCase()) {
      layer.handler(req, res, next) // 将执行下一次的逻辑传递给用户 用户调用 next, 会在 stack 中取出下一个
    } else {
      next()
    }
  }
  next() // 我们是否执行下一个 完全看用户是否调用了 next 方法
}

Route.prototype.get = function (handlers) {
  handlers.forEach(handler => {
    let layer = new Layer('无用', handler)
    layer.method = 'get'
    this.stack.push(layer)
  });
}

module.exports = Route


/*
  外层的 stack 存的是 路径对应的 dispatch 方法
  里层的stack 存的是 用户的回调
*/