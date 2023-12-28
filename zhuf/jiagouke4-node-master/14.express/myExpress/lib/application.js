const http = require('http')

const Router = require('./router')

function Application() {
  this.router = new Router()
}

Application.prototype.get = function (pathname, handler) {
  this.router.get(pathname, handler)
}

Application.prototype.listen = function () {
  const server = http.createServer((req, res) => {
    function done() {
      res.end(`Cannot ${req.method} ${req.url}`)
    }

    this.router.handle(req, res, done)
  })

  server.listen(...arguments)
}

module.exports = Application