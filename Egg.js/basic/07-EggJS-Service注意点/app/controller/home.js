const Controller = require('egg').Controller;

class HomeController extends Controller{
    async index(){
        this.ctx.body = 'www.it666.com';
    }
    async getQuery(){
        // 获取传统get请求参数
        // this.ctx.request.query
        let query = this.ctx.query;
        this.ctx.body = query;
    }
    async getParams(){
        // 获取动态路由形式的get请求参数
        let params = this.ctx.params;
        this.ctx.body = params;
    }
    async getBody(){
        // 获取post请求参数
        let body = this.ctx.request.body;
        this.ctx.body = body;
    }
    async getHome(){
        await this.ctx.render('index', {msg:'知播渔'});
    }
    async getNews(){
        /*
        注意点:
        1.service目录必须放在app目录中
        2.service目录支持多级目录, 如果是多级目录, 那么在调用的时候可以使用链式调用
          this.ctx.service.abc.def.text.xxx();
        3.service中的js文件, 如果是以_或者首字母都是大写, 那么在调用的时候必须转换成驼峰命名
          get_user.js --- getUser
          GetUser.js --- getUser  
        * */
        let data = await this.ctx.service.home.findNews();
        this.ctx.body = data;
    }
}

module.exports = HomeController;