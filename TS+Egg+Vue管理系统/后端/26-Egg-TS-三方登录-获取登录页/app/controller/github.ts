import { Controller } from 'egg';
const queryString = require('querystring');

export default class GithubController extends Controller {
    public async loginView() {
        // 1.获取第三方登录界面
        // 发送get请求到https://github.com/login/oauth/authorize带上一些参数即可
        // client_id: Github可以根据这个client_id判断你有没有申请接入
        //            Github会根据这个client_id查询出对应的应用程序名称, 告诉用户正在给哪个程序授权
        // scope    : 授权范围
        const baseURL = 'https://github.com/login/oauth/authorize';
        const option = {
            client_id: '018447869437696516f2',
            scope: 'user'
        }
        const url = baseURL + '?' + queryString.stringify(option);
        // console.log(url);
        const {ctx} = this;
        ctx.redirect(url);
    }
}
