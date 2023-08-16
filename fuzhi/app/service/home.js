const Service = require('egg').Service

class HomeService extends Service {
  async findNews() {
    let response = await this.ctx.curl('http://127.0.0.1:4321/getNews2', {
      method: 'post',
      data: {
        name: 'lnj',
        age: 24
      }
    })
    //  let response = await this.ctx.curl('http://127.0.0.1:4321/getUser');

    let data = response.data
    console.log('HomeService', data)
    return data
  }
}

module.exports = HomeService